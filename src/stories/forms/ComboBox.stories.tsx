import type { Meta, StoryObj } from "@storybook/react-vite";
import ComboBox from "../../components/ComboBox";
const meta = {
  title: "Forms/ComboBox",
  component: ComboBox,
  tags: ["autodocs"],
} satisfies Meta<typeof ComboBox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { options: ["Tokyo", "Kyoto", "Osaka"], placeholder: "Select a city" },
};
