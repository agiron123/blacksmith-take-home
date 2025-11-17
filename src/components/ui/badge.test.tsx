import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders badge with text", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("renders different variants", () => {
    const { rerender, container } = render(<Badge variant="default">Default</Badge>);
    expect(container.firstChild).toHaveClass("bg-primary");

    rerender(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toHaveClass("bg-secondary");

    rerender(<Badge variant="destructive">Destructive</Badge>);
    expect(container.firstChild).toHaveClass("bg-destructive");

    rerender(<Badge variant="outline">Outline</Badge>);
    expect(container.firstChild).toHaveClass("text-foreground");
  });
});
