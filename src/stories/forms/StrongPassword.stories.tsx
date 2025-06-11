import type { Meta, StoryObj } from "@storybook/react-vite";
import StrongPassword from "../../components/forms/StrongPassword";

const meta: Meta<typeof StrongPassword> = {
  title: "Forms/Strong Password",
  component: StrongPassword,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "text" } },
    minLength: { control: { type: "number" } },
    withIndicatorAndHints: { control: { type: "boolean" } },
    popover: { control: { type: "boolean" } },
    specialCharactersSet: { control: { type: "text" } },
    checksExclude: {
      control: {
        type: "multi-select",
      },
      options: [
        "min-length",
        "lowercase",
        "uppercase",
        "numbers",
        "special-characters",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="w-96">
        <StrongPassword {...args} />
      </div>
    );
  },
};

export const WithMinLength: Story = {
  args: {
    minLength: 8,
  },
  render: (args) => {
    return (
      <div className="w-96">
        <StrongPassword {...args} />
      </div>
    );
  },
};

export const WithIndicatorAndHints: Story = {
  args: {
    withIndicatorAndHints: true,
  },
  render: (args) => {
    return (
      <div className="w-96">
        <StrongPassword {...args} />
      </div>
    );
  },
};

export const WithPopover: Story = {
  args: {
    popover: true,
  },
  render: (args) => {
    return (
      <div className="h-64 w-96">
        <StrongPassword {...args} />
      </div>
    );
  },
};

export const WithCustomValidation: Story = {
  args: {
    withIndicatorAndHints: true,
    checksExclude: ["lowercase", "min-length"],
    specialCharactersSet: "&!@",
  },
  render: (args) => {
    return (
      <div className="w-96">
        <StrongPassword {...args} />
      </div>
    );
  },
};
