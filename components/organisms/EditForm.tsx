"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CustomDateField,
  CustomFormCheckbox,
  CustomFormField,
  CustomFormSelect,
} from "../molecules/FormComponents";
// schemas to be imported
import {
  createTransactionSchema,
  type CreateTransaction,
} from "@/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  updateTransactionAction,
  getSingleTransactionAction,
} from "@/lib/actions";
import TransactionFormSkeleton from "./TransactionFormSkeleton";

const EditForm = ({ transactionId }: { transactionId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isPending: isLoadingTransaction } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getSingleTransactionAction(transactionId),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateTransaction) =>
      updateTransactionAction(values, transactionId),
    onSuccess: (data) => {
      if (!data) {
        toast.error("There was an error");
        return;
      }
      toast.success("Transaction created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      router.push("/dashboard/transactionslist");
    },
  });
  const form = useForm<CreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: data?.transaction?.amount || 0.0,
      date: data?.transaction?.date
        ? new Date(data.transaction.date)
        : new Date(),
      description: data?.transaction?.description || "",
      type: data?.transaction?.type || "EXPENSE",
      recurring: data?.transaction?.recurring || false,
      categoryName: data?.categoryName || "",
    },
  });
  useEffect(() => {
    if (!data?.transaction) return;
    form.reset({
      amount: data.transaction.amount,
      date: new Date(data.transaction.date),
      description: data.transaction.description || "",
      type: data.transaction.type,
      recurring: data.transaction.recurring,
      categoryName: data.categoryName || "",
    });
  }, [data, form]);
  function onSubmit(values: CreateTransaction) {
    mutate(values);
  }
  if (isLoadingTransaction) {
    return <TransactionFormSkeleton title="Loading transaction" />;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-2xl mb-6">
          add transaction
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-center lg:gap-y-10">
          <CustomFormField
            className="bg-background dark:bg-background"
            control={form.control}
            name="amount"
            type="number"
            label="Amount 0.00$"
            step={5.5}
            min={0}
          />
          <CustomDateField
            className="bg-background dark:bg-background"
            control={form.control}
            name="date"
            labelText="Transaction Date"
          />
          <CustomFormField
            className="bg-background dark:bg-background"
            control={form.control}
            name="description"
            type="text"
            label="Description"
          />
          <CustomFormSelect
            className="bg-background dark:bg-background"
            control={form.control}
            name="type"
            items={["INCOME", "EXPENSE"]}
            labelText="Type"
          />
          <CustomFormField
            className="bg-background dark:bg-background"
            control={form.control}
            name="categoryName"
            type="text"
            label="Category"
          />
          <div className="flex self-center">
            <CustomFormCheckbox
              control={form.control}
              name="recurring"
              labelText="Recurring"
            />
          </div>
        </div>
        <Button className="mt-10" type="submit" disabled={isPending}>
          {isPending ? "Editing..." : "Edit transaction"}
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
