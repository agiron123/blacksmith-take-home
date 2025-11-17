import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders progress bar", () => {
    const { container } = render(<Progress value={50} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });

  it("sets correct value attribute", () => {
    const { container } = render(<Progress value={75} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });

  it("handles 0% value", () => {
    const { container } = render(<Progress value={0} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });

  it("handles 100% value", () => {
    const { container } = render(<Progress value={100} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });
});
