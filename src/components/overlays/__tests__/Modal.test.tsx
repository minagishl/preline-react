import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "../Modal";

const Example = ({ staticBackdrop = false }: { staticBackdrop?: boolean }) => (
  <Modal>
    <Modal.Trigger>
      <button type="button">Open</button>
    </Modal.Trigger>
    <Modal.Content staticBackdrop={staticBackdrop}>
      <Modal.Header>
        <Modal.Title>Dialog title</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>Dialog body</Modal.Body>
    </Modal.Content>
  </Modal>
);

describe("Modal", () => {
  it("opens, traps the dialog semantics, and closes with Escape", () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("respects a static backdrop", () => {
    render(<Example staticBackdrop />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
