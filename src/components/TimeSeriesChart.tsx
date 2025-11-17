import { useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
} from "recharts";
import { useDashboardStore } from "@/stores/dashboardStore";
import { TimeSeriesDataPoint } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  chartId: number;
  title: string;
}

export function TimeSeriesChart({ data, chartId, title }: TimeSeriesChartProps) {
  const { hoveredX, setHoveredX, dateRange, setDateRange } = useDashboardStore();

  // Transform data for Recharts (it expects objects with named properties)
  const chartData = useMemo(
    () =>
      data.map((point) => ({
        timestamp: point.timestamp.getTime(),
        value: point.value,
        formattedTime: format(point.timestamp, "MMM dd, HH:mm"),
      })),
    [data]
  );

  // Calculate the hovered timestamp based on normalized position
  const hoveredTimestamp = useMemo(() => {
    if (hoveredX === null || chartData.length === 0) return null;
    
    const minTimestamp = chartData[0].timestamp;
    const maxTimestamp = chartData[chartData.length - 1].timestamp;
    const range = maxTimestamp - minTimestamp;
    
    return minTimestamp + range * hoveredX;
  }, [hoveredX, chartData]);

  // Handle mouse move to update hover position
  const handleMouseMove = useCallback(
    (e: any) => {
      if (!e || !e.activeCoordinate || !e.activeLabel) return;
      
      // Use activeLabel which is the timestamp value
      const activeTimestamp = typeof e.activeLabel === 'number' 
        ? e.activeLabel 
        : new Date(e.activeLabel).getTime();
      
      const minTimestamp = chartData[0]?.timestamp || 0;
      const maxTimestamp = chartData[chartData.length - 1]?.timestamp || 0;
      const range = maxTimestamp - minTimestamp;
      
      if (range > 0) {
        const normalizedX = (activeTimestamp - minTimestamp) / range;
        // Clamp to [0, 1]
        const clampedX = Math.max(0, Math.min(1, normalizedX));
        setHoveredX(clampedX);
      }
    },
    [chartData, setHoveredX]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredX(null);
  }, [setHoveredX]);

  // Handle brush change for date range selection
  const handleBrushChange = useCallback(
    (brushData: any) => {
      if (!brushData || brushData.startIndex === undefined || brushData.endIndex === undefined) return;
      
      const startIndex = Math.max(0, Math.floor(brushData.startIndex));
      const endIndex = Math.min(chartData.length - 1, Math.ceil(brushData.endIndex));
      
      const startPoint = chartData[startIndex];
      const endPoint = chartData[endIndex];
      
      if (startPoint && endPoint) {
        setDateRange({
          start: new Date(startPoint.timestamp),
          end: new Date(endPoint.timestamp),
        });
      }
    },
    [chartData, setDateRange]
  );

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium">{data.formattedTime}</p>
          <p className="text-sm text-muted-foreground">
            {title}: {data.value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format X-axis ticks
  const formatXAxis = (tickItem: number) => {
    return format(new Date(tickItem), "MMM dd");
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <LineChart
            data={chartData}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickFormatter={formatXAxis}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            {hoveredTimestamp !== null && (
              <ReferenceLine
                x={hoveredTimestamp}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
            )}
            <Brush
              dataKey="timestamp"
              height={30}
              stroke="hsl(var(--primary))"
              onChange={handleBrushChange}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

