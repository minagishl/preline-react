import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  ChevronDown,
  CircleUserRound,
  CreditCard,
  Download,
  EllipsisVertical,
  Mail,
  UserRound,
} from "lucide-react";
import { Dropdown } from "../../components/overlays/Dropdown";

const meta = {
  title: "Overlays/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-[640px] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const trigger = (
  <span className="border-layer-line bg-layer text-layer-foreground hover:bg-layer-hover focus:bg-layer-focus inline-flex items-center gap-x-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-2xs">
    Actions
    <ChevronDown
      className="hs-dropdown-open:rotate-180 size-4 transition-transform"
      aria-hidden="true"
    />
  </span>
);

const menuItemClass =
  "flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:bg-dropdown-item-focus focus:outline-hidden";

export const Default: Story = {
  render: () => (
    <Dropdown trigger={trigger}>
      <div className="space-y-0.5 p-1">
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
      <div className="divide-dropdown-divider divide-y">
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

export const HoverTrigger: Story = {
  render: () => (
    <Dropdown trigger={trigger} triggerMode="hover">
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#newsletter">
          Newsletter
        </a>
        <a className={menuItemClass} href="#purchases">
          Purchases
        </a>
        <a className={menuItemClass} href="#downloads">
          Downloads
        </a>
      </div>
    </Dropdown>
  ),
};

export const ItemsWithIcons: Story = {
  render: () => (
    <Dropdown trigger={trigger}>
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#newsletter">
          <Mail className="size-4" />
          Newsletter
        </a>
        <a className={menuItemClass} href="#purchases">
          <CreditCard className="size-4" />
          Purchases
        </a>
        <a className={menuItemClass} href="#downloads">
          <Download className="size-4" />
          Downloads
        </a>
        <a className={menuItemClass} href="#account">
          <CircleUserRound className="size-4" />
          Team Account
        </a>
      </div>
    </Dropdown>
  ),
};

export const SectionTitle: Story = {
  render: () => (
    <Dropdown trigger={trigger}>
      <div className="divide-dropdown-divider divide-y">
        <div className="space-y-0.5 p-1">
          <span className="text-muted-foreground block px-3 pt-2 pb-1 text-xs font-medium uppercase">
            Settings
          </span>
          <a className={menuItemClass} href="#newsletter">
            <Bell className="size-4 shrink-0" />
            Newsletter
          </a>
          <a className={menuItemClass} href="#purchases">
            <CreditCard className="size-4 shrink-0" />
            Purchases
          </a>
          <a className={menuItemClass} href="#downloads">
            <Download className="size-4 shrink-0" />
            Downloads
          </a>
          <a className={menuItemClass} href="#team">
            <CircleUserRound className="size-4 shrink-0" />
            Team Account
          </a>
        </div>
        <div className="space-y-0.5 p-1">
          <span className="text-muted-foreground block px-3 pt-2 pb-1 text-xs font-medium uppercase">
            Contacts
          </span>
          <a className={menuItemClass} href="#support">
            <Mail className="size-4 shrink-0" />
            Contact support
          </a>
        </div>
      </div>
    </Dropdown>
  ),
};

export const MenuHeader: Story = {
  render: () => (
    <Dropdown trigger={trigger}>
      <div className="border-dropdown-header border-b px-4 py-3">
        <p className="text-muted-foreground-1 text-sm">Signed in as</p>
        <p className="text-foreground text-sm font-medium">james@site.com</p>
      </div>
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#profile">
          Profile
        </a>
        <a className={menuItemClass} href="#settings">
          Account settings
        </a>
      </div>
    </Dropdown>
  ),
};

export const CustomTriggerButton: Story = {
  render: () => (
    <Dropdown
      trigger={
        <span className="border-layer-line bg-layer text-layer-foreground hover:bg-layer-hover inline-flex items-center gap-x-2 rounded-full border py-1 ps-1 pe-3 text-sm font-medium shadow-2xs">
          <span className="bg-primary text-primary-foreground inline-flex size-8 items-center justify-center rounded-full">
            <UserRound className="size-4" />
          </span>
          Tom Cook
          <ChevronDown className="hs-dropdown-open:rotate-180 size-4" />
        </span>
      }
    >
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#profile">
          Profile
        </a>
        <a className={menuItemClass} href="#settings">
          Settings
        </a>
      </div>
    </Dropdown>
  ),
};

export const IconOnlyTrigger: Story = {
  render: () => (
    <Dropdown
      trigger={
        <span className="border-layer-line bg-layer text-layer-foreground hover:bg-layer-hover focus:bg-layer-focus inline-flex size-9 items-center justify-center rounded-lg border text-sm font-semibold shadow-2xs focus:outline-hidden">
          <EllipsisVertical className="text-muted-foreground-2 size-4" />
        </span>
      }
    >
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#apps">
          Apps
        </a>
        <a className={menuItemClass} href="#settings">
          Settings
        </a>
      </div>
    </Dropdown>
  ),
};

export const ScaleTransition: Story = {
  render: () => (
    <Dropdown trigger={trigger} transition="scale">
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#one">
          Scale transition
        </a>
        <a className={menuItemClass} href="#two">
          Second action
        </a>
      </div>
    </Dropdown>
  ),
};
export const SlideUpTransition: Story = {
  render: () => (
    <Dropdown trigger={trigger} transition="slide-up">
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#one">
          Slide-up transition
        </a>
        <a className={menuItemClass} href="#two">
          Second action
        </a>
      </div>
    </Dropdown>
  ),
};
export const InnerTranslateAnimation: Story = {
  render: () => (
    <Dropdown trigger={trigger} transition="inner-translate">
      <div className="space-y-0.5 p-1">
        <a className={menuItemClass} href="#one">
          Inner translate animation
        </a>
        <a className={menuItemClass} href="#two">
          Second action
        </a>
      </div>
    </Dropdown>
  ),
};

export const AutoCloseBehavior: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown
        trigger={
          <span className="border-layer-line bg-layer text-layer-foreground inline-flex rounded-lg border px-4 py-3 text-sm font-medium">
            Close inside
          </span>
        }
        autoClose="inside"
      >
        <div className="space-y-0.5 p-1">
          <button className={menuItemClass}>Select item</button>
        </div>
      </Dropdown>
      <Dropdown
        trigger={
          <span className="border-layer-line bg-layer text-layer-foreground inline-flex rounded-lg border px-4 py-3 text-sm font-medium">
            Keep open
          </span>
        }
        autoClose="none"
      >
        <div className="space-y-0.5 p-1">
          <button className={menuItemClass}>Select item</button>
        </div>
      </Dropdown>
    </div>
  ),
};

export const CheckboxItems: Story = {
  render: () => (
    <Dropdown trigger={trigger} autoClose="none">
      <div className="space-y-0.5 p-1">
        <label className={menuItemClass}>
          <input
            className="border-border size-4 rounded"
            type="checkbox"
            defaultChecked
          />
          Email notifications
        </label>
        <label className={menuItemClass}>
          <input className="border-border size-4 rounded" type="checkbox" />
          Product updates
        </label>
      </div>
    </Dropdown>
  ),
};
export const RadioItems: Story = {
  render: () => (
    <Dropdown trigger={trigger} autoClose="none">
      <div className="space-y-0.5 p-1">
        <label className={menuItemClass}>
          <input
            className="border-border size-4"
            type="radio"
            name="dropdown-radio"
            defaultChecked
          />
          Personal
        </label>
        <label className={menuItemClass}>
          <input
            className="border-border size-4"
            type="radio"
            name="dropdown-radio"
          />
          Business
        </label>
      </div>
    </Dropdown>
  ),
};

export const PlacementDirections: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-24 p-24">
      <Dropdown
        placement="top-start"
        trigger={
          <span className="border-layer-line bg-layer inline-flex rounded-lg border px-3 py-2 text-sm">
            Top start
          </span>
        }
      >
        <div className="p-1">
          <span className={menuItemClass}>Top start</span>
        </div>
      </Dropdown>
      <Dropdown
        placement="top-end"
        trigger={
          <span className="border-layer-line bg-layer inline-flex rounded-lg border px-3 py-2 text-sm">
            Top end
          </span>
        }
      >
        <div className="p-1">
          <span className={menuItemClass}>Top end</span>
        </div>
      </Dropdown>
      <Dropdown
        placement="right-start"
        trigger={
          <span className="border-layer-line bg-layer inline-flex rounded-lg border px-3 py-2 text-sm">
            Right start
          </span>
        }
      >
        <div className="p-1">
          <span className={menuItemClass}>Right start</span>
        </div>
      </Dropdown>
      <Dropdown
        placement="left-end"
        trigger={
          <span className="border-layer-line bg-layer inline-flex rounded-lg border px-3 py-2 text-sm">
            Left end
          </span>
        }
      >
        <div className="p-1">
          <span className={menuItemClass}>Left end</span>
        </div>
      </Dropdown>
    </div>
  ),
};
