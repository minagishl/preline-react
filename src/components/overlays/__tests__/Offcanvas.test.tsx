import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Offcanvas } from "../Offcanvas";

const Example = ({
  closeOnBackdropClick = true,
}: {
  closeOnBackdropClick?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open panel
      </button>
      <Offcanvas
        open={open}
        onClose={() => setOpen(false)}
        closeOnBackdropClick={closeOnBackdropClick}
      >
        <button type="button" onClick={() => setOpen(false)}>
          Close panel
        </button>
      </Offcanvas>
    </>
  );
};

describe("Offcanvas", () => {
  it("locks the page and closes on Escape", () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open panel" }));
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).toBe("");
  });

  it("can disable backdrop closing", () => {
    render(<Example closeOnBackdropClick={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Open panel" }));
    fireEvent.click(screen.getByRole("button", { name: "Close offcanvas" }));
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  });
});
