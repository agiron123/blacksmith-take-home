import { create } from "zustand";

export type LayoutMode = "vertical" | "grid" | "free";

interface DashboardState {
  hoveredX: number | null; // Normalized position 0-1
  selectedDate: string | null;
  dateRange: { start: Date; end: Date } | null;
  layoutMode: LayoutMode;
  setHoveredX: (x: number | null) => void;
  setSelectedDate: (date: string | null) => void;
  setDateRange: (range: { start: Date; end: Date } | null) => void;
  setLayoutMode: (mode: LayoutMode) => void;
}

// Default date range aligned with sample data (April 1 - June 30, 2024)
// This ensures the ReferenceArea shows up by default
export const defaultDateRange = {
  start: new Date("2024-04-15T00:00:00"), // Mid-April
  end: new Date("2024-05-15T00:00:00"), // Mid-May
};

export const useDashboardStore = create<DashboardState>((set) => ({
  hoveredX: null,
  selectedDate: null,
  dateRange: defaultDateRange,
  layoutMode: "grid",
  setHoveredX: (x) => set({ hoveredX: x }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setDateRange: (range) => set({ dateRange: range }),
  setLayoutMode: (mode) => set({ layoutMode: mode }),
}));
