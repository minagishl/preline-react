import { fireEvent, render, screen } from "@testing-library/react";
import Tooltip from "../Tooltip";

describe("Tooltip", () => {
  it("shows on hover and focus and exposes the accessible description", () => {
    render(
      <Tooltip content="Helpful text">
        <button type="button">Info</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Info" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(tooltip).toHaveClass("invisible");

    fireEvent.mouseEnter(trigger);
    expect(tooltip).toHaveClass("visible");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);

    fireEvent.mouseLeave(trigger);
    fireEvent.focus(trigger);
    expect(tooltip).toHaveClass("visible");
  });
});
