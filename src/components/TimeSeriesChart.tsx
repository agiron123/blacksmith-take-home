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

export const description = "An interactive bar chart"

interface ChartDataPoint {
  date: string
  desktop: number
  mobile: number
}

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


export const ChartBarInteractive = React.memo(function ChartBarInteractive({
  title: _title,
  data,
  selectedDate,
  setSelectedDate,
  layoutMode
}: {
  title?: string
  data: ChartDataPoint[]
  selectedDate: string | null
  setSelectedDate: (date: string | null) => void
  layoutMode?: "vertical" | "grid" | "free"
}) {
  const [activeChart] =
    React.useState<keyof typeof chartConfig>("desktop")
  const [selectedDataPoint, setSelectedDataPoint] = React.useState<ChartDataPoint | null>(null)
  const lastUpdateRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (data.length > 0 && !selectedDate) {
      const firstDataPoint = data[0]
      if (firstDataPoint && !selectedDataPoint) {
        setSelectedDataPoint(firstDataPoint)
      }
    }
  }, [data, selectedDataPoint, selectedDate])

  React.useEffect(() => {
    if (!selectedDate || selectedDataPoint?.date === selectedDate) return

    const matchingPoint = data.find((point) => point.date === selectedDate)
    if (matchingPoint) {
      lastUpdateRef.current = matchingPoint.date
      setSelectedDataPoint(matchingPoint)
    }
  }, [data, selectedDate, selectedDataPoint])

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
              onMouseEnter={handleBarMouseEnter}
              onMouseLeave={handleBarMouseLeave}
            />
          </BarChart>
        </ChartContainer>

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
  data: _data,
  selectedDate,
  setSelectedDate,
  layoutMode
}: {
  chartId?: number
  title?: string
  data?: unknown
  selectedDate: string | null
  setSelectedDate: (date: string | null) => void
  layoutMode?: "vertical" | "grid" | "free"
}) {
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/chart-data")
        if (!response.ok) {
          throw new Error("Failed to fetch chart data")
        }
        const data = await response.json()
        setChartData(data)
      } catch (error) {
        console.error("Error fetching chart data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [])

  if (isLoading) {
    const skeletonHeight = layoutMode === "vertical" ? "h-[150px] max-h-[150px]" : "h-[250px]";
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

  return <ChartBarInteractive title={title} data={chartData} selectedDate={selectedDate} setSelectedDate={setSelectedDate} layoutMode={layoutMode} />
})
