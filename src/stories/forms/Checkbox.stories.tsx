import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox, { CheckboxProps } from "../../components/forms/Checkbox";

const meta: Meta<CheckboxProps> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {
    label: "Checkbox",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};
