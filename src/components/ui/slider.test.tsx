import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Slider } from "./slider";

describe("Slider", () => {
  it("renders slider", () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    const slider = container.querySelector('[role="slider"]');
    expect(slider).toBeInTheDocument();
  });

  it("renders with default value", () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    const slider = container.querySelector('[role="slider"]');
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("renders with min and max values", () => {
    const { container } = render(<Slider min={0} max={100} defaultValue={[50]} />);
    const slider = container.querySelector('[role="slider"]');
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });
});
