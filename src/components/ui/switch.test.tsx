import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders switch", () => {
    render(<Switch />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
  });

  it("can be toggled on and off", async () => {
    const user = userEvent.setup();
    render(<Switch />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("data-state", "unchecked");

    await user.click(switchElement);
    expect(switchElement).toHaveAttribute("data-state", "checked");

    await user.click(switchElement);
    expect(switchElement).toHaveAttribute("data-state", "unchecked");
  });

  it("can be disabled", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("can be checked by default", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });
});
