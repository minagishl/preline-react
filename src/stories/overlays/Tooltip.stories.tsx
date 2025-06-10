import React from "react";
import type { Meta, StoryObj, StoryFn } from "@storybook/react-vite";
import Tooltip from "../../components/overlays/Tooltip";

const ChevronUp = () => (
  <svg
    className="shrink-0 size-4"
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
    className="shrink-0 size-4"
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
    className="shrink-0 size-4"
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
    className="shrink-0 size-4"
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
    className="size-10 inline-flex justify-center items-center gap-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 focus:outline-hidden focus:bg-blue-50 focus:border-blue-200 focus:text-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:border-white/10 dark:hover:text-white dark:focus:bg-white/10 dark:focus:border-white/10 dark:focus:text-white"
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
    <div className="flex justify-center items-center h-48">
      <Tooltip {...args} />
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex justify-center items-center h-48">
      <div className="grid grid-cols-3 gap-y-4 gap-x-2 max-w-60 mx-auto">
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
