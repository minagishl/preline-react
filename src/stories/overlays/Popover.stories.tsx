import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Popover from "../../components/forms/Popover";

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
      <Popover {...args}>{renderButton(<ChevronUp />)}</Popover>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex h-20 justify-center gap-4">
      <Popover content="Left popover" placement="left">
        {renderButton(<ChevronLeft />)}
      </Popover>
      <Popover content="Top popover" placement="top">
        {renderButton(<ChevronUp />)}
      </Popover>
      <Popover content="Bottom popover" placement="bottom">
        {renderButton(<ChevronDown />)}
      </Popover>
      <Popover content="Right popover" placement="right">
        {renderButton(<ChevronRight />)}
      </Popover>
    </div>
  ),
};
