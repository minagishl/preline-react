import type { Meta, StoryObj } from "@storybook/react-vite";
import Select, { SelectProps } from "../../components/forms/Select";

const meta: Meta<SelectProps> = {
  title: "Forms/Select",
  component: Select,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<SelectProps>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="">Choose</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled>
      <option value="">Choose</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  ),
};
