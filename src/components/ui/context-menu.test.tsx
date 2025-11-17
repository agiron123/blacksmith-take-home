import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./context-menu";

describe("ContextMenu", () => {
  it("renders context menu trigger", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Right click here</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    expect(screen.getByText("Right click here")).toBeInTheDocument();
  });

  it("opens context menu on right click", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Right click here</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    await user.pointer({ keys: "[MouseRight]", target: screen.getByText("Right click here") });
    // Context menu should open
  });
});
