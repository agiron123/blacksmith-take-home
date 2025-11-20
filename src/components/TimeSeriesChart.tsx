"use client"

import * as React from "react"

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  type ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardStore } from "@/stores/dashboardStore"
import { useSharedChartData, type ChartDataPoint } from "@/hooks/useSharedChartData"

export const description = "An interactive bar chart"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const ChartBody = React.memo(function ChartBody({
  data,
  activeChart,
  layoutMode,
  onBarMouseEnter,
  onBarMouseLeave,
}: {
  data: ChartDataPoint[]
  activeChart: keyof typeof chartConfig
  layoutMode?: "vertical" | "grid" | "free"
  onBarMouseEnter: (barItem: unknown) => void
  onBarMouseLeave: () => void
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className={`w-full min-w-0 ${layoutMode === "vertical" ? "max-h-[138px]" : "min-h-[250px]"}`}
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
        syncId="myBarChartSync"
        throttleDelay={16}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          hide={true}
        />
        <Tooltip
          content={() => null}
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
        />
        <Bar
          dataKey={activeChart}
          fill={`var(--color-${activeChart})`}
          radius={8}
          activeBar={{
            fill: `var(--color-${activeChart})`,
            opacity: 0.8,
            stroke: `var(--color-${activeChart})`,
            strokeWidth: 2,
          }}
          onMouseEnter={onBarMouseEnter}
          onMouseLeave={onBarMouseLeave}
        />
      </BarChart>
    </ChartContainer>
  )
})

ChartBody.displayName = "ChartBody"


export const ChartBarInteractive = React.memo(function ChartBarInteractive({
  title: _title,
  data,
  layoutMode
}: {
  title?: string
  data: ChartDataPoint[]
  layoutMode?: "vertical" | "grid" | "free"
}) {
  const [activeChart] =
    React.useState<keyof typeof chartConfig>("desktop")
  const [selectedDataPoint, setSelectedDataPoint] = React.useState<ChartDataPoint | null>(null)
  const lastUpdateRef = React.useRef<string | null>(null)
  const selectedDate = useDashboardStore((state) => state.selectedDate)
  const setSelectedDate = useDashboardStore((state) => state.setSelectedDate)
  const dataByDate = React.useMemo(() => {
    const map = new Map<string, ChartDataPoint>()
    for (const point of data) {
      map.set(point.date, point)
    }
    return map
  }, [data])

  React.useEffect(() => {
    if (data.length > 0 && !selectedDate && !selectedDataPoint) {
      const firstDataPoint = data[0]
      setSelectedDataPoint(firstDataPoint)
      setSelectedDate(firstDataPoint.date)
    }
  }, [data, selectedDataPoint, selectedDate, setSelectedDate])

  React.useEffect(() => {
    if (!selectedDate || lastUpdateRef.current === selectedDate) return

    const matchingPoint = dataByDate.get(selectedDate)
    if (matchingPoint) {
      lastUpdateRef.current = matchingPoint.date
      setSelectedDataPoint(matchingPoint)
    }
  }, [dataByDate, selectedDate])

  const handleBarMouseEnter = React.useCallback((barItem: any) => {
    // barItem.payload contains the actual data point
    if (barItem?.payload) {
      const dataPoint = barItem.payload as ChartDataPoint
      
      // Only update if the date actually changed
      if (lastUpdateRef.current !== dataPoint.date) {
        lastUpdateRef.current = dataPoint.date
        setSelectedDataPoint(dataPoint)
        setSelectedDate(dataPoint.date)
      }
    }
  }, [setSelectedDate])

  const handleBarMouseLeave = React.useCallback(() => {
    // Optionally clear selection when leaving bars
    // setSelectedDataPoint(null)
  }, [])

  return (
    <Card className="py-0 w-full">
      <CardContent className="px-2 sm:p-6 w-full">
        <ChartBody
          data={data}
          activeChart={activeChart}
          layoutMode={layoutMode}
          onBarMouseEnter={handleBarMouseEnter}
          onBarMouseLeave={handleBarMouseLeave}
        />

          <div className="flex justify-end w-full pt-4">
            <div className="inline-flex h-6 items-stretch rounded-[4px] overflow-hidden border border-slate-300 text-xs leading-none">
              <div className="flex items-center justify-center bg-emerald-400 px-3 text-white font-semibold">
                {selectedDataPoint ? selectedDataPoint.date : '----------'}
              </div>
              <div className="flex min-w-[48px] items-center justify-center bg-white px-3 text-black font-semibold">
                {selectedDataPoint == null
                  ? '---'
                  : activeChart === "desktop"
                    ? selectedDataPoint.desktop
                    : selectedDataPoint.mobile}
              </div>
            </div>
          </div>

      </CardContent>
    </Card>
  )
})

export const TimeSeriesChart = React.memo(function TimeSeriesChart({
  chartId: _chartId,
  title,
  data: providedData,
  layoutMode
}: {
  chartId?: number
  title?: string
  data?: ChartDataPoint[] | null
  layoutMode?: "vertical" | "grid" | "free"
}) {
  const { data: sharedData, isLoading } = useSharedChartData()
  const chartData = React.useMemo(() => {
    if (providedData && Array.isArray(providedData) && providedData.length > 0) {
      return providedData
    }
    return sharedData ?? []
  }, [providedData, sharedData])

  const isWaitingForData = isLoading && chartData.length === 0

  if (isWaitingForData) {
    const skeletonHeight = layoutMode === "vertical" ? "h-[150px] max-h-[150px]" : "h-[250px]"
    return (
      <Card className="py-0 min-w-0 w-full">
        <CardContent className="px-2 sm:p-6 w-full">
          <div className={`${skeletonHeight} w-full min-w-0 flex items-center justify-center`}>
            <div className="w-full space-y-2">
              <Skeleton className={`${skeletonHeight} w-full`} />
            </div>
          </div>
          <div className="flex justify-end w-full pt-4">
            <Skeleton className="h-6 w-32" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return <ChartBarInteractive title={title} data={chartData} layoutMode={layoutMode} />
})
