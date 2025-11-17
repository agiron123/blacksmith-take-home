import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

describe("Popover", () => {
  it("renders popover trigger", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover content</p>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("opens popover when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover content</p>
        </PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByText("Open Popover"));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });
});
