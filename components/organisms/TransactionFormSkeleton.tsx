import { Skeleton } from "@/components/ui/skeleton";

const formFields = Array.from({ length: 5 }, (_, index) => index);

const TransactionFormSkeleton = ({
  title = "Loading form",
  submitWidth = "w-40",
}: {
  title?: string;
  submitWidth?: string;
}) => {
  return (
    <section
      className="bg-muted p-8 rounded space-y-6"
      aria-label={title}
      aria-live="polite"
    >
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-center lg:gap-y-10">
        {formFields.map((item) => (
          <div key={item} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
      <Skeleton className={`h-10 ${submitWidth}`} />
    </section>
  );
};

export default TransactionFormSkeleton;
