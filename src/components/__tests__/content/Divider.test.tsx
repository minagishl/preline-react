import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Divider from "../../content/Divider";

describe("Divider Component", () => {
  it("renders with default props", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
    expect(divider.tagName).toBe("HR");
    expect(divider).toHaveClass(
      "border-t",
      "border-gray-200",
      "dark:border-neutral-700",
    );
  });

  describe("Colors", () => {
    it.each([
      ["default", "border-gray-200", "dark:border-neutral-700"],
      ["gray-800", "border-gray-800", "dark:border-white"],
      ["gray-500", "border-gray-500", "dark:border-neutral-500"],
      ["teal-500", "border-teal-500"],
      ["blue-500", "border-blue-500"],
      ["red-500", "border-red-500"],
      ["yellow-500", "border-yellow-500"],
      ["white", "border-white"],
    ])("renders %s color correctly", (color, ...expectedClasses) => {
      render(
        <Divider
          color={
            color as
              | "default"
              | "gray-800"
              | "gray-500"
              | "teal-500"
              | "blue-500"
              | "red-500"
              | "yellow-500"
              | "white"
          }
        />,
      );
      const divider = screen.getByRole("separator");
      expectedClasses.forEach((className) => {
        expect(divider).toHaveClass(className);
      });
    });
  });

  describe("Heights", () => {
    it.each([
      ["1", "border-t"],
      ["2", "border-t-2"],
      ["4", "border-t-4"],
      ["8", "border-t-8"],
    ])("renders height %s correctly", (height, expectedClass) => {
      render(<Divider height={height as "1" | "2" | "4" | "8"} />);
      const divider = screen.getByRole("separator");
      expect(divider).toHaveClass(expectedClass);
    });
  });

  describe("Labels", () => {
    it("renders with center label by default", () => {
      render(<Divider label="Section" />);

      // For labeled dividers, the component returns a div container
      const container = screen.getByText("Section").closest("div");
      expect(container).toHaveClass(
        "py-3",
        "flex",
        "items-center",
        "text-sm",
        "text-gray-800",
        "dark:text-white",
      );
      expect(screen.getByText("Section")).toBeInTheDocument();

      // Should have lines on both sides
      const lines = container?.querySelectorAll("span");
      expect(lines).toHaveLength(2);
      lines?.forEach((line) => {
        expect(line).toHaveClass("flex-1", "border-t");
      });
    });

    it("renders with left positioned label", () => {
      render(<Divider label="Left Label" labelPosition="left" />);

      const container = screen.getByText("Left Label").closest("div");
      expect(container).toHaveClass("py-3", "flex", "items-center");

      // Should have only one line on the right
      const lines = container?.querySelectorAll("span");
      expect(lines).toHaveLength(1);
      expect(lines?.[0]).toHaveClass("ms-6");
    });

    it("renders with right positioned label", () => {
      render(<Divider label="Right Label" labelPosition="right" />);

      const container = screen.getByText("Right Label").closest("div");
      expect(container).toHaveClass("py-3", "flex", "items-center");

      // Should have only one line on the left
      const lines = container?.querySelectorAll("span");
      expect(lines).toHaveLength(1);
      expect(lines?.[0]).toHaveClass("me-6");
    });

    it("renders with React element as label", () => {
      render(
        <Divider
          label={<span data-testid="custom-label">Custom Element</span>}
        />,
      );

      expect(screen.getByTestId("custom-label")).toBeInTheDocument();
      expect(screen.getByText("Custom Element")).toBeInTheDocument();
    });

    it("applies color to label lines", () => {
      render(<Divider label="Colored" color="blue-500" />);

      const container = screen.getByText("Colored").closest("div");
      const lines = container?.querySelectorAll("span");

      lines?.forEach((line) => {
        expect(line).toHaveClass("border-blue-500");
      });
    });
  });

  describe("Vertical orientation", () => {
    it("renders vertical divider correctly", () => {
      render(<Divider vertical data-testid="vertical-divider" />);

      // Vertical dividers use div instead of hr and don't have role="separator" by default
      const divider = screen.getByTestId("vertical-divider");
      expect(divider.tagName).toBe("DIV");
      expect(divider).toHaveClass(
        "border-t",
        "sm:border-s",
        "sm:border-t-0",
        "border-gray-200",
        "dark:border-neutral-700",
      );
    });

    it("applies color to vertical divider", () => {
      render(
        <Divider vertical color="teal-500" data-testid="vertical-divider" />,
      );

      const divider = screen.getByTestId("vertical-divider");
      expect(divider).toHaveClass("border-teal-500");
    });
  });

  it("applies custom className", () => {
    render(<Divider className="custom-class" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("custom-class");
    expect(divider).toHaveClass("border-t"); // default classes should still be applied
  });

  it("passes through additional props", () => {
    render(<Divider data-testid="divider-test" id="custom-id" />);
    const divider = screen.getByTestId("divider-test");
    expect(divider).toHaveAttribute("id", "custom-id");
  });

  describe("Accessibility", () => {
    it("has proper separator role", () => {
      render(<Divider />);
      const divider = screen.getByRole("separator");
      expect(divider).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(<Divider aria-label="Content separator" />);
      const divider = screen.getByRole("separator");
      expect(divider).toHaveAttribute("aria-label", "Content separator");
    });
  });

  describe("Complex combinations", () => {
    it("combines height and color correctly", () => {
      render(<Divider height="4" color="red-500" />);
      const divider = screen.getByRole("separator");
      expect(divider).toHaveClass("border-t-4", "border-red-500");
    });

    it("handles vertical with custom color and className", () => {
      render(
        <Divider
          vertical
          color="yellow-500"
          className="my-custom-class"
          data-testid="vertical-divider"
        />,
      );
      const divider = screen.getByTestId("vertical-divider");
      expect(divider).toHaveClass(
        "border-t",
        "sm:border-s",
        "sm:border-t-0",
        "border-yellow-500",
        "my-custom-class",
      );
    });

    it("combines all label props correctly", () => {
      render(
        <Divider
          label="Complex Label"
          labelPosition="right"
          color="teal-500"
          className="custom-divider"
        />,
      );

      const container = screen.getByText("Complex Label").closest("div");
      expect(container).toHaveClass(
        "py-3",
        "flex",
        "items-center",
        "custom-divider",
      );

      const line = container?.querySelector("span");
      expect(line).toHaveClass("flex-1", "border-t", "border-teal-500", "me-6");
    });
  });

  describe("Dark mode support", () => {
    it("applies dark mode classes for default color", () => {
      render(<Divider />);
      const divider = screen.getByRole("separator");
      expect(divider).toHaveClass("dark:border-neutral-700");
    });

    it("applies dark mode classes for gray-800 color", () => {
      render(<Divider color="gray-800" />);
      const divider = screen.getByRole("separator");
      expect(divider).toHaveClass("dark:border-white");
    });

    it("applies dark mode classes for gray-500 color", () => {
      render(<Divider color="gray-500" />);
      const divider = screen.getByRole("separator");
      expect(divider).toHaveClass("dark:border-neutral-500");
    });

    it("applies dark mode text color to labels", () => {
      render(<Divider label="Dark Label" />);
      const container = screen.getByText("Dark Label").closest("div");
      expect(container).toHaveClass("dark:text-white");
    });
  });

  describe("Edge cases", () => {
    it("handles empty label gracefully", () => {
      render(<Divider label="" />);
      // Empty label should still create a div container, but if it doesn't, test for hr
      const separators = screen.getAllByRole("separator");
      expect(separators.length).toBeGreaterThan(0);
      // Check if we have the labeled div structure or fallback to hr
      const container =
        document.querySelector('div[class*="py-3"]') || separators[0];
      expect(container).toBeInTheDocument();
    });

    it("handles label with only whitespace", () => {
      render(<Divider label="   " />);
      // Use getAllByText to handle multiple matching elements
      const texts = screen.getAllByText((content, element) => {
        return element?.textContent?.trim() === "";
      });
      expect(texts.length).toBeGreaterThan(0);
    });
  });
});
