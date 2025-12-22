import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <main className="pt-10 sm:px-16 lg:px-24 px-4 w-full max-w-275 mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-64 w-full" />
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-56 w-full" />
      </div>
    </main>
  );
};

export default DashboardLoading;
