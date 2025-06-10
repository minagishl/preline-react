import type { Meta, StoryObj } from "@storybook/react-vite";
import TimePicker, { TimePickerProps } from "../../components/forms/TimePicker";

const meta: Meta<TimePickerProps> = {
  title: "Forms/Time Picker",
  component: TimePicker,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<TimePickerProps>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
