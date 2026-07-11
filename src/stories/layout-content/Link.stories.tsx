import type { Meta, StoryObj } from "@storybook/react-vite";
import Link, { LinkProps } from "../../components/content/Link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const meta: Meta<LinkProps> = {
  title: "Layout & Content/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    as: {
      control: "text",
    },
    variant: {
      control: { type: "radio" },
      options: ["default", "underline", "icon", "white"],
    },
    underlineColor: {
      control: { type: "select" },
      options: ["dark", "gray", "teal", "blue", "red", "yellow", "white"],
    },
    underlineOffset: {
      control: { type: "radio" },
      options: ["1", "2", "4", "8"],
    },
  },
};

export default meta;

type Story = StoryObj<LinkProps>;

export const Default: Story = {
  args: {
    children: "Link",
    href: "#",
  },
};

export const Underline: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link variant="underline" href="#" underlineColor="blue">
        Primary underline
      </Link>
      <Link
        variant="underline"
        href="#"
        underlineColor="red"
        underlineOffset="4"
      >
        Invalid underline with offset
      </Link>
    </div>
  ),
};

const BackIcon = () => (
  <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
);

const ForwardIcon = () => (
  <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
);

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link variant="icon" href="#" leftIcon={<BackIcon />}>
        Back to home
      </Link>
      <Link variant="icon" href="#" rightIcon={<ForwardIcon />}>
        Learn more
      </Link>
    </div>
  ),
};

export const White: Story = {
  args: {
    children: "White Link",
    href: "#",
    variant: "white",
  },
};
