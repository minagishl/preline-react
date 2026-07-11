import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchBox from "../../components/SearchBox";
const meta = {
  title: "Forms/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { placeholder: "Search documentation" } };
