import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("ToggleGroup", () => {
  it("renders toggle group with items", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Italic")).toBeInTheDocument();
  });

  it("allows single selection", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );

    const bold = screen.getByText("Bold");
    const italic = screen.getByText("Italic");

    await user.click(bold);
    expect(bold).toHaveAttribute("data-state", "on");
    expect(italic).toHaveAttribute("data-state", "off");

    await user.click(italic);
    expect(bold).toHaveAttribute("data-state", "off");
    expect(italic).toHaveAttribute("data-state", "on");
  });

  it("allows multiple selection", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );

    const bold = screen.getByText("Bold");
    const italic = screen.getByText("Italic");

    await user.click(bold);
    expect(bold).toHaveAttribute("data-state", "on");

    await user.click(italic);
    expect(bold).toHaveAttribute("data-state", "on");
    expect(italic).toHaveAttribute("data-state", "on");
  });
});
