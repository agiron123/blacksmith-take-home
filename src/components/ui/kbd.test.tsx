import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Kbd } from "./kbd";

describe("Kbd", () => {
  it("renders keyboard key", () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
  });

  it("applies correct styling", () => {
    const { container } = render(<Kbd>K</Kbd>);
    const kbd = container.firstChild;
    expect(kbd?.nodeName.toLowerCase()).toBe("kbd");
  });

  it("renders multiple keys", () => {
    render(
      <>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </>,
    );
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });
});
