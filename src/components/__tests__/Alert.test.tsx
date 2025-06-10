import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "../Alert";

describe("Alert Component", () => {
  it("renders alert with default props", () => {
    render(<Alert>Default alert message</Alert>);
    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Default alert message");
    expect(alert).toHaveClass("bg-blue-600"); // default info variant (solid)
    expect(alert).toHaveClass("text-white");
    expect(alert).toHaveClass("rounded-lg");
    expect(alert).toHaveClass("p-4");
  });

  describe("Variants - Solid Mode", () => {
    it.each([
      ["dark", "bg-gray-800", "text-white"],
      ["secondary", "bg-gray-500", "text-white"],
      ["info", "bg-blue-600", "text-white"],
      ["success", "bg-teal-500", "text-white"],
      ["danger", "bg-red-500", "text-white"],
      ["warning", "bg-yellow-500", "text-white"],
      ["light", "bg-white", "text-gray-600"],
    ])(
      "renders %s variant correctly in solid mode",
      (variant, bgClass, textClass) => {
        render(
          <Alert
            variant={
              variant as
                | "dark"
                | "secondary"
                | "info"
                | "success"
                | "danger"
                | "warning"
                | "light"
            }
          >
            Alert message
          </Alert>
        );
        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass(bgClass);
        expect(alert).toHaveClass(textClass);
      }
    );
  });

  describe("Variants - Soft Mode", () => {
    it.each([
      ["dark", "bg-gray-100", "text-gray-800"],
      ["secondary", "bg-gray-50", "text-gray-600"],
      ["info", "bg-blue-100", "text-blue-800"],
      ["success", "bg-teal-100", "text-teal-800"],
      ["danger", "bg-red-100", "text-red-800"],
      ["warning", "bg-yellow-100", "text-yellow-800"],
      ["light", "bg-white/10", "text-white"],
    ])(
      "renders %s variant correctly in soft mode",
      (variant, bgClass, textClass) => {
        render(
          <Alert
            variant={
              variant as
                | "dark"
                | "secondary"
                | "info"
                | "success"
                | "danger"
                | "warning"
                | "light"
            }
            soft
          >
            Alert message
          </Alert>
        );
        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass(bgClass);
        expect(alert).toHaveClass(textClass);
        expect(alert).toHaveClass("border"); // soft mode adds border
      }
    );
  });

  describe("Borders", () => {
    it("renders without border by default", () => {
      render(<Alert>No border alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).not.toHaveClass("border-t-2");
      expect(alert).not.toHaveClass("border-l-4");
    });

    it("renders with top border", () => {
      render(<Alert border="top">Top border alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-t-2");
      expect(alert).toHaveClass("border-blue-600"); // info variant border color
    });

    it("renders with left border", () => {
      render(<Alert border="left">Left border alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-l-4");
      expect(alert).toHaveClass("border-blue-600"); // info variant border color
    });

    it("applies correct border colors for different variants", () => {
      const { rerender } = render(
        <Alert variant="success" border="top">
          Success
        </Alert>
      );
      expect(screen.getByRole("alert")).toHaveClass("border-teal-500");

      rerender(
        <Alert variant="danger" border="left">
          Danger
        </Alert>
      );
      expect(screen.getByRole("alert")).toHaveClass("border-red-500");

      rerender(
        <Alert variant="warning" border="top">
          Warning
        </Alert>
      );
      expect(screen.getByRole("alert")).toHaveClass("border-yellow-500");
    });
  });

  describe("Soft Mode with Borders", () => {
    it("does not apply border color classes in soft mode", () => {
      render(
        <Alert variant="success" soft border="top">
          Soft with border
        </Alert>
      );
      const alert = screen.getByRole("alert");

      expect(alert).toHaveClass("border-t-2");
      expect(alert).toHaveClass("border"); // soft mode border
      expect(alert).toHaveClass("bg-teal-100"); // soft background
      expect(alert).not.toHaveClass("border-teal-500"); // no explicit border color in soft mode
    });
  });

  describe("Children Content", () => {
    it("renders simple text content", () => {
      render(<Alert>Simple text message</Alert>);
      expect(screen.getByText("Simple text message")).toBeInTheDocument();
    });

    it("renders complex JSX content", () => {
      render(
        <Alert>
          <strong>Important:</strong> This is a complex message with{" "}
          <em>formatting</em> and <a href="#test">links</a>.
        </Alert>
      );

      expect(screen.getByText("Important:")).toBeInTheDocument();
      expect(screen.getByText("formatting")).toBeInTheDocument();
      expect(screen.getByRole("link")).toBeInTheDocument();
    });
  });

  describe("HTML Attributes", () => {
    it("applies custom className", () => {
      render(<Alert className="custom-alert">Custom class</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("custom-alert");
      expect(alert).toHaveClass("rounded-lg"); // should still have base classes
    });

    it("can be identified with test id", () => {
      render(<Alert className="test-alert">Test</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("test-alert");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Alert>Accessible alert</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("has correct tabIndex", () => {
      render(<Alert>Focusable alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("tabIndex", "-1");
    });

    it("has correct aria-labelledby for solid mode", () => {
      render(<Alert variant="danger">Danger alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute(
        "aria-labelledby",
        "hs-solid-color-danger-label"
      );
    });

    it("has correct aria-labelledby for soft mode", () => {
      render(
        <Alert variant="success" soft>
          Success alert
        </Alert>
      );
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute(
        "aria-labelledby",
        "hs-soft-color-success-label"
      );
    });
  });

  describe("Base Classes", () => {
    it("always applies base classes", () => {
      render(<Alert>Base classes test</Alert>);
      const alert = screen.getByRole("alert");

      expect(alert).toHaveClass("mt-2");
      expect(alert).toHaveClass("text-sm");
      expect(alert).toHaveClass("rounded-lg");
      expect(alert).toHaveClass("p-4");
    });
  });
});
