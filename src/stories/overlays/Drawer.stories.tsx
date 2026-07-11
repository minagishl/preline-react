import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Drawer } from "../../components/overlays/Dropdown";

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          type="button"
          className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-medium"
          onClick={() => setOpen(true)}
        >
          Open drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-foreground text-lg font-semibold">
                Invite teammates
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Share access with your team.
              </p>
            </div>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground text-sm"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <input
            className="border-border bg-layer mt-6 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="name@example.com"
          />
          <button
            type="button"
            className="bg-primary text-primary-foreground mt-3 w-full rounded-lg px-4 py-3 text-sm font-medium"
          >
            Send invitation
          </button>
        </Drawer>
      </>
    );
  },
};
