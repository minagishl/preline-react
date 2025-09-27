import type { Meta, StoryObj } from "@storybook/react-vite";
import { Command } from "lucide-react";
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
    color: {
      control: { type: "select" },
      options: [
        "gray",
        "dark",
        "secondary",
        "info",
        "success",
        "danger",
        "warning",
        "light",
      ],
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
  <Command className="size-3 shrink-0" strokeWidth={2} />
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

export const Colors: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 dark:text-neutral-400">
        Color variants are experimental and not part of the official Preline
        design spec.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <KBD color="gray">Gray</KBD>
        <KBD color="dark">Dark</KBD>
        <KBD color="secondary">Secondary</KBD>
        <KBD color="info">Info</KBD>
        <KBD color="success">Success</KBD>
        <KBD color="danger">Danger</KBD>
        <KBD color="warning">Warning</KBD>
        <KBD color="light">Light</KBD>
      </div>
    </div>
  ),
};
