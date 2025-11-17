import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("renders with children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies correct aspect ratio style", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>,
    );
    const aspectRatioDiv = container.firstChild;
    expect(aspectRatioDiv).toHaveStyle({ paddingBottom: "56.25%" });
  });
});
