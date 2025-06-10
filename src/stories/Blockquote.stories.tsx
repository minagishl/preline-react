import type { Meta, StoryObj } from "@storybook/react-vite";
import Blockquote, { BlockquoteProps } from "../components/Blockquote";

const meta: Meta<BlockquoteProps> = {
  title: "Components/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    footer: {
      control: { type: "object" },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    align: {
      control: "radio",
      options: ["left", "center", "right"],
    },
    bordered: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<BlockquoteProps>;

const defaultText =
  "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.";

export const Default: Story = {
  args: {
    children: defaultText,
    size: "md",
    align: "left",
    bordered: false,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
  },
};

export const Centered: Story = {
  args: {
    ...Default.args,
    align: "center",
  },
};

export const RightAligned: Story = {
  args: {
    ...Default.args,
    align: "right",
  },
};

export const WithSource: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="text-base font-semibold text-gray-800 dark:text-neutral-400">
        Josh Grazioso
      </div>
    ),
  },
};

const avatarFooter = (
  <div className="flex items-center">
    <div className="shrink-0">
      <img
        className="size-10 rounded-full"
        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
        alt="Avatar"
      />
    </div>
    <div className="ms-4">
      <div className="text-base font-semibold text-gray-800 dark:text-neutral-400">
        Josh Grazioso
      </div>
      <div className="text-xs text-gray-500 dark:text-neutral-500">
        Source title
      </div>
    </div>
  </div>
);

export const WithAvatar: Story = {
  args: {
    ...Default.args,
    footer: avatarFooter,
  },
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    bordered: true,
  },
};

export const BorderedWithAvatar: Story = {
  args: {
    ...Default.args,
    bordered: true,
    footer: avatarFooter,
  },
};
