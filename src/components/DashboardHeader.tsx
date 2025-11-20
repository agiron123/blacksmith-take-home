import { useEffect, useState } from "react";
import { CalendarIcon, RotateCcw } from "lucide-react";
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
  const [draftRange, setDraftRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: dateRange?.start,
    to: dateRange?.end,
  });

  useEffect(() => {
    if (isDatePickerOpen) {
      setDraftRange({
        from: dateRange?.start,
        to: dateRange?.end,
      });
    }
  }, [dateRange?.end, dateRange?.start, isDatePickerOpen]);

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) =>
    setDraftRange({
      from: range?.from,
      to: range?.to,
    });

  const handleSave = () => {
    if (draftRange.from && draftRange.to) {
      setDateRange({
        start: draftRange.from,
        end: draftRange.to,
      });
      setIsDatePickerOpen(false);
    }
  };

  const handleCancel = () => {
    setDraftRange({
      from: dateRange?.start,
      to: dateRange?.end,
    });
    setIsDatePickerOpen(false);
  };

  const handleReset = () =>
    setDraftRange({
      from: undefined,
      to: undefined,
    });

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

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setDateRange(null);
          }}
          title="Reset date range"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
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
          <div className="p-3 space-y-3">
            <Calendar
              mode="range"
              defaultMonth={draftRange.from ?? dateRange?.start ?? new Date()}
              selected={{
                from: draftRange.from,
                to: draftRange.to,
              }}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
            <div className="flex items-center justify-between gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!draftRange.from || !draftRange.to}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      </div>
    </div>
  );
}
