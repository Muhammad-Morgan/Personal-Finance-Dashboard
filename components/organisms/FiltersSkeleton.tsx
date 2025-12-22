import { Skeleton } from "@/components/ui/skeleton";

const FiltersSkeleton = () => {
  return (
    <section
      className="bg-muted mb-16 p-8 rounded-lg space-y-6"
      aria-label="Loading filters"
      aria-live="polite"
    >
      <Skeleton className="h-6 w-48" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </section>
  );
};

export default FiltersSkeleton;
