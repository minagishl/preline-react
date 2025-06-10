import type { Meta, StoryObj } from "@storybook/react-vite";
import Input, { InputProps } from "../../components/forms/Input";

const meta: Meta<InputProps> = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};
