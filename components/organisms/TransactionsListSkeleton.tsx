import { Skeleton } from "@/components/ui/skeleton";

const TransactionsListSkeleton = () => {
  const placeholders = Array.from({ length: 4 }, (_, index) => index);
  return (
    <section
      className="space-y-6"
      aria-label="Loading transactions"
      aria-live="polite"
    >
      <Skeleton className="h-6 w-64" />
      <div className="grid md:grid-cols-2 gap-10">
        {placeholders.map((item) => (
          <article
            key={item}
            className="rounded-xl border border-muted/50 p-6 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-4 w-3/4" />
          </article>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </section>
  );
};

export default TransactionsListSkeleton;
