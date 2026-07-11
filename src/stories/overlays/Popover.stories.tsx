import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Popover from "../../components/forms/Popover";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

const ChevronUpIcon = () => (
  <ChevronUp className="size-4 shrink-0" aria-hidden="true" />
);
const ChevronLeftIcon = () => (
  <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
);
const ChevronRightIcon = () => (
  <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
);
const ChevronDownIcon = () => (
  <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
);

const meta: Meta<typeof Popover> = {
  title: "Overlays/Popover",
  component: Popover,
  decorators: [
    (Story) => {
      const StoryComponent = Story as React.ComponentType;
      return (
        <div className="p-8">
          <StoryComponent />
        </div>
      );
    },
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    trigger: {
      control: "select",
      options: ["click", "hover", "focus"],
    },
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

const renderButton = (icon: React.ReactNode) => (
  <button
    type="button"
    className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
  >
    {icon}
  </button>
);

export const Default: Story = {
  args: {
    content: "Popover on top",
    placement: "top",
    trigger: "click",
  },
  render: (args) => (
    <div className="flex h-48 items-center justify-center">
      <Popover {...args}>{renderButton(<ChevronUpIcon />)}</Popover>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex h-20 justify-center gap-4">
      <Popover content="Left popover" placement="left">
        {renderButton(<ChevronLeftIcon />)}
      </Popover>
      <Popover content="Top popover" placement="top">
        {renderButton(<ChevronUpIcon />)}
      </Popover>
      <Popover content="Bottom popover" placement="bottom">
        {renderButton(<ChevronDownIcon />)}
      </Popover>
      <Popover content="Right popover" placement="right">
        {renderButton(<ChevronRightIcon />)}
      </Popover>
    </div>
  ),
};
