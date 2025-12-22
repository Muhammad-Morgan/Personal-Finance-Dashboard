import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { getCategoryName, TransactionType } from "@/lib/actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../ui/badge";
import { ArrowRight, Edit2Icon, Repeat } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import DeleteBtn from "../atoms/DeleteBtn";

const TransactionCard = ({ transaction }: { transaction: TransactionType }) => {
  const pathname = usePathname();
  const { date, description, amount, type, recurring } = transaction;
  const categoryId = transaction?.categoryId || "";
  const enabled = Boolean(categoryId);
  const { data } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryName(categoryId),
    enabled,
  });
  return (
    <Card className="bg-muted">
      <CardContent className="grid gap-3">
        <div className="flex justify-between">
          <div className="grid">
            <span>Amount</span>
            <p className="text-sm text-slate-900 dark:text-slate-400">
              {formatCurrency(amount)}
            </p>
          </div>
          <div className="grid">
            <span>Date</span>
            <p className="font-normal text-sm text-muted-foreground">
              {formatDate(date)}
            </p>
          </div>
        </div>
        <Separator />
        {data && (
          <div className="flex justify-between">
            <span>Category</span>
            <p className="text-sm capitalize">{data.name}</p>
          </div>
        )}
        <div className="flex justify-between">
          <span>Type</span>
          <p className="text-sm capitalize">{type.toLowerCase()}</p>
        </div>
        {description ? (
          <div className="flex justify-between">
            <span>Description</span>
            <p className="text-xs text-muted-foreground capitalize">
              {description}
            </p>
          </div>
        ) : null}
        <div className="flex justify-start gap-x-6 items-center">
          <p className="text-sm">Recurring</p>
          <Badge
            className={`p-1 ${
              recurring ? "bg-green-600/95 dark:text-white" : "bg-primary"
            }`}
            aria-live="polite"
          >
            <span className="sr-only">
              {recurring ? "Recurring transaction" : "One-time transaction"}
            </span>
            {recurring ? (
              <Repeat aria-hidden="true" />
            ) : (
              <ArrowRight aria-hidden="true" />
            )}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-12 gap-x-4 mt-auto">
        <Button asChild size="sm" className="col-span-3 tracking-wide">
          <Link
            href={`${pathname}/edittransaction/${transaction.id}`}
            aria-label="Edit transaction"
          >
            <Edit2Icon aria-hidden="true" />
            <span className="hidden lg:inline">Edit</span>
            <span className="sr-only">Edit transaction</span>
          </Link>
        </Button>
        <DeleteBtn id={transaction.id} />
      </CardFooter>
    </Card>
  );
};

export default React.memo(TransactionCard);
