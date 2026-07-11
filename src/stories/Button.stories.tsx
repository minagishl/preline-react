import type { Meta, StoryObj } from "@storybook/react-vite";
import Button, { ButtonProps } from "../components/Button";
import { ArrowRight, ShoppingBasket } from "lucide-react";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: { type: "radio" },
      options: ["solid", "outline", "ghost", "soft", "white", "link"],
    },
    color: {
      control: { type: "radio" },
      options: ["dark", "gray", "teal", "blue", "red", "yellow", "white"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: { type: "radio" },
      options: ["default", "pill", "block"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
    leftIcon: { control: "object" },
    rightIcon: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

const CartIcon = () => (
  <ShoppingBasket className="size-4 shrink-0" aria-hidden="true" />
);

const ArrowRightIcon = () => (
  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
);

export const Default: Story = {
  args: {
    children: "Button",
    variant: "solid",
    color: "blue",
    size: "md",
    loading: false,
    disabled: false,
  },
};

const renderButtons = (props: ButtonProps) => (
  <div className="flex flex-wrap gap-4">
    <Button {...props} variant="solid">
      Solid
    </Button>
    <Button {...props} variant="outline">
      Outline
    </Button>
    <Button {...props} variant="ghost">
      Ghost
    </Button>
    <Button {...props} variant="soft">
      Soft
    </Button>
    <Button {...props} variant="white">
      White
    </Button>
    <Button {...props} variant="link">
      Link
    </Button>
  </div>
);

export const Types: Story = {
  render: () => renderButtons({ color: "blue" }),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const SolidColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="solid" color="dark">
        Button
      </Button>
      <Button variant="solid" color="gray">
        Button
      </Button>
      <Button variant="solid" color="teal">
        Button
      </Button>
      <Button variant="solid" color="blue">
        Button
      </Button>
      <Button variant="solid" color="red">
        Button
      </Button>
      <Button variant="solid" color="yellow">
        Button
      </Button>
      <Button variant="solid" color="white">
        Button
      </Button>
    </div>
  ),
};

export const OutlineColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" color="dark">
        Button
      </Button>
      <Button variant="outline" color="gray">
        Button
      </Button>
      <Button variant="outline" color="teal">
        Button
      </Button>
      <Button variant="outline" color="blue">
        Button
      </Button>
      <Button variant="outline" color="red">
        Button
      </Button>
      <Button variant="outline" color="yellow">
        Button
      </Button>
      <Button variant="outline" color="white">
        Button
      </Button>
    </div>
  ),
};

export const GhostColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="ghost" color="dark">
        Button
      </Button>
      <Button variant="ghost" color="gray">
        Button
      </Button>
      <Button variant="ghost" color="teal">
        Button
      </Button>
      <Button variant="ghost" color="blue">
        Button
      </Button>
      <Button variant="ghost" color="red">
        Button
      </Button>
      <Button variant="ghost" color="yellow">
        Button
      </Button>
      <Button variant="ghost" color="white">
        Button
      </Button>
    </div>
  ),
};

export const SoftColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="soft" color="dark">
        Button
      </Button>
      <Button variant="soft" color="gray">
        Button
      </Button>
      <Button variant="soft" color="teal">
        Button
      </Button>
      <Button variant="soft" color="blue">
        Button
      </Button>
      <Button variant="soft" color="red">
        Button
      </Button>
      <Button variant="soft" color="yellow">
        Button
      </Button>
      <Button variant="soft" color="white">
        Button
      </Button>
    </div>
  ),
};

export const WhiteColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="white" color="dark">
        Button
      </Button>
      <Button variant="white" color="gray">
        Button
      </Button>
      <Button variant="white" color="teal">
        Button
      </Button>
      <Button variant="white" color="blue">
        Button
      </Button>
      <Button variant="white" color="red">
        Button
      </Button>
      <Button variant="white" color="yellow">
        Button
      </Button>
    </div>
  ),
};

export const LinkColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="link" color="dark">
        Link
      </Button>
      <Button variant="link" color="gray">
        Link
      </Button>
      <Button variant="link" color="blue">
        Link
      </Button>
      <Button variant="link" color="white">
        Link
      </Button>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button shape="pill">Pill</Button>
      <Button shape="block">Block</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button leftIcon={<CartIcon />}>Add to cart</Button>
      <Button variant="white" color="dark" rightIcon={<ArrowRightIcon />}>
        Signup free
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button iconOnly={true} size="sm">
        <CartIcon />
      </Button>
      <Button iconOnly={true} size="md">
        <CartIcon />
      </Button>
      <Button iconOnly={true} size="lg">
        <CartIcon />
      </Button>
      <Button iconOnly={true} size="md" loading={true} />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button loading={true} iconOnly={true} />
      <Button loading={true}>Loading</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => renderButtons({ disabled: true, color: "blue" }),
};
