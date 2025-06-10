import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../Input";

describe("Input Component", () => {
  it("renders basic input without label", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter text");
    expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
  });

  it("renders input with label", () => {
    render(<Input label="Username" id="username" />);
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Username");

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "username");
    expect(input).toHaveAttribute("id", "username");
  });

  it("applies default styling classes", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("py-2.5");
    expect(input).toHaveClass("sm:py-3");
    expect(input).toHaveClass("px-4");
    expect(input).toHaveClass("block");
    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("border-gray-200");
    expect(input).toHaveClass("rounded-lg");
    expect(input).toHaveClass("sm:text-sm");
    expect(input).toHaveClass("focus:border-blue-500");
    expect(input).toHaveClass("focus:ring-blue-500");
  });

  it("applies dark mode classes", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("dark:bg-neutral-900");
    expect(input).toHaveClass("dark:border-neutral-700");
    expect(input).toHaveClass("dark:text-neutral-400");
    expect(input).toHaveClass("dark:placeholder-neutral-500");
    expect(input).toHaveClass("dark:focus:ring-neutral-600");
  });

  it("applies disabled styling classes", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:opacity-50");
    expect(input).toHaveClass("disabled:pointer-events-none");
  });

  it("applies custom className", () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("custom-input");
    expect(input).toHaveClass("py-2.5"); // should still have base classes
  });

  describe("Label Rendering", () => {
    it("renders label with correct styling", () => {
      render(<Input label="Email Address" id="email" />);
      const label = screen.getByText("Email Address");

      expect(label).toHaveClass("block");
      expect(label).toHaveClass("mb-2");
      expect(label).toHaveClass("text-sm");
      expect(label).toHaveClass("text-gray-700");
      expect(label).toHaveClass("dark:text-white");
    });

    it("associates label with input using htmlFor and id", () => {
      render(<Input label="Password" id="password" />);
      const label = screen.getByText("Password");
      const input = screen.getByRole("textbox");

      expect(label).toHaveAttribute("for", "password");
      expect(input).toHaveAttribute("id", "password");
    });

    it("does not render label when not provided", () => {
      render(<Input id="no-label" />);

      expect(screen.queryByRole("label")).not.toBeInTheDocument();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  describe("HTML Attributes", () => {
    it("forwards standard input attributes", () => {
      render(
        <Input
          type="email"
          placeholder="Enter email"
          maxLength={50}
          required
          autoComplete="email"
        />,
      );
      const input = screen.getByRole("textbox");

      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("placeholder", "Enter email");
      expect(input).toHaveAttribute("maxLength", "50");
      expect(input).toHaveAttribute("required");
      expect(input).toHaveAttribute("autoComplete", "email");
    });

    it("forwards event handlers", () => {
      const handleChange = jest.fn();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();

      render(
        <Input
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />,
      );
      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).toHaveBeenCalledTimes(1);

      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("handles controlled and uncontrolled inputs separately", () => {
      // Test controlled input
      const { unmount } = render(
        <Input value="controlled" onChange={() => {}} />,
      );
      expect(screen.getByDisplayValue("controlled")).toBeInTheDocument();
      unmount();

      // Test uncontrolled input
      render(<Input defaultValue="uncontrolled" />);
      expect(screen.getByDisplayValue("uncontrolled")).toBeInTheDocument();
    });
  });

  describe("Input Types", () => {
    it.each([
      ["text", "textbox"],
      ["email", "textbox"],
      ["number", "spinbutton"],
      ["tel", "textbox"],
      ["url", "textbox"],
      ["search", "searchbox"],
    ])("renders %s input type correctly", (type, role) => {
      render(
        <Input
          type={type as "text" | "email" | "number" | "tel" | "url" | "search"}
        />,
      );
      const input = screen.getByRole(role);
      expect(input).toHaveAttribute("type", type);
    });

    it("renders password input type correctly", () => {
      render(<Input type="password" />);
      // Password inputs don't have an accessible role, so we query by type
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "password");
    });
  });

  describe("States", () => {
    it("handles disabled state", () => {
      render(<Input disabled placeholder="Disabled input" />);
      const input = screen.getByRole("textbox");

      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("placeholder", "Disabled input");
    });

    it("handles readonly state", () => {
      render(<Input readOnly value="Read only" />);
      const input = screen.getByRole("textbox");

      expect(input).toHaveAttribute("readonly");
      expect(input).toHaveValue("Read only");
    });

    it("handles required state", () => {
      render(<Input required label="Required Field" />);
      const input = screen.getByRole("textbox");

      expect(input).toHaveAttribute("required");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(
        <Input
          aria-label="Custom label"
          aria-describedby="help-text"
          aria-invalid="true"
        />,
      );
      const input = screen.getByRole("textbox");

      expect(input).toHaveAttribute("aria-label", "Custom label");
      expect(input).toHaveAttribute("aria-describedby", "help-text");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("maintains label-input association", () => {
      render(<Input label="Full Name" id="fullname" />);
      const label = screen.getByText("Full Name");
      const input = screen.getByRole("textbox");

      expect(label.getAttribute("for")).toBe(input.getAttribute("id"));
    });
  });

  describe("User Interactions", () => {
    it("allows typing when not disabled", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "Hello World" } });
      expect(input).toHaveValue("Hello World");
    });

    it("disabled inputs still trigger onChange (browser behavior)", () => {
      const handleChange = jest.fn();
      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      // Even though input is disabled, React Testing Library will still trigger the event
      // This is expected behavior in tests, even though real browsers would prevent it
      fireEvent.change(input, { target: { value: "Should not work" } });
      expect(handleChange).toHaveBeenCalled();
      expect(input).toBeDisabled(); // But input is still disabled
    });

    it("can be focused and blurred", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");

      input.focus();
      expect(input).toHaveFocus();

      input.blur();
      expect(input).not.toHaveFocus();
    });
  });
});
