import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox, { CheckboxProps } from "../../components/forms/Checkbox";

const meta: Meta<CheckboxProps> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    labelPosition: { control: "radio", options: ["start", "end"] },
    validationState: {
      control: "radio",
      options: [undefined, "success", "error"],
    },
    variant: {
      control: "radio",
      options: ["default", "card", "list"],
    },
  },
  args: {
    label: "Checkbox",
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate",
    indeterminate: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Archive",
    description: "Notify me when this action happens.",
  },
};

export const Card: Story = {
  args: {
    label: "Card Checkbox",
    variant: "card",
  },
};

export const CardRight: Story = {
  args: {
    label: "Card on Right",
    variant: "card",
    labelPosition: "start",
    className: "ml-3",
  },
};

export const List: Story = {
  args: {
    label: "Chris Lynch",
    variant: "list",
  },
};

export const ValidationSuccess: Story = {
  args: {
    label: "Success",
    validationState: "success",
    checked: true,
  },
};

export const ValidationError: Story = {
  args: {
    label: "Error",
    validationState: "error",
    checked: true,
  },
};
