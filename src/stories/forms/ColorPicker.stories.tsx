import type { Meta, StoryObj } from "@storybook/react-vite";
import ColorPicker, {
  ColorPickerProps,
} from "../../components/forms/ColorPicker";

const meta: Meta<ColorPickerProps> = {
  title: "Forms/Color Picker",
  component: ColorPicker,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<ColorPickerProps>;

export const Default: Story = {
  args: {
    value: "#2563eb",
  },
};

export const Disabled: Story = {
  args: {
    value: "#2563eb",
    disabled: true,
  },
};
