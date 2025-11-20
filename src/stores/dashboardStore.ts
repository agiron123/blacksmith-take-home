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

export const useDashboardStore = create<DashboardState>((set) => ({
  hoveredX: null,
  selectedDate: null,
  dateRange: null,
  layoutMode: "grid",
  setHoveredX: (x) => set({ hoveredX: x }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setDateRange: (range) => set({ dateRange: range }),
  setLayoutMode: (mode) => set({ layoutMode: mode }),
}));
