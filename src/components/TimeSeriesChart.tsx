"use client"

import * as React from "react"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
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

  return (
    <Card className="py-0">
      <CardContent className="px-2 sm:p-6">
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
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={8} />
          </BarChart>
        </ChartContainer>
        {/* {title && (
          <div className="mt-4 text-sm font-medium text-center">{title}</div>
        )} */}
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
