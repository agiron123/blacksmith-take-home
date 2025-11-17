import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";

describe("Resizable", () => {
  it("renders resizable panels", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>Panel 1</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>Panel 2</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    expect(container.querySelector("[data-panel-group]")).toBeInTheDocument();
  });

  it("renders vertical resizable panels", () => {
    const { container } = render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={50}>
          <div>Top Panel</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>Bottom Panel</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    expect(container.querySelector("[data-panel-group]")).toBeInTheDocument();
  });

  it("renders resizable handle with visual indicator", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>Panel 1</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div>Panel 2</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    const handle = container.querySelector("[data-panel-resize-handle-id]");
    expect(handle).toBeInTheDocument();
  });
});
