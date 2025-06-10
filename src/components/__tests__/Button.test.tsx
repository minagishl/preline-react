import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("Button Component", () => {
  it("renders basic button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies default props correctly", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("py-3"); // md size
    expect(button).toHaveClass("rounded-lg"); // default shape
    expect(button).toHaveClass("bg-blue-600"); // solid blue (default)
  });

  describe("Variants", () => {
    it.each([
      ["solid", "bg-blue-600"],
      ["outline", "border-blue-600"],
      ["ghost", "text-blue-600"],
      ["soft", "bg-blue-100"],
      ["white", "bg-white"],
      ["link", "text-blue-600"],
    ])("renders %s variant correctly", (variant, expectedClass) => {
      render(
        <Button
          variant={
            variant as "solid" | "outline" | "ghost" | "soft" | "white" | "link"
          }
        >
          Test
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClass);
    });
  });

  describe("Colors", () => {
    it.each([
      ["dark", "bg-gray-800"],
      ["gray", "bg-gray-500"],
      ["teal", "bg-teal-500"],
      ["blue", "bg-blue-600"],
      ["red", "bg-red-500"],
      ["yellow", "bg-yellow-500"],
      ["white", "bg-white"],
    ])("renders %s color correctly", (color, expectedClass) => {
      render(
        <Button
          color={
            color as
              | "dark"
              | "gray"
              | "teal"
              | "blue"
              | "red"
              | "yellow"
              | "white"
          }
        >
          Test
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClass);
    });
  });

  describe("Sizes", () => {
    it.each([
      ["sm", "py-2"],
      ["md", "py-3"],
      ["lg", "p-4"],
    ])("renders %s size correctly", (size, expectedClass) => {
      render(<Button size={size as "sm" | "md" | "lg"}>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClass);
    });
  });

  describe("Shapes", () => {
    it("renders pill shape", () => {
      render(<Button shape="pill">Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-full");
    });

    it("renders block shape", () => {
      render(<Button shape="block">Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full");
      expect(button).toHaveClass("justify-center");
    });
  });

  describe("Icon Only", () => {
    it("renders icon only button with correct classes", () => {
      render(<Button iconOnly>🔥</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("flex");
      expect(button).toHaveClass("shrink-0");
      expect(button).toHaveClass("size-11"); // md size for icon only
    });

    it("applies correct icon only sizes", () => {
      const { rerender } = render(
        <Button iconOnly size="sm">
          🔥
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass("size-9.5");

      rerender(
        <Button iconOnly size="lg">
          🔥
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass("size-15.5");
    });
  });

  describe("Icons", () => {
    it("renders left icon", () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">←</span>}>Test</Button>,
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders right icon", () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          Test
        </Button>,
      );
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("shows spinner when loading", () => {
      render(<Button loading>Loading Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Loading Button");
      expect(button).toBeDisabled();
    });

    it("shows only spinner for icon-only loading button", () => {
      render(
        <Button loading iconOnly>
          🔥
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("hides icons when loading", () => {
      render(
        <Button
          loading
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Loading
        </Button>,
      );

      expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("disables button when disabled prop is true", () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:opacity-50");
      expect(button).toHaveClass("disabled:pointer-events-none");
    });

    it("disables button when loading", () => {
      render(<Button loading>Loading Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("calls onClick handler when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>,
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("HTML Attributes", () => {
    it("forwards HTML attributes", () => {
      render(
        <Button type="submit" data-testid="custom-button">
          Submit
        </Button>,
      );
      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(<Button aria-label="Custom label">Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
    });
  });
});
