"use client";

import { Suspense, lazy } from "react";
import { Stats } from "@/types";
import { Skeleton } from "../ui/skeleton";

const CategoryPieChart = lazy(() => import("../charts/CategoryPieChart"));
const EmailsByDayChart = lazy(() => import("../charts/EmailsByDayChart"));
const ResponseTypesChart = lazy(() => import("../charts/ResponseTypesChart"));
const WeeklyDistributionChart = lazy(
  () => import("../charts/WeeklyDistributionChart")
);

interface DashboardPageProps {
  stats: Stats;
  isLoading?: boolean;
}

export default function DashboardPage({
  stats,
  isLoading,
}: DashboardPageProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 lg:mb-2">
        Dashboard
      </h2>
      <p className="text-sm text-muted-foreground mb-6 lg:mb-8">
        Análise e estatísticas dos emails processados
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </>
        ) : (
          <>
            <Suspense
              fallback={<Skeleton className="h-64 w-full rounded-xl" />}
            >
              <CategoryPieChart
                productive={stats.productive}
                unproductive={stats.unproductive}
              />
            </Suspense>

            <Suspense
              fallback={<Skeleton className="h-64 w-full rounded-xl" />}
            >
              <EmailsByDayChart data={stats.emailsByDay} />
            </Suspense>

            <Suspense
              fallback={<Skeleton className="h-64 w-full rounded-xl" />}
            >
              <WeeklyDistributionChart data={stats.emailsByDay} />
            </Suspense>

            <Suspense
              fallback={<Skeleton className="h-64 w-full rounded-xl" />}
            >
              <ResponseTypesChart data={stats.responseTypes} />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}
