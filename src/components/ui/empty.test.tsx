import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Empty, EmptyDescription, EmptyTitle } from "./empty";

describe("Empty", () => {
  it("renders empty state with title and description", () => {
    render(
      <Empty>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>Get started by creating a new item.</EmptyDescription>
      </Empty>,
    );

    expect(screen.getByText("No items found")).toBeInTheDocument();
    expect(screen.getByText("Get started by creating a new item.")).toBeInTheDocument();
  });

  it("renders empty state with only title", () => {
    render(
      <Empty>
        <EmptyTitle>No results</EmptyTitle>
      </Empty>,
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});
