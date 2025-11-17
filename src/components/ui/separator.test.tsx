import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders horizontal separator by default", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[data-orientation="horizontal"]');
    expect(separator).toBeInTheDocument();
  });

  it("renders vertical separator when specified", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector('[data-orientation="vertical"]');
    expect(separator).toBeInTheDocument();
  });
});
