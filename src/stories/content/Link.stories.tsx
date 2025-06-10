import type { Meta, StoryObj } from "@storybook/react-vite";
import Link, { LinkProps } from "../../components/content/Link";

const meta: Meta<LinkProps> = {
  title: "Content/Link",
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

const ForwardIcon = () => (
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
