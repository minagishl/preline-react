import type { Meta, StoryObj } from "@storybook/react-vite";
import KBD, { KBDProps } from "../../components/content/KBD";

const meta: Meta<KBDProps> = {
  title: "Content/KBD",
  component: KBD,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: { type: "select" },
      options: ["ghost", "subtle", "light", "outline", "shadow"],
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "lg"],
    },
    iconOnly: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<KBDProps>;

export const Types: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <KBD variant="ghost">ctrl</KBD>
      <KBD variant="subtle">ctrl</KBD>
      <KBD variant="light">ctrl</KBD>
      <KBD variant="outline">ctrl</KBD>
      <KBD variant="shadow">ctrl</KBD>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <KBD size="xs">ctrl</KBD>
      <KBD size="sm">ctrl</KBD>
      <KBD size="lg">ctrl</KBD>
    </div>
  ),
};

const CommandIcon = () => (
  <svg
    className="size-3 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
  </svg>
);

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <KBD variant="outline" iconOnly>
        <CommandIcon />
      </KBD>
    </div>
  ),
};

export const Combination: Story = {
  render: () => (
    <span className="flex flex-wrap items-center gap-x-1 text-sm text-gray-600 dark:text-neutral-400">
      <KBD>shift</KBD>
      and
      <KBD>b</KBD>
    </span>
  ),
};
