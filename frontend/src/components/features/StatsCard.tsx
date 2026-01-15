import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: ReactNode;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-neutral-400",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-1.5 lg:mb-2">
        <span className="text-neutral-600 text-xs lg:text-sm font-medium">
          {title}
        </span>
        <Icon className={iconColor} size={18} />
      </div>
      <p className="text-2xl lg:text-3xl font-bold text-neutral-900 truncate max-w-full">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-neutral-500 mt-1 truncate max-w-full">
          {subtitle}
        </p>
      )}
    </div>
  );
}
