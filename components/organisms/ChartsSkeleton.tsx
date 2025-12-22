import { Skeleton } from "@/components/ui/skeleton";

const ChartsSkeleton = () => {
  return (
    <section className="mt-16 space-y-6" aria-label="Loading charts">
      <Skeleton className="h-8 w-72 mx-auto" />
      <div className="rounded-xl border border-muted/50 p-6">
        <Skeleton className="h-64 w-full" />
      </div>
    </section>
  );
};

export default ChartsSkeleton;
