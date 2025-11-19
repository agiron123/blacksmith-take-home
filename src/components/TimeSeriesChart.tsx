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

export function ChartBarInteractive({
  title: _title,
  data
}: {
  title?: string
  data: ChartDataPoint[]
}) {
  const [activeChart] =
    React.useState<keyof typeof chartConfig>("desktop")
  const [selectedDataPoint, setSelectedDataPoint] = React.useState<ChartDataPoint | null>(null)

  React.useEffect(() => {
    if (data.length > 0) {
      const lastDataPoint = data[data.length - 1]
      if (lastDataPoint && !selectedDataPoint) {
        setSelectedDataPoint(lastDataPoint)
      }
    }
  }, [data, selectedDataPoint])

  const handleMouseMove = (state: any) => {
    if (state?.activeTooltipIndex !== undefined && state?.activeTooltipIndex !== null) {
      const index = state.activeTooltipIndex
      if (data[index]) {
        setSelectedDataPoint(data[index])
      }
    } else if (state?.activePayload && state.activePayload.length > 0) {
      const payload = state.activePayload[0]
      const dataPoint = payload.payload as ChartDataPoint
      setSelectedDataPoint(dataPoint)
    }
  }

  const handleMouseLeave = () => {
    // Keep the last selected data point visible
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="py-0">
      <CardContent className="px-2 sm:p-6 relative">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
            syncId="myBarChartSync"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
            />
          </BarChart>
        </ChartContainer>
        {selectedDataPoint && (
          <div className="inline-flex h-6 items-stretch rounded-full overflow-hidden border border-slate-300 text-xs leading-none">
            <div className="flex items-center justify-center bg-emerald-400 px-3 text-white font-semibold">
              {formatDate(selectedDataPoint.date)}
            </div>
            <div className="flex min-w-[48px] items-center justify-center bg-white px-3 text-black font-semibold">
              {activeChart === "desktop" ? selectedDataPoint.desktop : selectedDataPoint.mobile}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function TimeSeriesChart({
  chartId: _chartId,
  title,
  data: _data
}: {
  chartId?: number
  title?: string
  data?: unknown
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
    return (
      <Card className="py-0">
        <CardContent className="px-2 sm:p-6">
          <div className="aspect-auto h-[250px] w-full flex items-center justify-center">
            <div className="w-full space-y-2">
              <Skeleton className="h-[250px] w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <ChartBarInteractive title={title} data={chartData} />
}
