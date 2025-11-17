import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

describe("RadioGroup", () => {
  it("renders radio group with items", () => {
    render(
      <RadioGroup>
        <div>
          <RadioGroupItem value="option1" id="r1" />
          <Label htmlFor="r1">Option 1</Label>
        </div>
        <div>
          <RadioGroupItem value="option2" id="r2" />
          <Label htmlFor="r2">Option 2</Label>
        </div>
      </RadioGroup>,
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("allows selecting only one option", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <div>
          <RadioGroupItem value="option1" id="r1" />
          <Label htmlFor="r1">Option 1</Label>
        </div>
        <div>
          <RadioGroupItem value="option2" id="r2" />
          <Label htmlFor="r2">Option 2</Label>
        </div>
      </RadioGroup>,
    );

    const radio1 = screen.getByRole("radio", { name: "Option 1" });
    const radio2 = screen.getByRole("radio", { name: "Option 2" });

    await user.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    await user.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });
});
