import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Skeleton from "../Skeleton";

describe("Skeleton", () => {
  it("renders a block skeleton by default", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass(
      "bg-gray-200",
      "dark:bg-neutral-700",
      "rounded-md",
    );
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("supports circle variant", () => {
    render(<Skeleton variant="circle" data-testid="circle" />);
    const skeleton = screen.getByTestId("circle");
    expect(skeleton).toHaveClass("rounded-full");
  });

  it("renders multiple lines for text variant", () => {
    render(<Skeleton variant="text" lines={4} data-testid="text-skeleton" />);
    const container = screen.getByTestId("text-skeleton");
    expect(container).toHaveClass("space-y-2");
    const lines = container.querySelectorAll("div");
    expect(lines).toHaveLength(4);
    expect(lines[lines.length - 1]).toHaveClass("w-5/6");
  });

  it("renders children when loaded", () => {
    render(
      <Skeleton isLoaded>
        <span data-testid="loaded">Loaded content</span>
      </Skeleton>,
    );
    expect(screen.getByTestId("loaded")).toHaveTextContent("Loaded content");
  });
});
