import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders calendar component", () => {
    const { container } = render(<Calendar mode="single" />);

    // Check that calendar container is rendered
    const calendar = container.querySelector('[role="grid"]');
    expect(calendar).toBeInTheDocument();
  });

  it("renders with selected date", () => {
    const date = new Date("2024-01-15");
    const { container } = render(<Calendar mode="single" selected={date} />);

    expect(container.querySelector('[role="grid"]')).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(<Calendar mode="single" className="custom-class" />);

    const calendar = container.firstChild;
    expect(calendar).toHaveClass("custom-class");
  });
});
