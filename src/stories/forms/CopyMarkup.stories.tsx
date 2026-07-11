import type { Meta, StoryObj } from "@storybook/react-vite";
import CopyMarkup from "../../components/CopyMarkup";
const meta = {
  title: "Forms/Copy Markup",
  component: CopyMarkup,
  tags: ["autodocs"],
} satisfies Meta<typeof CopyMarkup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    value: "npm install preline-react",
    children: "Copy install command",
  },
};
