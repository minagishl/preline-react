import type { Meta, StoryObj } from "@storybook/react-vite";
import Datepicker from "../components/Datepicker";

const meta = {
  title: "Components/Datepicker",
  component: Datepicker,
  tags: ["autodocs"],
} satisfies Meta<typeof Datepicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { label: "Publish date" } };
