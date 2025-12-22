import { Skeleton } from "@/components/ui/skeleton";

const StatsSkeleton = () => {
  return (
    <div
      className="grid gap-6 lg:grid-cols-2"
      aria-label="Loading stats cards"
      aria-live="polite"
    >
      {[0, 1].map((item) => (
        <div
          key={item}
          className="rounded-xl bg-muted p-6 flex flex-col gap-3"
          role="status"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-20" />
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
