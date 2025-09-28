import type { Meta, StoryObj } from "@storybook/react-vite";
import Divider, { DividerProps } from "../../components/content/Divider";

const meta: Meta<DividerProps> = {
  title: "Layout & Content/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "default",
        "gray-800",
        "gray-500",
        "teal-500",
        "blue-500",
        "red-500",
        "yellow-500",
        "white",
      ],
    },
    height: {
      control: { type: "radio" },
      options: ["1", "2", "4", "8"],
    },
    label: {
      control: "text",
    },
    labelPosition: {
      control: { type: "radio" },
      options: ["left", "center", "right"],
    },
    vertical: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<DividerProps>;

export const Default: Story = {
  args: {},
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Divider color="default" />
      <Divider color="gray-800" />
      <Divider color="gray-500" />
      <Divider color="teal-500" />
      <Divider color="blue-500" />
      <Divider color="red-500" />
      <Divider color="yellow-500" />
      <Divider color="white" />
    </div>
  ),
};

export const Heights: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Divider height="1" />
      <Divider height="2" />
      <Divider height="4" />
      <Divider height="8" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Divider label="Left aligned" labelPosition="left" />
      <Divider label="Center aligned" labelPosition="center" />
      <Divider label="Right aligned" labelPosition="right" />
    </div>
  ),
};

export const Vertical: Story = {
  parameters: {
    layout: "centered",
  },
  render: () => (
    <div className="mx-auto flex h-20 space-x-8">
      <p className="text-sm">Left</p>
      <Divider vertical />
      <p className="text-sm">Right</p>
    </div>
  ),
};
