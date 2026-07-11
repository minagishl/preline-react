import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenu } from "../../components/NavigationExtended";

const meta = {
  title: "Overlays/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu
      trigger={
        <div className="border-border bg-muted text-muted-foreground w-80 rounded-xl border border-dashed p-16 text-center text-sm">
          Right-click this card
        </div>
      }
    >
      <button
        role="menuitem"
        className="hover:bg-muted block w-full rounded-md px-3 py-2 text-left text-sm"
      >
        Edit
      </button>
      <button
        role="menuitem"
        className="hover:bg-muted block w-full rounded-md px-3 py-2 text-left text-sm"
      >
        Duplicate
      </button>
      <button
        role="menuitem"
        className="text-destructive hover:bg-muted block w-full rounded-md px-3 py-2 text-left text-sm"
      >
        Delete
      </button>
    </ContextMenu>
  ),
};
