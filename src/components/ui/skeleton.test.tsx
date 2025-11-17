import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders skeleton element", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-full" />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass("h-4", "w-full");
  });
});
