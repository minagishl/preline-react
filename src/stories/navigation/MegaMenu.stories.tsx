import type { Meta, StoryObj } from "@storybook/react-vite";
import MegaMenu from "../../components/MegaMenu";

const meta = {
  title: "Navigation/Mega Menu",
  component: MegaMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof MegaMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <MegaMenu
      trigger={
        <span className="bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-medium">
          Products
        </span>
      }
    >
      <a className="hover:bg-muted rounded-md p-2 text-sm" href="#analytics">
        Analytics
      </a>
      <a className="hover:bg-muted rounded-md p-2 text-sm" href="#automation">
        Automation
      </a>
    </MegaMenu>
  ),
};
