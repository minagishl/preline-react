import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import all content components
import Typography from "../../content/Typography";
import Link from "../../content/Link";
import KBD from "../../content/KBD";
import Divider from "../../content/Divider";

describe("Content Components Integration", () => {
  describe("Component Exports", () => {
    it("exports Typography component", () => {
      expect(Typography).toBeDefined();
      expect(typeof Typography).toBe("function");
    });

    it("exports Link component", () => {
      expect(Link).toBeDefined();
      expect(typeof Link).toBe("function");
    });

    it("exports KBD component", () => {
      expect(KBD).toBeDefined();
      expect(typeof KBD).toBe("function");
    });

    it("exports Divider component", () => {
      expect(Divider).toBeDefined();
      expect(typeof Divider).toBe("function");
    });
  });

  describe("Component Rendering", () => {
    it("renders all content components without errors", () => {
      expect(() => {
        render(
          <div>
            <Typography>Test Typography</Typography>
            <Link href="/test">Test Link</Link>
            <KBD>Ctrl</KBD>
            <Divider />
          </div>,
        );
      }).not.toThrow();
    });

    it("renders components with proper content", () => {
      render(
        <div>
          <Typography data-testid="typography">Typography Content</Typography>
          <Link href="/test" data-testid="link">
            Link Content
          </Link>
          <KBD data-testid="kbd">Ctrl</KBD>
          <Divider data-testid="divider" />
        </div>,
      );

      expect(screen.getByTestId("typography")).toHaveTextContent(
        "Typography Content",
      );
      expect(screen.getByTestId("link")).toHaveTextContent("Link Content");
      expect(screen.getByTestId("kbd")).toHaveTextContent("Ctrl");
      expect(screen.getByTestId("divider")).toBeInTheDocument();
    });
  });

  describe("Cross-Component Compatibility", () => {
    it("can compose Typography with nested content components", () => {
      render(
        <Typography>
          Press <KBD>Ctrl</KBD> + <KBD>C</KBD> to copy or{" "}
          <Link href="/help">see help</Link>
        </Typography>,
      );

      expect(screen.getByText(/Press/)).toBeInTheDocument();
      expect(screen.getByText("Ctrl")).toBeInTheDocument();
      expect(screen.getByText("C")).toBeInTheDocument();
      expect(screen.getByText(/to copy or/)).toBeInTheDocument();
      expect(screen.getByText("see help")).toBeInTheDocument();
    });

    it("can use Divider with Typography labels", () => {
      render(
        <Divider
          label={
            <Typography variant="small" className="text-gray-500">
              Section Divider
            </Typography>
          }
        />,
      );

      expect(screen.getByText("Section Divider")).toBeInTheDocument();
    });

    it("can nest KBD inside Link components", () => {
      render(
        <Link href="/shortcuts">
          Keyboard shortcuts: <KBD>Ctrl</KBD> + <KBD>K</KBD>
        </Link>,
      );

      const link = screen.getByRole("link");
      expect(link).toHaveTextContent("Keyboard shortcuts:");
      expect(screen.getByText("Ctrl")).toBeInTheDocument();
      expect(screen.getByText("K")).toBeInTheDocument();
    });
  });

  describe("Accessibility Integration", () => {
    it("maintains proper semantic structure", () => {
      render(
        <article>
          <Typography as="h1" variant="h1">
            Main Heading
          </Typography>
          <Divider />
          <Typography as="p">
            This is a paragraph with a <Link href="/test">link</Link> and
            keyboard shortcut <KBD>Esc</KBD>.
          </Typography>
        </article>,
      );

      // Check semantic structure
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole("separator")).toBeInTheDocument();
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("supports combined aria attributes", () => {
      render(
        <div>
          <Typography aria-describedby="help-text">Instructions</Typography>
          <KBD aria-label="Escape key">Esc</KBD>
          <Link aria-describedby="external-link">External</Link>
          <Divider aria-label="Content separator" />
        </div>,
      );

      expect(screen.getByText("Instructions")).toHaveAttribute(
        "aria-describedby",
        "help-text",
      );
      expect(screen.getByText("Esc")).toHaveAttribute(
        "aria-label",
        "Escape key",
      );
      expect(screen.getByText("External")).toHaveAttribute(
        "aria-describedby",
        "external-link",
      );
      expect(screen.getByRole("separator")).toHaveAttribute(
        "aria-label",
        "Content separator",
      );
    });
  });

  describe("Styling Consistency", () => {
    it("maintains consistent dark mode support", () => {
      render(
        <div>
          <Typography data-testid="typography">Dark Text</Typography>
          <KBD data-testid="kbd">Key</KBD>
          <Divider data-testid="divider" />
        </div>,
      );

      // Check dark mode classes are present
      expect(screen.getByTestId("typography")).toHaveClass("dark:text-white");
      expect(screen.getByTestId("kbd")).toHaveClass("dark:text-neutral-200");
      expect(screen.getByTestId("divider")).toHaveClass(
        "dark:border-neutral-700",
      );
    });

    it("applies consistent text sizing", () => {
      render(
        <div>
          <Typography variant="small" data-testid="typography">
            Small text
          </Typography>
          <KBD size="xs" data-testid="kbd">
            Key
          </KBD>
        </div>,
      );

      // Both should have text-xs for small sizes
      expect(screen.getByTestId("typography")).toHaveClass("text-sm");
      expect(screen.getByTestId("kbd")).toHaveClass("text-xs");
    });
  });

  describe("Error Boundaries", () => {
    it("handles missing required props gracefully", () => {
      // These should render without throwing errors
      expect(() => {
        render(
          <div>
            <Typography>Content</Typography>
            <Link>Link without href</Link>
            <KBD>Key</KBD>
            <Divider />
          </div>,
        );
      }).not.toThrow();
    });

    it("handles invalid prop values gracefully", () => {
      expect(() => {
        render(
          <div>
            <Typography
              variant={
                undefined as
                  | "h1"
                  | "h2"
                  | "h3"
                  | "h4"
                  | "h5"
                  | "h6"
                  | "p"
                  | "small"
                  | undefined
              }
            >
              Content
            </Typography>
            <KBD variant={undefined as "subtle" | "ghost" | undefined}>Key</KBD>
            <Divider
              color={
                undefined as
                  | "default"
                  | "gray-800"
                  | "gray-500"
                  | "teal-500"
                  | "blue-500"
                  | "red-500"
                  | "yellow-500"
                  | "white"
                  | undefined
              }
            />
          </div>,
        );
      }).not.toThrow();
    });
  });

  describe("Performance Considerations", () => {
    it("renders multiple instances efficiently", () => {
      const start = performance.now();

      render(
        <div>
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>
              <Typography>Item {i}</Typography>
              <KBD>{i % 10}</KBD>
              {i % 10 === 0 && <Divider />}
              <Link href={`/item/${i}`}>Link {i}</Link>
            </div>
          ))}
        </div>,
      );

      const end = performance.now();

      // Should render 100 instances relatively quickly (less than 500ms)
      expect(end - start).toBeLessThan(500);

      // Verify some content rendered
      expect(screen.getByText("Item 0")).toBeInTheDocument();
      expect(screen.getByText("Item 99")).toBeInTheDocument();
    });
  });
});
