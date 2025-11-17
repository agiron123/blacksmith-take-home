import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollArea, ScrollBar } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders scroll area with content", () => {
    render(
      <ScrollArea className="h-[200px] w-full">
        <div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 10")).toBeInTheDocument();
  });

  it("renders with scrollbar", () => {
    const { container } = render(
      <ScrollArea className="h-[200px] w-full">
        <div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </div>
        <ScrollBar />
      </ScrollArea>,
    );

    expect(container.querySelector("[data-radix-scroll-area-viewport]")).toBeInTheDocument();
  });

  it("renders horizontal scrollbar", () => {
    const { container } = render(
      <ScrollArea className="w-[200px]">
        <div className="w-[500px]">Wide content</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>,
    );

    expect(container.querySelector("[data-radix-scroll-area-viewport]")).toBeInTheDocument();
  });
});
