import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea, { TextareaProps } from "../../components/forms/Textarea";

const meta: Meta<TextareaProps> = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    rows: { control: "number" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    placeholder: "Type here...",
    rows: 3,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    rows: 3,
  },
};
