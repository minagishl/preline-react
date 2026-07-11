import type { Meta, StoryObj } from "@storybook/react-vite";
import Carousel from "../components/Carousel";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Carousel>
      {["First slide", "Second slide", "Third slide"].map((label) => (
        <div
          key={label}
          className="bg-primary/10 text-primary rounded-xl p-16 text-center"
        >
          {label}
        </div>
      ))}
    </Carousel>
  ),
};
