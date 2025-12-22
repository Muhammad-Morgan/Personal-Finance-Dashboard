"use client";
import { useQuery } from "@tanstack/react-query";

import { getStatsAction } from "@/lib/actions";
import StatsCard from "../molecules/StatsCard";
import StatsSkeleton from "./StatsSkeleton";

const StatsContainer = () => {
  const { data, isPending } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  if (isPending) {
    return <StatsSkeleton />;
  }

  return (
    <div
      className="grid gap-6 lg:grid-cols-2"
      aria-live="polite"
      aria-label="Statistics summary"
    >
      <StatsCard title="Income type" value={data?.INCOME || 0} />
      <StatsCard title="Expense type" value={data?.EXPENSE || 0} />
    </div>
  );
};

export default StatsContainer;
