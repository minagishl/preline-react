import type { Meta, StoryObj } from "@storybook/react-vite";
import Stepper from "../../components/Stepper";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    currentStep: 1,
    items: [{ title: "Account" }, { title: "Profile" }, { title: "Complete" }],
  },
};
