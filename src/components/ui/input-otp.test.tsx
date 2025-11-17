import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";

describe("InputOTP", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders OTP input slots", () => {
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(1);
  });

  it("renders with correct max length", () => {
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = container.querySelector("input");
    expect(input).toHaveAttribute("maxlength", "6");
  });
});
