"use client"

import * as React from "react"

import { Bar, BarChart, CartesianGrid, ReferenceArea, Tooltip, XAxis } from "recharts"

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
  highlightRange,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  isDragging,
}: {
  data: ChartDataPoint[]
  activeChart: keyof typeof chartConfig
  layoutMode?: "vertical" | "grid" | "free"
  onBarMouseEnter: (barItem: unknown) => void
  onBarMouseLeave: () => void
  highlightRange?: { start: string; end: string } | null
  onMouseDown?: (e: React.MouseEvent) => void
  onMouseMove?: (e: React.MouseEvent) => void
  onMouseUp?: (e: React.MouseEvent) => void
  isDragging?: boolean
}) {
  const chartRef = React.useRef<any>(null)

  return (
    <ChartContainer
      config={chartConfig}
      className={`w-full h-full min-w-0 min-h-0 flex-1 ${layoutMode === "vertical" ? "max-h-[138px]" : ""} ${isDragging ? "cursor-crosshair" : ""}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // End drag if mouse leaves chart area
    >
      <BarChart
        ref={chartRef}
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
        {highlightRange ? (
          <ReferenceArea
            x1={highlightRange.start}
            x2={highlightRange.end}
            fill={isDragging ? "rgba(59, 130, 246, 0.25)" : "rgba(59, 130, 246, 0.14)"}
            stroke={isDragging ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.35)"}
            strokeDasharray={isDragging ? "2 2" : "4 4"}
            strokeWidth={isDragging ? 2 : 1}
          />
        ) : null}
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
  const dateRange = useDashboardStore((state) => state.dateRange)
  const setDateRange = useDashboardStore((state) => state.setDateRange)
  
  // Drag state
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState<{ x: number; date: string } | null>(null)
  const [dragEnd, setDragEnd] = React.useState<{ x: number; date: string } | null>(null)
  const chartContainerRef = React.useRef<HTMLDivElement>(null)
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
      if (firstDataPoint) {
        setSelectedDataPoint(firstDataPoint)
        setSelectedDate(firstDataPoint.date)
      }
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
    // Don't update hover state while dragging
    if (isDragging) return
    
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
  }, [setSelectedDate, isDragging])

  const handleBarMouseLeave = React.useCallback(() => {
    // Optionally clear selection when leaving bars
    // setSelectedDataPoint(null)
  }, [])

  // Convert mouse X coordinate (clientX) to date string
  const getDateFromMouseX = React.useCallback((clientX: number): string | null => {
    if (!chartContainerRef.current || !data.length) return null

    const container = chartContainerRef.current
    const rect = container.getBoundingClientRect()
    
    // Check if mouse is within chart bounds
    if (clientX < rect.left || clientX > rect.right) return null
    
    const chartX = clientX - rect.left
    const chartWidth = rect.width - 24 // Account for margins (12px each side)

    // Calculate which data point the mouse is over
    const dataIndex = Math.round((chartX / chartWidth) * (data.length - 1))
    const clampedIndex = Math.max(0, Math.min(data.length - 1, dataIndex))
    
    return data[clampedIndex]?.date || null
  }, [data])

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    // Only start drag on left mouse button
    if (e.button !== 0) return

    const date = getDateFromMouseX(e.clientX)
    if (date) {
      setIsDragging(true)
      setDragStart({ x: e.clientX, date })
      setDragEnd({ x: e.clientX, date })
      e.preventDefault()
      e.stopPropagation()
    }
  }, [getDateFromMouseX])

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return

    const date = getDateFromMouseX(e.clientX)
    if (date) {
      setDragEnd({ x: e.clientX, date })
    }
  }, [isDragging, dragStart, getDateFromMouseX])

  const handleMouseUp = React.useCallback((_e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !dragStart || !dragEnd) return

    // Get the date range from drag
    const startDate = dragStart.date
    const endDate = dragEnd.date

    // Find the actual dates in the data
    const startIndex = data.findIndex(p => p.date === startDate)
    const endIndex = data.findIndex(p => p.date === endDate)

    if (startIndex !== -1 && endIndex !== -1) {
      const actualStart = data[Math.min(startIndex, endIndex)]
      const actualEnd = data[Math.max(startIndex, endIndex)]

      if (actualStart && actualEnd) {
        // Update the store with the new date range
        setDateRange({
          start: new Date(`${actualStart.date}T00:00:00`),
          end: new Date(`${actualEnd.date}T00:00:00`),
        })
      }
    }

    // Reset drag state
    setIsDragging(false)
    setDragStart(null)
    setDragEnd(null)
  }, [isDragging, dragStart, dragEnd, data, setDateRange])

  // Global mouse move handler for smoother dragging
  React.useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!chartContainerRef.current || !dragStart) return

      const date = getDateFromMouseX(e.clientX)
      if (date) {
        setDragEnd({ x: e.clientX, date })
      }
    }

    const handleGlobalMouseUp = (e: MouseEvent) => {
      handleMouseUp(e as any)
    }

    document.addEventListener("mousemove", handleGlobalMouseMove)
    document.addEventListener("mouseup", handleGlobalMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging, dragStart, getDateFromMouseX, handleMouseUp])

  // Show drag preview if dragging, otherwise show dateRange
  const highlightRange = React.useMemo(() => {
    // If dragging, show drag preview
    if (isDragging && dragStart && dragEnd) {
      const startIndex = data.findIndex(p => p.date === dragStart.date)
      const endIndex = data.findIndex(p => p.date === dragEnd.date)
      
      if (startIndex !== -1 && endIndex !== -1) {
        const actualStart = data[Math.min(startIndex, endIndex)]
        const actualEnd = data[Math.max(startIndex, endIndex)]
        
        if (actualStart && actualEnd) {
          return { start: actualStart.date, end: actualEnd.date }
        }
      }
      return null
    }

    // Otherwise show dateRange from store
    if (!data.length || !dateRange) return null

    // Normalize dates to start of day for comparison
    const normalizeDate = (date: Date) => {
      const normalized = new Date(date)
      normalized.setHours(0, 0, 0, 0)
      return normalized.getTime()
    }

    const parseDateLabel = (label: string) => {
      // Parse YYYY-MM-DD format and normalize to start of day
      const parsed = new Date(`${label}T00:00:00`)
      parsed.setHours(0, 0, 0, 0)
      return parsed.getTime()
    }

    const rangeStart = Math.min(normalizeDate(dateRange.start), normalizeDate(dateRange.end))
    const rangeEnd = Math.max(normalizeDate(dateRange.start), normalizeDate(dateRange.end))

    let startLabel: string | null = null
    let endLabel: string | null = null

    for (const point of data) {
      const pointTime = parseDateLabel(point.date)

      if (pointTime >= rangeStart && pointTime <= rangeEnd) {
        if (!startLabel) startLabel = point.date
        endLabel = point.date
      }

      if (pointTime > rangeEnd && endLabel) {
        break
      }
    }

    if (!startLabel || !endLabel) {
      return null
    }

    return { start: startLabel, end: endLabel }
  }, [data, dateRange, isDragging, dragStart, dragEnd])

  return (
    <Card className="py-0 w-full h-full flex flex-col overflow-hidden">
      <CardContent className="px-2 sm:p-6 w-full h-full flex flex-col min-h-0 flex-1">
        <div ref={chartContainerRef} className="flex-1 min-h-0 flex flex-col">
          <ChartBody
            data={data}
            activeChart={activeChart}
            layoutMode={layoutMode}
            onBarMouseEnter={handleBarMouseEnter}
            onBarMouseLeave={handleBarMouseLeave}
            highlightRange={highlightRange}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            isDragging={isDragging}
          />
        </div>

          <div className="flex justify-end w-full pt-4 flex-shrink-0">
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
      <Card className="py-0 min-w-0 w-full h-full flex flex-col overflow-hidden">
        <CardContent className="px-2 sm:p-6 w-full h-full flex flex-col min-h-0 flex-1">
          <div className={`${skeletonHeight} w-full min-w-0 flex items-center justify-center flex-1`}>
            <div className="w-full space-y-2">
              <Skeleton className={`${skeletonHeight} w-full`} />
            </div>
          </div>
          <div className="flex justify-end w-full pt-4 flex-shrink-0">
            <Skeleton className="h-6 w-32" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return <ChartBarInteractive title={title} data={chartData} layoutMode={layoutMode} />
})
