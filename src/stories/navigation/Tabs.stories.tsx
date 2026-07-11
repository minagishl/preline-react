import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs from "../../components/Tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    items: [
      {
        id: "account",
        label: "Account",
        content: "Configure account details.",
      },
      {
        id: "security",
        label: "Security",
        content: "Review sign-in settings.",
      },
    ],
  },
};
