import type { Meta, StoryObj } from "@storybook/react-vite";
import FileUpload from "../components/FileUpload";

const meta = {
  title: "Components/File Upload",
  component: FileUpload,
  tags: ["autodocs"],
} satisfies Meta<typeof FileUpload>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { label: "Drop a document or choose a file" },
};
