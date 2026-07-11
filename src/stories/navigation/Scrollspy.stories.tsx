import type { Meta, StoryObj } from "@storybook/react-vite";
import Scrollspy from "../../components/Scrollspy";

const meta = {
  title: "Navigation/Scrollspy",
  component: Scrollspy,
  tags: ["autodocs"],
} satisfies Meta<typeof Scrollspy>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "usage", label: "Usage" },
    ],
  },
};
