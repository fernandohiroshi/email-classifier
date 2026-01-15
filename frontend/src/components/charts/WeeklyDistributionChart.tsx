"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "@/lib/constants";

interface WeeklyDistributionChartProps {
  data: { date: string; count: number }[];
}

export default function WeeklyDistributionChart({
  data,
}: WeeklyDistributionChartProps) {
  return (
    <div className="bg-card dark:bg-card-dark rounded-xl shadow-sm border border-border p-4">
      <h3 className="text-base font-semibold text-foreground dark:text-foreground-dark mb-3">
        Distribuição Semanal
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("pt-BR", { weekday: "short" })
            }
          />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("pt-BR")
            }
            formatter={(value: number) => [
              `${value} email${value === 1 ? "" : "s"}`,
              "Quantidade",
            ]}
          />
          <Bar dataKey="count" fill={COLORS.productive} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
