import { useMemo } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { generateAllMockData } from "@/utils/mockData";
import { TimeSeriesChart } from "@/components/TimeSeriesChart";
import { DashboardHeader } from "@/components/DashboardHeader";
import { VerticalLayout } from "@/components/layouts/VerticalLayout";
import { GridLayout } from "@/components/layouts/GridLayout";
import { FreeLayout } from "@/components/layouts/FreeLayout";

// Default date range based on the actual chart data (July 1 - December 31, 2025)
const defaultDateRange = {
  start: new Date("2025-07-01T00:00:00"),
  end: new Date("2025-12-31T00:00:00"),
};

export function DashboardPage() {
  const { layoutMode, dateRange } = useDashboardStore();

  // Generate mock data based on current date range (use default if null)
  const chartData = useMemo(() => {
    const rangeToUse = dateRange ?? defaultDateRange;
    return generateAllMockData(rangeToUse);
  }, [dateRange]);

  // Render charts based on layout mode
  const renderCharts = () => {
    const charts = chartData.map((data) => (
      <TimeSeriesChart
        key={data.id}
        chartId={data.id}
        title={data.title}
        layoutMode={layoutMode}
        data={data}
      />
    ));

    switch (layoutMode) {
      case "vertical":
        return <VerticalLayout>{charts}</VerticalLayout>;
      case "grid":
        return <GridLayout>{charts}</GridLayout>;
      case "free":
        return <FreeLayout>{charts}</FreeLayout>;
      default:
        return <GridLayout>{charts}</GridLayout>;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <DashboardHeader />
      <div className="flex-1 min-h-0 overflow-auto p-4 bg-background">{renderCharts()}</div>
    </div>
  );
}
