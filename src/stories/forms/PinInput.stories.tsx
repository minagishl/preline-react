import type { Meta, StoryObj } from "@storybook/react-vite";
import PinInput, { PinInputProps } from "../../components/forms/PinInput";
import { useState } from "react";

const meta: Meta<PinInputProps> = {
  title: "Forms/Pin Input",
  component: PinInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    length: { control: "number" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    variant: {
      control: { type: "select" },
      options: ["default", "gray", "underline", "focus-effect"],
    },
    inputSize: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    type: { control: "text" },
  },
};

export default meta;

const PinInputWithState: React.FC<PinInputProps> = (props) => {
  const [value, setValue] = useState(props.value || "");
  return <PinInput {...props} value={value} onChange={setValue} />;
};

type Story = StoryObj<PinInputProps>;

export const Default: Story = {
  render: (args) => <PinInputWithState {...args} />,
  args: {
    length: 4,
  },
};

export const WithPlaceholder: Story = {
  render: (args) => <PinInputWithState {...args} />,
  args: {
    ...Default.args,
    placeholder: "⚬",
  },
};

export const Gray: Story = {
  render: (args) => <PinInputWithState {...args} />,
  args: {
    ...WithPlaceholder.args,
    variant: "gray",
  },
};

export const FocusEffect: Story = {
  render: (args) => <PinInputWithState {...args} />,
  args: {
    ...WithPlaceholder.args,
    variant: "focus-effect",
  },
};

export const Length: Story = {
  render: (args) => <PinInputWithState {...args} />,
  args: {
    ...WithPlaceholder.args,
    length: 6,
  },
};

export const Masked: Story = {
  render: (args) => <PinInputWithState {...args} />,
  args: {
    ...WithPlaceholder.args,
    type: "password",
  },
};

export const Disabled: Story = {
  args: {
    ...WithPlaceholder.args,
    disabled: true,
  },
  render: (args) => <PinInputWithState {...args} />,
};

export const Sizes: Story = {
  args: {
    ...WithPlaceholder.args,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <PinInputWithState {...args} inputSize="sm" />
      <PinInputWithState {...args} inputSize="md" />
      <PinInputWithState {...args} inputSize="lg" />
    </div>
  ),
};
