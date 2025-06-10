import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "../components/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Avatar component based on Preline UI design.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image URL for the avatar",
    },
    alt: {
      control: "text",
      description: "Alt text for the avatar image",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the avatar",
    },
    shape: {
      control: "select",
      options: ["circular", "rounded"],
      description: "Shape of the avatar",
    },
    initials: {
      control: "text",
      description: "Initials to display if no image src is provided",
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "away", "busy"],
      description: "Status indicator for the avatar",
    },
    statusPosition: {
      control: "select",
      options: ["top", "bottom"],
      description: "Position of the status indicator",
    },
    color: {
      control: "select",
      options: ["dark", "gray", "green", "blue", "red", "yellow", "white"],
      description: "Color of the avatar when using initials",
    },
    colorVariant: {
      control: "select",
      options: [undefined, "solid", "soft", "outline", "white"],
      description: "Color variant of the avatar when using initials",
    },
  },
  args: {
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    alt: "Avatar",
    size: "lg",
    shape: "circular",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Circular: Story = {
  args: {
    shape: "circular",
  },
};

export const Rounded: Story = {
  args: {
    shape: "rounded",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};

export const Initials: Story = {
  args: {
    src: undefined,
    initials: "AC",
  },
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Avatar {...args} size="sm" initials="AC" />
      <Avatar {...args} size="md" initials="AC" />
      <Avatar {...args} size="lg" initials="AC" />
      <Avatar {...args} size="xl" initials="AC" />
    </div>
  ),
};

export const Placeholder: Story = {
  args: {
    src: undefined,
  },
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};

export const WithStatus: Story = {
  args: {
    status: "online",
  },
  render: (args) => (
    <div className="flex items-center space-x-8">
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">Circular</p>
        <div className="flex items-center space-x-4">
          <Avatar {...args} shape="circular" status="online" size="lg" />
          <Avatar {...args} shape="circular" status="busy" size="lg" />
          <Avatar {...args} shape="circular" status="away" size="lg" />
          <Avatar {...args} shape="circular" status="offline" size="lg" />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">Rounded</p>
        <div className="flex items-center space-x-4">
          <Avatar {...args} shape="rounded" status="online" size="lg" />
          <Avatar {...args} shape="rounded" status="busy" size="lg" />
          <Avatar {...args} shape="rounded" status="away" size="lg" />
          <Avatar {...args} shape="rounded" status="offline" size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const StatusPosition: Story = {
  args: {
    status: "online",
  },
  render: (args) => (
    <div className="flex items-center space-x-8">
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">Circular</p>
        <div className="flex items-center space-x-4">
          <Avatar
            {...args}
            shape="circular"
            status="online"
            size="lg"
            statusPosition="top"
          />
          <Avatar
            {...args}
            shape="circular"
            status="online"
            size="lg"
            statusPosition="bottom"
          />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">Rounded</p>
        <div className="flex items-center space-x-4">
          <Avatar
            {...args}
            shape="rounded"
            status="online"
            size="lg"
            statusPosition="top"
          />
          <Avatar
            {...args}
            shape="rounded"
            status="online"
            size="lg"
            statusPosition="bottom"
          />
        </div>
      </div>
    </div>
  ),
};

export const SolidColors: Story = {
  args: {
    src: undefined,
    initials: "AC",
    size: "lg",
    colorVariant: "solid",
  },
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Avatar {...args} color="dark" />
      <Avatar {...args} color="gray" />
      <Avatar {...args} color="green" />
      <Avatar {...args} color="blue" />
      <Avatar {...args} color="red" />
      <Avatar {...args} color="yellow" />
      <Avatar {...args} color="white" />
    </div>
  ),
};

export const SoftColors: Story = {
  args: {
    src: undefined,
    initials: "AC",
    size: "lg",
    colorVariant: "soft",
  },
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Avatar {...args} color="dark" />
      <Avatar {...args} color="gray" />
      <Avatar {...args} color="green" />
      <Avatar {...args} color="blue" />
      <Avatar {...args} color="red" />
      <Avatar {...args} color="yellow" />
      <Avatar {...args} color="white" />
    </div>
  ),
};

export const OutlineColors: Story = {
  args: {
    src: undefined,
    initials: "AC",
    size: "lg",
    colorVariant: "outline",
  },
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Avatar {...args} color="dark" />
      <Avatar {...args} color="gray" />
      <Avatar {...args} color="green" />
      <Avatar {...args} color="blue" />
      <Avatar {...args} color="red" />
      <Avatar {...args} color="yellow" />
      <Avatar {...args} color="white" />
    </div>
  ),
};

export const WhiteVariant: Story = {
  args: {
    src: undefined,
    initials: "AC",
    colorVariant: "white",
  },
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};
