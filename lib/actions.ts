"use server";
import { redirect } from "next/navigation";
import prisma from "./db";
import { Prisma } from "@prisma/client";
import { getSession } from "./session";
import { CreateTransaction } from "./zodSchemas";
import dayjs from "dayjs";
export type TransactionType = {
  id: string;
  amount: number;
  date: Date;
  description: string | null;
  type: "EXPENSE" | "INCOME";
  recurring: boolean;
  userId: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export async function updateTransactionAction(
  values: CreateTransaction,
  transactionId: string
): Promise<TransactionType | null> {
  const amount = values?.amount as number;
  const description = values?.description;
  const type = values?.type;
  const recurring = values?.recurring;
  const date = values?.date as Date;
  const categoryName = values?.categoryName;
  const user = await getSession();
  const userId = user?.userId as string;
  try {
    const transaction: TransactionType = await prisma.transaction.update({
      where: {
        id: transactionId,
        userId,
      },
      data: {
        amount,
        description,
        date,
        type,
        recurring,
      },
    });
    await prisma.category.update({
      where: {
        id: transaction.categoryId as string | undefined,
        userId,
      },
      data: {
        name: categoryName,
        userId,
      },
    });
    return transaction;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function createTransactionAction(
  values: CreateTransaction
): Promise<TransactionType | null> {
  const amount = values?.amount as number;
  const description = values?.description;
  const type = values?.type;
  const recurring = values?.recurring;
  const categoryName = values?.categoryName;
  const date = values?.date as Date;

  const user = await getSession();
  const userId = user?.userId as string;
  try {
    let categoryP;
    if (categoryName) {
      categoryP = await prisma.category.create({
        data: {
          name: categoryName,
          userId,
        },
      });
    }
    const transaction: TransactionType = await prisma.transaction.create({
      data: {
        amount,
        description,
        date,
        type,
        categoryId: categoryP?.id ?? null,
        recurring,
        userId,
      },
    });
    return transaction;
  } catch (error) {
    console.error(error);
    return null;
  }
}
type GetTransactions = {
  from?: string;
  to?: string;
  type?: TransactionType["type"];
  page?: number;
  limit?: number;
};
export async function getAllTransactionsAction({
  from,
  to,
  type,
  page = 1,
  limit = 10,
}: GetTransactions): Promise<{
  transactions: TransactionType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const user = await getSession();
  const userId = user?.userId as string;
  try {
    let whereClause: Prisma.TransactionWhereInput = {
      userId,
    };
    if (from) {
      const fromDate = new Date(from);
      if (!Number.isNaN(fromDate.valueOf())) {
        fromDate.setHours(0, 0, 0, 0);
        whereClause = {
          ...whereClause,
          date: {
            ...(whereClause.date as Prisma.DateTimeFilter),
            gte: fromDate,
          },
        };
      }
    }
    if (to) {
      const toDate = new Date(to);
      if (!Number.isNaN(toDate.valueOf())) {
        toDate.setHours(0, 0, 0, 0);
        toDate.setDate(toDate.getDate() + 1);
        whereClause = {
          ...whereClause,
          date: {
            ...(whereClause.date as Prisma.DateTimeFilter),
            lt: toDate,
          },
        };
      }
    }
    if (type === "EXPENSE" || type === "INCOME") {
      whereClause = {
        ...whereClause,
        type,
      };
    }
    // config the return limit to 10 pages or limit
    const skip = (page - 1) * limit;
    // main prisma functionality
    const transactions: TransactionType[] = await prisma.transaction.findMany({
      where: whereClause,
      take: limit,
      skip,
      orderBy: {
        date: "desc",
      },
    });
    // now after having the return limited based on the page number we can config the count and totalPages
    const count: number = await prisma.transaction.count({
      where: whereClause,
    });
    const totalPages: number = Math.ceil(count / limit);
    return {
      transactions,
      count,
      page,
      totalPages,
    };
  } catch (error) {
    console.log(error);

    return { transactions: [], count: 0, page: 1, totalPages: 0 };
  }
}
export async function getCategoryName(categoryId: string) {
  try {
    const categoryName = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return categoryName;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteTransactionAction(
  id: string
): Promise<"EXPENSE" | "INCOME" | null> {
  const user = await getSession();
  const userId = user?.userId;
  try {
    const transactionType = await prisma.transaction.delete({
      where: {
        id,
        userId,
      },
    });
    return transactionType?.type;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getSingleTransactionAction(id: string): Promise<{
  categoryName: string | undefined;
  transaction: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    amount: number;
    date: Date;
    description: string | null;
    type: "EXPENSE" | "INCOME";
    recurring: boolean;
    categoryId: string | null;
  } | null;
} | null> {
  const user = await getSession();
  const userId = user?.userId as string;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
        userId,
      },
    });
    const category = await prisma.category.findUnique({
      where: {
        id: transaction?.categoryId as string | undefined,
        userId,
      },
    });
    return {
      categoryName: category?.name,
      transaction,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getChartsAction(): Promise<
  { date: string; count: number }[]
> {
  const user = await getSession();
  const userId = user?.userId as string;
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    const transactionsPerMonth = transactions.reduce((acc, curr) => {
      const date = dayjs(curr.date).format("MMM YY");
      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);
    return transactionsPerMonth;
  } catch (error) {
    console.log(error);
    redirect("/dashboard/transactionslist");
  }
}
export async function getStatsAction(): Promise<{
  INCOME: number;
  EXPENSE: number;
}> {
  const user = await getSession();
  const userId = user?.userId as string;
  try {
    const stats = await prisma.transaction.groupBy({
      by: ["type"],
      _count: {
        type: true,
      },
      where: {
        userId,
      },
    });
    const statsObject: Record<string, number> = stats.reduce((acc, curr) => {
      acc[curr.type] = curr._count.type;
      return acc;
    }, {} as Record<string, number>);
    const defaultStats = {
      INCOME: 0,
      EXPENSE: 0,
      ...statsObject,
    };
    return defaultStats;
  } catch (error) {
    console.log(error);
    redirect("/dashboard/transactionslist");
  }
}
