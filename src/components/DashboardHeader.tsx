import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useDashboardStore, LayoutMode } from "@/stores/dashboardStore";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const { dateRange, setDateRange, layoutMode, setLayoutMode } = useDashboardStore();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateSelect = (
    range: { from: Date | undefined; to: Date | undefined } | undefined,
  ) => {
    if (range?.from && range?.to) {
      setDateRange({
        start: range.from,
        end: range.to,
      });
      setIsDatePickerOpen(false);
    } else if (range?.from) {
      // If only start date is selected, wait for end date
      // Keep popover open
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <ToggleGroup
          type="single"
          value={layoutMode}
          onValueChange={(value) => {
            if (value) setLayoutMode(value as LayoutMode);
          }}
        >
          <ToggleGroupItem value="vertical" aria-label="Vertical layout">
            Vertical
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid layout">
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem value="free" aria-label="Free layout">
            Free
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.start && dateRange?.end ? (
              <>
                {format(dateRange.start, "MMM dd, yyyy")} - {format(dateRange.end, "MMM dd, yyyy")}
              </>
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.start}
            selected={{
              from: dateRange?.start,
              to: dateRange?.end,
            }}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
