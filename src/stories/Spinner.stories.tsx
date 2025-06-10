import type { Meta, StoryObj } from "@storybook/react-vite";
import Spinner, { SpinnerColor, SpinnerSize } from "../components/Spinner";

const colors: SpinnerColor[] = [
  "blue",
  "gray",
  "dark",
  "red",
  "yellow",
  "green",
  "indigo",
  "purple",
  "pink",
  "orange",
  "white",
];

const sizes: SpinnerSize[] = ["sm", "md", "lg"];

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "select", options: colors },
    size: { control: "select", options: sizes },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    color: "blue",
    size: "md",
  },
};

export const ColorVariations: Story = {
  render: () => (
    <div className="flex gap-4">
      {colors.map((color) => (
        <Spinner key={color} color={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};
