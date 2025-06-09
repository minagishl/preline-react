import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LegendIndicator,
  LegendIndicatorColor,
} from "../components/LegendIndicator";

const colors: LegendIndicatorColor[] = [
  "dark",
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
  "light",
];

const meta: Meta<typeof LegendIndicator> = {
  title: "Components/Legend Indicator",
  component: LegendIndicator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: colors,
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LegendIndicator>;

export const Default: Story = {
  args: {
    children: "Legend indicator",
    color: "gray",
  },
};

export const ColorVariations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {colors.map((color) => (
        <LegendIndicator key={color} color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </LegendIndicator>
      ))}
    </div>
  ),
};
