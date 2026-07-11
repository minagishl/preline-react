import type { Meta, StoryObj } from "@storybook/react-vite";
import FileUploadingProgress from "../components/FileUploadingProgress";

const meta = {
  title: "Components/File Uploading Progress",
  component: FileUploadingProgress,
  tags: ["autodocs"],
} satisfies Meta<typeof FileUploadingProgress>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { fileName: "quarterly-report.pdf", progress: 68 },
};
