import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "../Dropdown";

describe("Dropdown", () => {
  const renderDropdown = (props = {}) =>
    render(
      <Dropdown trigger="Actions" {...props}>
        <button role="menuitem">Edit</button>
      </Dropdown>,
    );

  it("opens from its trigger and closes after an inside menu action", () => {
    renderDropdown();
    const trigger = screen.getByRole("button", { name: "Actions" });
    fireEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps its menu open after an inside action when autoClose is outside", () => {
    renderDropdown({ autoClose: "outside" });
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(screen.getByRole("button", { name: "Actions" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes on Escape and restores focus to the trigger", () => {
    renderDropdown();
    const trigger = screen.getByRole("button", { name: "Actions" });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("reports state transitions in controlled mode", () => {
    const onOpenChange = jest.fn();
    renderDropdown({ open: false, onOpenChange });
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
