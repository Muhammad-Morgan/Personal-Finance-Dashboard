"use client";
import { useSearchParams } from "next/navigation";
import TransactionCard from "../molecules/TransactionCard";
import Pagination from "../organisms/Pagination";
import TransactionsListSkeleton from "../organisms/TransactionsListSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactionsAction, TransactionType } from "@/lib/actions";
import { useMemo } from "react";

const TransactionsList = () => {
  const params = useSearchParams();
  const { from, to, typeParam, type, page } = useMemo(() => {
    const from = params.get("from") ?? "";
    const to = params.get("to") ?? "";
    const typeParam = params.get("type") ?? "all";
    const type =
      typeParam === "EXPENSE" || typeParam === "INCOME"
        ? (typeParam as "EXPENSE" | "INCOME")
        : undefined;
    const page = Number(params.get("page") ?? 1);
    return { from, to, typeParam, type, page };
  }, [params]);

  const { data, isPending } = useQuery({
    queryKey: ["transactions", from, to, typeParam, page],
    queryFn: () => getAllTransactionsAction({ page, from, to, type }),
  });
  const transactions: TransactionType[] | [] = data?.transactions || [];
  const count: number = data?.count || 0;
  const totalPages: number = data?.totalPages || 0;
  const currentPage: number = data?.page || 1;
  if (isPending) {
    return <TransactionsListSkeleton />;
  }
  if (transactions.length === 0) {
    return <h2 className="text-xl">No transactions found...</h2>;
  }
  return (
    <>
      <h2 className="text-xl font-semibold capitalize mb-4">
        <span className="text-muted-foreground">{count}</span> transactions
        found
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
      {count > 10 && (
        <div className="flex items-center justify-between mt-5">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default TransactionsList;
