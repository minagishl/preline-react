import type { Meta, StoryObj } from "@storybook/react-vite";
import InputGroup, { InputGroupProps } from "../../components/forms/InputGroup";

const meta: Meta<InputGroupProps> = {
  title: "Forms/Input Group",
  component: InputGroup,
  parameters: { layout: "centered" },
  argTypes: {
    prefix: { control: "text" },
    suffix: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<InputGroupProps>;

export const PrefixSuffix: Story = {
  args: {
    placeholder: "Username",
    prefix: "@",
    suffix: ".com",
  },
};
