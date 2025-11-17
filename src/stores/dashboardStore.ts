import { create } from "zustand";

export type LayoutMode = "vertical" | "grid" | "free";

interface DashboardState {
  hoveredX: number | null; // Normalized position 0-1
  dateRange: { start: Date; end: Date };
  layoutMode: LayoutMode;
  setHoveredX: (x: number | null) => void;
  setDateRange: (range: { start: Date; end: Date }) => void;
  setLayoutMode: (mode: LayoutMode) => void;
}

const defaultDateRange = {
  start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  end: new Date(),
};

export const useDashboardStore = create<DashboardState>((set) => ({
  hoveredX: null,
  dateRange: defaultDateRange,
  layoutMode: "grid",
  setHoveredX: (x) => set({ hoveredX: x }),
  setDateRange: (range) => set({ dateRange: range }),
  setLayoutMode: (mode) => set({ layoutMode: mode }),
}));
