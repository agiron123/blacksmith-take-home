import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

describe("Command", () => {
  it("renders command palette", () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );

    expect(screen.getByPlaceholderText("Type a command...")).toBeInTheDocument();
  });

  it("displays command items", () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );

    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Search Emoji")).toBeInTheDocument();
    expect(screen.getByText("Calculator")).toBeInTheDocument();
  });

  it("shows empty state when no results", () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions"></CommandGroup>
        </CommandList>
      </Command>,
    );

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });
});
