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

interface ResponseTypesChartProps {
  data: { type: string; count: number }[];
}

export default function ResponseTypesChart({ data }: ResponseTypesChartProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4">
      <h3 className="text-base font-semibold text-foreground mb-3">
        Top 5 remetentes improdutivos
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="type" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [
              `${value} email${value === 1 ? "" : "s"} improdutivo${
                value === 1 ? "" : "s"
              }`,
              "Quantidade",
            ]}
          />
          <Bar dataKey="count" fill={COLORS.primary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
