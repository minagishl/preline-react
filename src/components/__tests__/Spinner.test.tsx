import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "../Spinner";

describe("Spinner Component", () => {
  it("renders spinner with default props", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
    expect(spinner).toHaveClass("text-blue-600"); // default color
    expect(spinner).toHaveClass("size-6"); // default size (md)
    expect(spinner).toHaveAttribute("aria-label", "loading");
  });

  it("renders loading text for screen readers", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toHaveClass("sr-only");
  });

  describe("Colors", () => {
    it.each([
      ["blue", "text-blue-600"],
      ["gray", "text-gray-400"],
      ["dark", "text-gray-800"],
      ["red", "text-red-600"],
      ["yellow", "text-yellow-600"],
      ["green", "text-green-600"],
      ["indigo", "text-indigo-600"],
      ["purple", "text-purple-600"],
      ["pink", "text-pink-600"],
      ["orange", "text-orange-600"],
      ["white", "text-white"],
    ])("renders %s color correctly", (color, expectedClass) => {
      render(
        <Spinner
          color={
            color as
              | "blue"
              | "gray"
              | "dark"
              | "red"
              | "yellow"
              | "green"
              | "indigo"
              | "purple"
              | "pink"
              | "orange"
              | "white"
          }
        />,
      );
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(expectedClass);
    });
  });

  describe("Sizes", () => {
    it.each([
      ["sm", "size-4"],
      ["md", "size-6"],
      ["lg", "size-8"],
    ])("renders %s size correctly", (size, expectedClass) => {
      render(<Spinner size={size as "sm" | "md" | "lg"} />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(expectedClass);
    });
  });

  describe("HTML Attributes", () => {
    it("forwards HTML attributes", () => {
      render(<Spinner data-testid="custom-spinner" id="spinner-1" />);
      const spinner = screen.getByTestId("custom-spinner");
      expect(spinner).toHaveAttribute("id", "spinner-1");
    });

    it("applies custom className", () => {
      render(<Spinner className="custom-spinner" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("custom-spinner");
      expect(spinner).toHaveClass("animate-spin"); // should still have base classes
    });
  });

  describe("Accessibility", () => {
    it("has correct role and aria-label", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "loading");
    });

    it("supports custom aria-label", () => {
      render(<Spinner aria-label="Processing request" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Processing request");
    });

    it("includes screen reader text", () => {
      render(<Spinner />);
      const screenReaderText = screen.getByText("Loading...");
      expect(screenReaderText).toBeInTheDocument();
      expect(screenReaderText).toHaveClass("sr-only");
    });
  });

  describe("Structure", () => {
    it("has correct base classes", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");

      expect(spinner).toHaveClass("animate-spin");
      expect(spinner).toHaveClass("inline-block");
      expect(spinner).toHaveClass("border-[3px]");
      expect(spinner).toHaveClass("border-current");
      expect(spinner).toHaveClass("border-t-transparent");
      expect(spinner).toHaveClass("rounded-full");
    });
  });
});
