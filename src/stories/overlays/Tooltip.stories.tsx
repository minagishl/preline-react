import React from "react";
import type { Meta, StoryObj, StoryFn } from "@storybook/react-vite";
import Tooltip from "../../components/overlays/Tooltip";

const ChevronUp = () => (
  <svg
    className="size-4 shrink-0"
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
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const ChevronLeft = () => (
  <svg
    className="size-4 shrink-0"
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
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    className="size-4 shrink-0"
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
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronDown = () => (
  <svg
    className="size-4 shrink-0"
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const meta: Meta<typeof Tooltip> = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  decorators: [
    (Story: StoryFn) => (
      <div className="p-8">
        <Story />
      </div>
    ),
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
    children: renderButton(<ChevronUp />),
  },
  render: (args) => (
    <div className="flex h-48 items-center justify-center">
      <Tooltip {...args} />
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex h-48 items-center justify-center">
      <div className="mx-auto grid max-w-60 grid-cols-3 gap-x-2 gap-y-4">
        <div className="col-start-2 text-center">
          <Tooltip content="Tooltip on top" placement="top">
            {renderButton(<ChevronUp />)}
          </Tooltip>
        </div>
        <div className="col-start-1 text-end">
          <Tooltip content="Tooltip on left" placement="left">
            {renderButton(<ChevronLeft />)}
          </Tooltip>
        </div>
        <div className="col-start-3">
          <Tooltip content="Tooltip on right" placement="right">
            {renderButton(<ChevronRight />)}
          </Tooltip>
        </div>
        <div className="col-start-2 text-center">
          <Tooltip content="Tooltip on bottom" placement="bottom">
            {renderButton(<ChevronDown />)}
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};
