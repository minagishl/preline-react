import { fireEvent, render, screen } from "@testing-library/react";
import Popover from "../Popover";

describe("Popover", () => {
  it("opens on click and closes on outside click and Escape", () => {
    render(
      <>
        <Popover content="Popover text">
          <button type="button">Details</button>
        </Popover>
        <button type="button">Outside</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    fireEvent.mouseDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
