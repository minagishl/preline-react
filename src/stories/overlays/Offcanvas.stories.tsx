import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Offcanvas } from "../../components/Offcanvas";

const meta = {
  title: "Overlays/Offcanvas",
  component: Offcanvas,
  tags: ["autodocs"],
} satisfies Meta<typeof Offcanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          type="button"
          className="border-border bg-layer text-foreground rounded-lg border px-4 py-3 text-sm font-medium"
          onClick={() => setOpen(true)}
        >
          Open offcanvas
        </button>
        <Offcanvas open={open} onClose={() => setOpen(false)} side="left">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <nav className="mt-6 space-y-1">
            <a
              className="bg-muted text-primary block rounded-lg px-3 py-2 text-sm"
              href="#overview"
            >
              Overview
            </a>
            <a
              className="text-muted-foreground hover:bg-muted block rounded-lg px-3 py-2 text-sm"
              href="#settings"
            >
              Settings
            </a>
          </nav>
        </Offcanvas>
      </>
    );
  },
};
