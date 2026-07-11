import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import { Dropdown } from "../../components/overlays/Dropdown";

const meta = {
  title: "Overlays/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const trigger = (
  <span className="border-border bg-layer text-foreground hover:bg-muted inline-flex items-center gap-x-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-2xs">
    Actions
    <ChevronDown className="size-4" aria-hidden="true" />
  </span>
);

const menuItemClass =
  "block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted";

export const Default: Story = {
  render: () => (
    <Dropdown trigger={trigger}>
      <div className="min-w-60 space-y-0.5 p-1">
        <a className={menuItemClass} href="#newsletter">
          Newsletter
        </a>
        <a className={menuItemClass} href="#purchases">
          Purchases
        </a>
        <a className={menuItemClass} href="#downloads">
          Downloads
        </a>
        <a className={menuItemClass} href="#team">
          Team Account
        </a>
      </div>
    </Dropdown>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Dropdown trigger={trigger}>
      <div className="divide-border min-w-60 divide-y">
        <div className="space-y-0.5 p-1">
          <a className={menuItemClass} href="#newsletter">
            Newsletter
          </a>
          <a className={menuItemClass} href="#purchases">
            Purchases
          </a>
        </div>
        <div className="p-1">
          <a className={menuItemClass} href="#upgrade">
            Upgrade License
          </a>
        </div>
        <div className="space-y-0.5 p-1">
          <a className={menuItemClass} href="#settings">
            Account Settings
          </a>
          <a className={menuItemClass} href="#sign-out">
            Sign out
          </a>
        </div>
      </div>
    </Dropdown>
  ),
};
