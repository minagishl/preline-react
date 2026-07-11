import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Tooltip from "../../components/overlays/Tooltip";
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

const meta: Meta<typeof Tooltip> = {
  title: "Overlays/Tooltip",
  component: Tooltip,
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
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const renderButton = (icon: React.ReactNode) => (
  <button
    type="button"
    className="inline-flex size-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:border-blue-200 focus:bg-blue-50 focus:text-blue-600 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-white dark:focus:border-white/10 dark:focus:bg-white/10 dark:focus:text-white"
  >
    {icon}
  </button>
);

export const Default: Story = {
  args: {
    content: "Tooltip on top",
    placement: "top",
  },
  render: (args) => (
    <div className="flex h-48 items-center justify-center">
      <Tooltip {...args}>{renderButton(<ChevronUpIcon />)}</Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex h-48 items-center justify-center">
      <div className="mx-auto grid max-w-60 grid-cols-3 gap-x-2 gap-y-4">
        <div className="col-start-2 text-center">
          <Tooltip content="Tooltip on top" placement="top">
            {renderButton(<ChevronUpIcon />)}
          </Tooltip>
        </div>
        <div className="col-start-1 text-end">
          <Tooltip content="Tooltip on left" placement="left">
            {renderButton(<ChevronLeftIcon />)}
          </Tooltip>
        </div>
        <div className="col-start-3">
          <Tooltip content="Tooltip on right" placement="right">
            {renderButton(<ChevronRightIcon />)}
          </Tooltip>
        </div>
        <div className="col-start-2 text-center">
          <Tooltip content="Tooltip on bottom" placement="bottom">
            {renderButton(<ChevronDownIcon />)}
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};
