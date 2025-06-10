import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch, { SwitchProps } from "../../components/forms/Switch";

const meta: Meta<SwitchProps> = {
  title: "Forms/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<SwitchProps>;

export const Default: Story = {
  args: {
    label: "Toggle",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};
