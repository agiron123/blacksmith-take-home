import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { Layout } from "react-grid-layout";

interface FreeLayoutProps {
  children: ReactNode[];
}

const STORAGE_KEY = "dashboard-free-layout";

// Default layout for 9 charts in a 3x3 grid
const getDefaultLayout = (): Layout[] => {
  const cols = 12; // Using 12 columns for flexibility
  const _rowHeight = 100;
  const _gap = 16;

  return Array.from({ length: 9 }, (_, i) => {
    const row = Math.floor(i / 3);
    const col = (i % 3) * 4; // Each chart takes 4 columns (3 charts per row)

    return {
      i: i.toString(),
      x: col,
      y: row * 3, // Each chart is 3 rows tall
      w: 4,
      h: 3,
      minW: 2,
      minH: 2,
      maxW: cols,
      maxH: 10,
    };
  });
};

export function FreeLayout({ children }: FreeLayoutProps) {
  const [layout, setLayout] = useState<Layout[]>(() => {
    // Try to load from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved layout", e);
        }
      }
    }
    return getDefaultLayout();
  });

  const [width, setWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth - 64;
    }
    return 1200;
  });

  // Handle window resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWidth(window.innerWidth - 64);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save layout to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    }
  }, [layout]);

  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
  }, []);

  return (
    <div className="w-full">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={width}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {children.map((child, index) => (
          <div key={index.toString()} className="w-full h-full cursor-move min-w-0 min-h-0">
            {child}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
