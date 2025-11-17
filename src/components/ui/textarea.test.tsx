import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders textarea", () => {
    render(<Textarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);

    const textarea = screen.getByPlaceholderText("Type here");
    await user.type(textarea, "Hello World");
    expect(textarea).toHaveValue("Hello World");
  });

  it("can be disabled", () => {
    render(<Textarea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });
});
