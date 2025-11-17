import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("renders label with text", () => {
    render(<Label>Label Text</Label>);
    expect(screen.getByText("Label Text")).toBeInTheDocument();
  });

  it("associates with input using htmlFor", () => {
    render(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" />
      </>,
    );

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "test-input");
  });
});
