import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Link from "../../content/Link";

describe("Link Component", () => {
  it("renders with default props", () => {
    render(<Link href="/test">Test Link</Link>);
    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass(
      "text-blue-600",
      "focus:outline-hidden",
      "hover:text-blue-500",
    );
  });

  it("renders with custom as prop", () => {
    render(
      <Link as="button" type="button">
        Button Link
      </Link>,
    );
    const buttonLink = screen.getByRole("button", { name: "Button Link" });
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink.tagName).toBe("BUTTON");
  });

  describe("Variants", () => {
    it("renders default variant correctly", () => {
      render(
        <Link variant="default" href="/test">
          Default Link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("text-blue-600", "hover:text-blue-500");
      expect(link).not.toHaveClass("decoration-2");
    });

    it("renders underline variant correctly", () => {
      render(
        <Link variant="underline" href="/test">
          Underline Link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass(
        "decoration-2",
        "hover:underline",
        "focus:underline",
      );
    });

    it("renders icon variant correctly", () => {
      render(
        <Link variant="icon" href="/test">
          Icon Link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass(
        "inline-flex",
        "items-center",
        "gap-x-1",
        "text-sm",
        "text-gray-800",
        "hover:text-blue-600",
      );
      expect(link).not.toHaveClass("text-blue-600"); // icon variant doesn't use base styles
    });

    it("renders white variant correctly", () => {
      render(
        <Link variant="white" href="/test">
          White Link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass(
        "py-2",
        "px-3",
        "inline-flex",
        "items-center",
        "rounded-full",
        "border",
        "bg-white",
      );
    });
  });

  describe("Underline Colors", () => {
    it.each([
      ["dark", "decoration-gray-800"],
      ["gray", "decoration-gray-500"],
      ["teal", "decoration-teal-500"],
      ["blue", "decoration-blue-600"],
      ["red", "decoration-red-500"],
      ["yellow", "decoration-yellow-500"],
      ["white", "decoration-white"],
    ])("renders %s underline color correctly", (color, expectedClass) => {
      render(
        <Link
          variant="underline"
          underlineColor={
            color as
              | "dark"
              | "gray"
              | "teal"
              | "blue"
              | "red"
              | "yellow"
              | "white"
          }
          href="/test"
        >
          Colored Underline Link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass(expectedClass);
    });
  });

  describe("Underline Offsets", () => {
    it.each([
      ["1", "underline-offset-1"],
      ["2", "underline-offset-2"],
      ["4", "underline-offset-4"],
      ["8", "underline-offset-8"],
    ])("renders underline offset %s correctly", (offset, expectedClass) => {
      render(
        <Link
          variant="underline"
          underlineOffset={offset as "1" | "2" | "4" | "8"}
          href="/test"
        >
          Offset Underline Link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass(expectedClass);
    });
  });

  describe("Icons", () => {
    it("renders left icon", () => {
      render(
        <Link leftIcon={<span data-testid="left-icon">←</span>} href="/test">
          Link with left icon
        </Link>,
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders right icon", () => {
      render(
        <Link rightIcon={<span data-testid="right-icon">→</span>} href="/test">
          Link with right icon
        </Link>,
      );
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("renders both left and right icons", () => {
      render(
        <Link
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
          href="/test"
        >
          Link with both icons
        </Link>,
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });
  });

  it("applies custom className", () => {
    render(
      <Link className="custom-class" href="/test">
        Custom styled link
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
    expect(link).toHaveClass("text-blue-600"); // default classes should still be applied
  });

  it("passes through additional props", () => {
    render(
      <Link data-testid="link-test" target="_blank" rel="noopener" href="/test">
        External Link
      </Link>,
    );
    const link = screen.getByTestId("link-test");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  describe("Interactions", () => {
    it("calls onClick handler when clicked", () => {
      const handleClick = jest.fn();
      render(
        <Link href="/test" onClick={handleClick}>
          Clickable Link
        </Link>,
      );

      const link = screen.getByRole("link");
      fireEvent.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard navigation", () => {
      const handleKeyDown = jest.fn();
      render(
        <Link href="/test" onKeyDown={handleKeyDown}>
          Keyboard Link
        </Link>,
      );

      const link = screen.getByRole("link");
      fireEvent.keyDown(link, { key: "Enter" });

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("maintains proper focus behavior", () => {
      render(<Link href="/test">Focusable Link</Link>);
      const link = screen.getByRole("link");

      link.focus();
      expect(link).toHaveFocus();
      expect(link).toHaveClass("focus:outline-hidden");
    });

    it("supports aria attributes", () => {
      render(
        <Link href="/test" aria-label="Navigate to test page">
          Test
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Navigate to test page");
    });
  });

  describe("Complex combinations", () => {
    it("combines underline variant with color and offset", () => {
      render(
        <Link
          variant="underline"
          underlineColor="blue"
          underlineOffset="4"
          href="/test"
        >
          Complex underline link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass(
        "decoration-2",
        "hover:underline",
        "decoration-blue-600",
        "underline-offset-4",
      );
    });

    it("combines icon variant with icons", () => {
      render(
        <Link
          variant="icon"
          leftIcon={<span data-testid="icon">🔗</span>}
          href="/test"
        >
          Icon link
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("inline-flex", "items-center", "gap-x-1");
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });
});
