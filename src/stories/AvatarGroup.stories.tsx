import type { Meta, StoryObj } from "@storybook/react-vite";
import AvatarGroup from "../components/AvatarGroup";
import Avatar from "../components/Avatar";

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/Avatar Group",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "AvatarGroup component to stack and group avatars.",
      },
    },
  },
  argTypes: {
    max: {
      control: "number",
      description: "Maximum number of avatars to display",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the avatars in the group",
    },
    shape: {
      control: "select",
      options: ["circular", "rounded"],
      description: "Shape of the avatars in the group",
    },
    borderColor: {
      control: "text",
      description: "Border color for the avatars (e.g., ring-blue-500)",
    },
    spacing: {
      control: "text",
      description: "Spacing between avatars (e.g., -space-x-2)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = [
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1602452920335-6a132309c7c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
];

export const Default: Story = {
  args: {
    size: "lg",
    shape: "circular",
  },
  render: (args) => (
    <AvatarGroup {...args}>
      {avatars.slice(0, 3).map((src) => (
        <Avatar key={src} src={src} />
      ))}
    </AvatarGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-4">
      <AvatarGroup {...args} size="sm">
        {avatars.slice(0, 3).map((src) => (
          <Avatar key={src} src={src} />
        ))}
      </AvatarGroup>
      <AvatarGroup {...args} size="md">
        {avatars.slice(0, 3).map((src) => (
          <Avatar key={src} src={src} />
        ))}
      </AvatarGroup>
      <AvatarGroup {...args} size="lg">
        {avatars.slice(0, 3).map((src) => (
          <Avatar key={src} src={src} />
        ))}
      </AvatarGroup>
      <AvatarGroup {...args} size="xl">
        {avatars.slice(0, 3).map((src) => (
          <Avatar key={src} src={src} />
        ))}
      </AvatarGroup>
    </div>
  ),
};

export const MaxAvatars: Story = {
  args: {
    max: 3,
    size: "lg",
  },
  render: (args) => (
    <AvatarGroup {...args}>
      {avatars.map((src) => (
        <Avatar key={src} src={src} />
      ))}
    </AvatarGroup>
  ),
};

export const CustomBorderColor: Story = {
  args: {
    borderColor: "ring-blue-500",
    size: "lg",
  },
  render: (args) => (
    <AvatarGroup {...args}>
      {avatars.slice(0, 4).map((src) => (
        <Avatar key={src} src={src} />
      ))}
    </AvatarGroup>
  ),
};
