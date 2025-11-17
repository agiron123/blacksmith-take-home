import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("renders avatar with image", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>,
    );

    // Check that avatar container is rendered
    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toBeInTheDocument();
  });

  it("renders avatar with fallback", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});
