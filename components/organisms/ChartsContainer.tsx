"use client";
import { getChartsAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartsSkeleton from "./ChartsSkeleton";

const ChartsContainer = () => {
  const { data, isPending } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsAction(),
  });
  if (isPending) {
    return <ChartsSkeleton />;
  }
  if (!data || data.length < 1) return null;
  return (
    <section className="mt-16" aria-live="polite">
      <h1 className="text-4xl font-semibold text-center">
        Monthly Applications
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default ChartsContainer;
