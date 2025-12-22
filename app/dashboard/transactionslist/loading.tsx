import FiltersSkeleton from "@/components/organisms/FiltersSkeleton";
import TransactionsListSkeleton from "@/components/organisms/TransactionsListSkeleton";

const TransactionsListLoading = () => {
  return (
    <main className="space-y-10">
      <FiltersSkeleton />
      <TransactionsListSkeleton />
    </main>
  );
};

export default TransactionsListLoading;
