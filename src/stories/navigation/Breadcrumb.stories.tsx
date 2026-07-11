import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumb from "../../components/Breadcrumb";

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    items: [
      { label: "Docs", href: "#docs" },
      { label: "Components", href: "#components" },
      { label: "Breadcrumb" },
    ],
  },
};
