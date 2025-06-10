import type { Meta, StoryObj } from "@storybook/react-vite";
import FileInput, { FileInputProps } from "../../components/forms/FileInput";

const meta: Meta<FileInputProps> = {
  title: "Forms/File Input",
  component: FileInput,
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<FileInputProps>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
