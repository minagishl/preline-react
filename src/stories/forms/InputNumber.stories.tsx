import type { Meta, StoryObj } from "@storybook/react-vite";
import InputNumber, {
  InputNumberProps,
} from "../../components/forms/InputNumber";

const meta: Meta<InputNumberProps> = {
  title: "Forms/Input Number",
  component: InputNumber,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "default",
          "input-style",
          "vertically-stacked",
          "horizontally-stacked",
          "mini",
          "pricing-seats",
        ],
      },
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputNumber>;

export const Default: Story = {
  args: {
    variant: "default",
    defaultValue: 1,
  },
};

export const InputStyle: Story = {
  args: {
    variant: "input-style",
    defaultValue: 1,
    label: "Select quantity",
  },
};

export const ButtonsVerticallyStacked: Story = {
  args: {
    variant: "vertically-stacked",
    defaultValue: 1,
    label: "Select quantity",
  },
};

export const ButtonsHorizontallyStacked: Story = {
  args: {
    variant: "horizontally-stacked",
    defaultValue: 1,
  },
};

export const Mini: Story = {
  args: {
    variant: "mini",
    defaultValue: 0,
  },
};

export const PricingSeats: Story = {
  args: {
    variant: "pricing-seats",
    defaultValue: 0,
    label: "Additional seats",
    description: "$39 monthly",
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    defaultValue: 10,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    variant: "input-style",
    defaultValue: 10,
    error: "Out of limit",
  },
};

export const WithMinMaxStep: Story = {
  args: {
    variant: "default",
    defaultValue: 2,
    min: 0,
    max: 10,
    step: 2,
  },
};
