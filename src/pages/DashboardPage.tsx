import { useMemo } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { generateAllMockData } from "@/utils/mockData";
import { TimeSeriesChart } from "@/components/TimeSeriesChart";
import { DashboardHeader } from "@/components/DashboardHeader";
import { VerticalLayout } from "@/components/layouts/VerticalLayout";
import { GridLayout } from "@/components/layouts/GridLayout";
import { FreeLayout } from "@/components/layouts/FreeLayout";

export function DashboardPage() {
  const { layoutMode, dateRange } = useDashboardStore();

  // Generate mock data based on current date range
  const chartData = useMemo(() => {
    return generateAllMockData(dateRange);
  }, [dateRange]);

  // Render charts based on layout mode
  const renderCharts = () => {
    const charts = chartData.map((data) => (
      <TimeSeriesChart key={data.id} chartId={data.id} title={data.title} data={data.data} />
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
    <div className="flex flex-col h-full w-full">
      <DashboardHeader />
      <div className="flex-1 overflow-auto p-4 bg-background">{renderCharts()}</div>
    </div>
  );
}
