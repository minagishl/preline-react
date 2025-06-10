import type { Meta, StoryObj } from "@storybook/react-vite";
import RangeSlider, { RangeSliderProps } from "../../components/forms/RangeSlider";

const meta: Meta<RangeSliderProps> = {
  title: "Forms/Range Slider",
  component: RangeSlider,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<RangeSliderProps>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    disabled: true,
  },
};
