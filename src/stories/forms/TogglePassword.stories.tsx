import type { Meta, StoryObj } from "@storybook/react-vite";
import TogglePassword from "../../components/forms/TogglePassword";

const meta: Meta<typeof TogglePassword> = {
  title: "Forms/Toggle Password",
  component: TogglePassword,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label for the toggle password input.",
    },
    placeholder: {
      control: "text",
      description: "The placeholder text for the input.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled.",
    },
    value: {
      control: "text",
      description: "The value of the input.",
    },
    onChange: { action: "changed", description: "Input change handler." },
  },
  args: {
    label: "Password",
    placeholder: "Enter password",
    value: "12345qwerty",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "hs-toggle-password",
  },
  render: (args) => {
    return (
      <div className="w-96">
        <TogglePassword {...args} />
      </div>
    );
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: "preline-is-awesome",
  },
  render: (args) => {
    return (
      <div className="w-96">
        <TogglePassword {...args} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: (args) => {
    return (
      <div className="w-96">
        <TogglePassword {...args} />
      </div>
    );
  },
};
