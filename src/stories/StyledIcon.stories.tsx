import React, { FC, HTMLAttributes } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StyledIcon,
  StyledIconColor,
  StyledIconShape,
  StyledIconSize,
  StyledIconVariant,
} from "../components/StyledIcon";

const variants: StyledIconVariant[] = [
  "ghost",
  "solid",
  "soft",
  "soft-outlined",
  "outline",
  "shadow",
];
const colors: StyledIconColor[] = [
  "dark",
  "gray",
  "red",
  "yellow",
  "blue",
  "teal",
  "white",
];
const sizes: StyledIconSize[] = ["sm", "md", "lg"];
const shapes: StyledIconShape[] = ["rounded", "square"];

const HomeIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const meta: Meta<typeof StyledIcon> = {
  title: "Components/Styled Icon",
  component: StyledIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: { control: "select", options: variants },
    color: { control: "select", options: colors },
    size: { control: "select", options: sizes },
    shape: { control: "select", options: shapes },
    children: { control: false },
  },
  args: {
    children: <HomeIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof StyledIcon>;

export const Default: Story = {
  args: {
    variant: "solid",
    color: "blue",
    size: "md",
    shape: "rounded",
  },
};

const renderVariantGrid = (variant: StyledIconVariant) => (
  <div className="grid grid-cols-4 gap-4">
    {colors.map((color) => (
      <StyledIcon key={variant + color} variant={variant} color={color}>
        <HomeIcon />
      </StyledIcon>
    ))}
  </div>
);

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="font-semibold w-28">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </span>
          <StyledIcon variant={variant}>
            <HomeIcon />
          </StyledIcon>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <StyledIcon key={size} size={size} variant="solid">
          <HomeIcon />
        </StyledIcon>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {shapes.map((shape) => (
        <StyledIcon key={shape} shape={shape} variant="solid">
          <HomeIcon />
        </StyledIcon>
      ))}
    </div>
  ),
};

export const SolidColors: Story = {
  name: "Colors: Solid",
  render: () => renderVariantGrid("solid"),
};

export const OutlineColors: Story = {
  name: "Colors: Outline",
  render: () => renderVariantGrid("outline"),
};

export const GhostColors: Story = {
  name: "Colors: Ghost",
  render: () => renderVariantGrid("ghost"),
};

export const SoftColors: Story = {
  name: "Colors: Soft",
  render: () => renderVariantGrid("soft"),
};

export const SoftOutlinedColors: Story = {
  name: "Colors: Soft Outlined",
  render: () => renderVariantGrid("soft-outlined"),
};
