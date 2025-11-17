import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("renders toggle button", () => {
    render(<Toggle>Toggle</Toggle>);
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  it("can be toggled on and off", async () => {
    const user = userEvent.setup();
    render(<Toggle>Toggle</Toggle>);

    const toggle = screen.getByRole("button", { name: "Toggle" });
    expect(toggle).toHaveAttribute("data-state", "off");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "off");
  });

  it("can be pressed by default", () => {
    render(<Toggle pressed>Toggle</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "on");
  });

  it("can be disabled", () => {
    render(<Toggle disabled>Toggle</Toggle>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
