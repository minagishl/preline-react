import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KBD from "../../content/KBD";

describe("KBD Component", () => {
  it("renders with default props", () => {
    render(<KBD>Ctrl</KBD>);
    const kbd = screen.getByText("Ctrl");
    expect(kbd).toBeInTheDocument();
    expect(kbd.tagName).toBe("KBD");
    expect(kbd).toHaveClass("font-mono");
    expect(kbd).toHaveClass(
      "inline-flex",
      "justify-center",
      "items-center",
      "rounded-md",
    ); // boxed default
    expect(kbd).toHaveClass("bg-gray-200"); // light variant default
    expect(kbd).toHaveClass("min-h-7.5", "py-1", "px-1.5", "text-sm"); // sm size default
  });

  describe("Variants", () => {
    it("renders ghost variant correctly", () => {
      render(<KBD variant="ghost">Esc</KBD>);
      const kbd = screen.getByText("Esc");
      expect(kbd).toHaveClass("text-gray-400", "dark:text-neutral-600");
      expect(kbd).not.toHaveClass("inline-flex"); // non-boxed
      expect(kbd).not.toHaveClass("bg-gray-200"); // no background for ghost
    });

    it("renders subtle variant correctly", () => {
      render(<KBD variant="subtle">Tab</KBD>);
      const kbd = screen.getByText("Tab");
      expect(kbd).toHaveClass("text-gray-800", "dark:text-neutral-200");
      expect(kbd).not.toHaveClass("inline-flex"); // non-boxed
      expect(kbd).not.toHaveClass("bg-gray-200"); // no background for subtle
    });

    it("renders light variant correctly", () => {
      render(<KBD variant="light">Enter</KBD>);
      const kbd = screen.getByText("Enter");
      expect(kbd).toHaveClass(
        "bg-gray-200",
        "border",
        "border-transparent",
        "text-gray-800",
        "dark:bg-neutral-700",
        "dark:text-neutral-200",
      );
      expect(kbd).toHaveClass("inline-flex"); // boxed
    });

    it("renders outline variant correctly", () => {
      render(<KBD variant="outline">Space</KBD>);
      const kbd = screen.getByText("Space");
      expect(kbd).toHaveClass(
        "bg-white",
        "border",
        "border-gray-200",
        "text-gray-800",
        "dark:bg-neutral-900",
        "dark:border-neutral-700",
      );
      expect(kbd).toHaveClass("inline-flex"); // boxed
    });

    it("renders shadow variant correctly", () => {
      render(<KBD variant="shadow">Shift</KBD>);
      const kbd = screen.getByText("Shift");
      expect(kbd).toHaveClass(
        "bg-white",
        "border",
        "border-gray-200",
        "shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)]",
        "dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]",
      );
      expect(kbd).toHaveClass("inline-flex"); // boxed
    });
  });

  describe("Sizes", () => {
    it.each([
      ["xs", "min-h-4.5", "px-1", "text-xs"],
      ["sm", "min-h-7.5", "py-1", "px-1.5", "text-sm"],
      ["lg", "min-h-10.5", "py-1.5", "px-2", "text-lg"],
    ])(
      "renders %s size correctly for boxed variants",
      (size, ...expectedClasses) => {
        render(
          <KBD variant="light" size={size as "xs" | "sm" | "lg"}>
            Key
          </KBD>,
        );
        const kbd = screen.getByText("Key");
        expectedClasses.forEach((className) => {
          expect(kbd).toHaveClass(className);
        });
      },
    );

    it.each([
      ["xs", "text-xs"],
      ["sm", "text-sm"],
      ["lg", "text-lg"],
    ])(
      "renders %s size correctly for non-boxed variants",
      (size, expectedClass) => {
        render(
          <KBD variant="ghost" size={size as "xs" | "sm" | "lg"}>
            Key
          </KBD>,
        );
        const kbd = screen.getByText("Key");
        expect(kbd).toHaveClass(expectedClass);
        expect(kbd).not.toHaveClass("min-h-4.5", "min-h-7.5", "min-h-10.5"); // no box sizing
      },
    );
  });

  describe("Icon Only", () => {
    it("renders icon only with correct sizing", () => {
      render(
        <KBD iconOnly size="sm">
          ⌘
        </KBD>,
      );
      const kbd = screen.getByText("⌘");
      expect(kbd).toHaveClass("min-w-7.5"); // icon only width for sm
      expect(kbd).toHaveClass("min-h-7.5"); // regular height
    });

    it.each([
      ["xs", "min-w-4.5"],
      ["sm", "min-w-7.5"],
      ["lg", "min-w-10.5"],
    ])("applies correct icon only width for %s size", (size, expectedClass) => {
      render(
        <KBD iconOnly size={size as "xs" | "sm" | "lg"}>
          ⌘
        </KBD>,
      );
      const kbd = screen.getByText("⌘");
      expect(kbd).toHaveClass(expectedClass);
    });

    it("does not apply icon only sizing for non-boxed variants", () => {
      render(
        <KBD variant="ghost" iconOnly>
          ⌘
        </KBD>,
      );
      const kbd = screen.getByText("⌘");
      expect(kbd).not.toHaveClass("min-w-4.5", "min-w-7.5", "min-w-10.5");
    });
  });

  it("applies custom className", () => {
    render(<KBD className="custom-class">Custom Key</KBD>);
    const kbd = screen.getByText("Custom Key");
    expect(kbd).toHaveClass("custom-class");
    expect(kbd).toHaveClass("font-mono"); // default classes should still be applied
  });

  it("passes through additional props", () => {
    render(
      <KBD data-testid="kbd-test" id="custom-id">
        Test Key
      </KBD>,
    );
    const kbd = screen.getByTestId("kbd-test");
    expect(kbd).toHaveAttribute("id", "custom-id");
  });

  it("renders complex content correctly", () => {
    render(
      <KBD>
        <span>Ctrl</span> + <span>C</span>
      </KBD>,
    );
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("maintains semantic meaning with kbd element", () => {
      render(<KBD>F1</KBD>);
      const kbd = screen.getByText("F1");
      expect(kbd.tagName).toBe("KBD");
    });

    it("supports aria attributes", () => {
      render(<KBD aria-label="Control key">Ctrl</KBD>);
      const kbd = screen.getByText("Ctrl");
      expect(kbd).toHaveAttribute("aria-label", "Control key");
    });
  });

  describe("Visual combinations", () => {
    it("combines all props correctly", () => {
      render(
        <KBD variant="shadow" size="lg" iconOnly className="custom-modifier">
          ⌘
        </KBD>,
      );
      const kbd = screen.getByText("⌘");

      // Variant styles
      expect(kbd).toHaveClass(
        "bg-white",
        "border",
        "shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)]",
      );

      // Size styles
      expect(kbd).toHaveClass("min-h-10.5", "py-1.5", "px-2", "text-lg");

      // Icon only styles
      expect(kbd).toHaveClass("min-w-10.5");

      // Boxed styles
      expect(kbd).toHaveClass(
        "inline-flex",
        "justify-center",
        "items-center",
        "rounded-md",
      );

      // Base styles
      expect(kbd).toHaveClass("font-mono");

      // Custom styles
      expect(kbd).toHaveClass("custom-modifier");
    });

    it("properly handles dark mode classes", () => {
      render(<KBD variant="light">Dark Key</KBD>);
      const kbd = screen.getByText("Dark Key");
      expect(kbd).toHaveClass("dark:bg-neutral-700", "dark:text-neutral-200");
    });
  });

  describe("Content rendering", () => {
    it("renders keyboard symbols correctly", () => {
      const symbols = ["⌘", "⌥", "⌃", "⇧", "←", "→", "↑", "↓"];

      symbols.forEach((symbol) => {
        const { unmount } = render(<KBD>{symbol}</KBD>);
        expect(screen.getByText(symbol)).toBeInTheDocument();
        unmount();
      });
    });

    it("renders text content correctly", () => {
      const keys = ["Ctrl", "Alt", "Shift", "Enter", "Escape", "Space"];

      keys.forEach((key) => {
        const { unmount } = render(<KBD>{key}</KBD>);
        expect(screen.getByText(key)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
