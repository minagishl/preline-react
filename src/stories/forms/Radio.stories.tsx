import type { Meta, StoryObj } from "@storybook/react-vite";
import Radio, { RadioProps } from "../../components/forms/Radio";

const meta: Meta<RadioProps> = {
  title: "Forms/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    name: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<RadioProps>;

export const Default: Story = {
  args: {
    label: "Radio",
    name: "radio",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
    name: "radio",
  },
};
