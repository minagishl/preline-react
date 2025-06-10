import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Typography from "../../content/Typography";

describe("Typography Component", () => {
  it("renders with default props", () => {
    render(<Typography>Test text</Typography>);
    const typography = screen.getByText("Test text");
    expect(typography).toBeInTheDocument();
    expect(typography.tagName).toBe("P");
    expect(typography).toHaveClass("text-base", "dark:text-white");
  });

  it("renders with custom as prop", () => {
    render(
      <Typography as="h1" variant="h1">
        Heading text
      </Typography>,
    );
    const typography = screen.getByText("Heading text");
    expect(typography.tagName).toBe("H1");
  });

  describe("Variants", () => {
    it.each([
      ["h1", "text-4xl", "font-bold", "dark:text-white"],
      ["h2", "text-3xl", "font-bold", "dark:text-white"],
      ["h3", "text-2xl", "font-bold", "dark:text-white"],
      ["h4", "text-xl", "font-bold", "dark:text-white"],
      ["h5", "text-lg", "font-bold", "dark:text-white"],
      ["h6", "text-base", "font-bold", "dark:text-white"],
      ["p", "text-base", "dark:text-white"],
      ["small", "text-sm"],
      ["mark", "bg-yellow-200", "dark:bg-yellow-800"],
      ["del", "line-through"],
      ["s", "line-through"],
      ["ins", "no-underline"],
      ["u", "underline"],
      ["strong", "font-bold"],
      ["em", "italic"],
      [
        "gradient",
        "bg-clip-text",
        "bg-gradient-to-tl",
        "from-blue-500",
        "to-violet-500",
        "text-transparent",
      ],
    ])("renders %s variant correctly", (variant, ...expectedClasses) => {
      render(
        <Typography
          variant={
            variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small"
          }
        >
          Test content
        </Typography>,
      );
      const typography = screen.getByText("Test content");
      expectedClasses.forEach((className) => {
        expect(typography).toHaveClass(className);
      });
    });
  });

  it("applies custom className", () => {
    render(
      <Typography className="custom-class">Custom styled text</Typography>,
    );
    const typography = screen.getByText("Custom styled text");
    expect(typography).toHaveClass("custom-class");
    expect(typography).toHaveClass("text-base"); // default variant classes should still be applied
  });

  it("passes through additional props", () => {
    render(
      <Typography data-testid="typography-test" id="custom-id">
        Test text
      </Typography>,
    );
    const typography = screen.getByTestId("typography-test");
    expect(typography).toHaveAttribute("id", "custom-id");
  });

  it("renders with correct semantic HTML elements for heading variants", () => {
    const headingVariants = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

    headingVariants.forEach((variant) => {
      const { unmount } = render(
        <Typography as={variant} variant={variant}>
          {`${variant.toUpperCase()} Heading`}
        </Typography>,
      );

      const heading = screen.getByText(`${variant.toUpperCase()} Heading`);
      expect(heading.tagName).toBe(variant.toUpperCase());

      unmount();
    });
  });

  it("renders complex children correctly", () => {
    render(
      <Typography>
        Text with <span>nested</span> elements
      </Typography>,
    );
    expect(screen.getByText(/Text with/)).toBeInTheDocument();
    expect(screen.getByText("nested")).toBeInTheDocument();
    expect(screen.getByText(/elements/)).toBeInTheDocument();
  });

  it("maintains correct contrast for dark mode", () => {
    render(<Typography variant="h1">Dark mode heading</Typography>);
    const typography = screen.getByText("Dark mode heading");
    expect(typography).toHaveClass("dark:text-white");
  });
});
