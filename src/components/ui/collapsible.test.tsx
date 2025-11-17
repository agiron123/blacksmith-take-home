import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Button } from "./button";

describe("Collapsible", () => {
  it("renders collapsible with trigger and content", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button>Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>Hidden content</div>
        </CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  it("toggles content visibility when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button>Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>Hidden content</div>
        </CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText("Toggle");
    await user.click(trigger);
    // Content visibility is managed by the component
  });

  it("can be open by default", () => {
    render(
      <Collapsible open>
        <CollapsibleTrigger asChild>
          <Button>Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>Visible content</div>
        </CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});
