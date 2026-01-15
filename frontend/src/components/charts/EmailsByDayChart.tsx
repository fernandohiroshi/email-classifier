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
import { formatDateShort } from "@/lib/utils";
import { COLORS } from "@/lib/constants";

interface EmailsByDayChartProps {
  data: { date: string; count: number }[];
}

export default function EmailsByDayChart({ data }: EmailsByDayChartProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4">
      <h3 className="text-base font-semibold text-foreground mb-3">
        Emails por Dia
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={24}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(value) => formatDateShort(value)}
            tickMargin={8}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 11 }}
            allowDecimals={false}
            width={32}
          />
          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("pt-BR")
            }
            formatter={(value: number) => [
              `${value} email${value === 1 ? "" : "s"}`,
              "Quantidade",
            ]}
          />
          <Bar dataKey="count" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
