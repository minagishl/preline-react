import type { Meta, StoryObj } from "@storybook/react-vite";
import Marquee from "../components/Marquee";

const meta = {
  title: "Components/Marquee",
  component: Marquee,
  tags: ["autodocs"],
} satisfies Meta<typeof Marquee>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Marquee>
      <span>Preline</span>
      <span>React</span>
      <span>Tailwind CSS</span>
    </Marquee>
  ),
};
