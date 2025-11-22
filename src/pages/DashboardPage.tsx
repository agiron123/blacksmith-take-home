// Use the shared chart data hook to get the data once for all charts
import { useSharedChartData } from "@/hooks/useSharedChartData";
import { useDashboardStore } from "@/stores/dashboardStore";
import { TimeSeriesChart } from "@/components/TimeSeriesChart";
import { DashboardHeader } from "@/components/DashboardHeader";
import { VerticalLayout } from "@/components/layouts/VerticalLayout";
import { GridLayout } from "@/components/layouts/GridLayout";
import { FreeLayout } from "@/components/layouts/FreeLayout";

// Default date range based on the actual chart data (July 1 - December 31, 2025)
// const defaultDateRange = {
//   start: new Date("2025-07-01T00:00:00"),
//   end: new Date("2025-12-31T00:00:00"),
// };

export function DashboardPage() {
  const { layoutMode } = useDashboardStore();

  const { data: chartData, isLoading } = useSharedChartData();

  // Render charts based on layout mode
  const renderCharts = () => {
    // For demo purpose, split into multiple charts if needed — here we just render 9 identical charts for now
    const charts = Array.from({ length: 9 }).map((_, idx) => {
      // Determine color based on chart position
      // First three (0-2): #0072DB
      // Next three (3-5): #34D399
      // Last three (6-8): #F87171
      let color: string;
      if (idx < 3) {
        color = "#0072DB";
      } else if (idx < 6) {
        color = "#34D399";
      } else {
        color = "#F87171";
      }

      return (
        <TimeSeriesChart
          key={idx}
          chartId={idx}
          title={`Chart ${idx + 1}`}
          layoutMode={layoutMode}
          data={chartData}
          isLoading={isLoading}
          color={color}
        />
      );
    });

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
