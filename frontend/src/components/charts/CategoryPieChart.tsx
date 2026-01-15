"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "@/lib/constants";

interface CategoryPieChartProps {
  productive: number;
  unproductive: number;
}

export default function CategoryPieChart({
  productive,
  unproductive,
}: CategoryPieChartProps) {
  const data = [
    { name: "Produtivo", value: productive },
    { name: "Improdutivo", value: unproductive },
  ];

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Emails por Categoria
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            <Cell fill={COLORS.productive} />
            <Cell fill={COLORS.unproductive} />
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: COLORS.productive }}
          />
          <span>Produtivo</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: COLORS.unproductive }}
          />
          <span>Improdutivo</span>
        </div>
      </div>
    </div>
  );
}
