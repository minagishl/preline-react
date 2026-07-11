import type { Meta, StoryObj } from "@storybook/react-vite";
import { CustomScrollbar, Image } from "../../components/content/Image";

const meta = {
  title: "Layout & Content/Image",
  component: Image,
  tags: ["autodocs"],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Responsive: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    alt: "Laptop workspace",
    className: "rounded-xl",
  },
};

export const ScrollableContent: Story = {
  render: () => (
    <CustomScrollbar className="border-border h-48 max-w-sm rounded-lg border p-4">
      <div className="text-foreground space-y-3 text-sm">
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index}>Scrollable item {index + 1}</p>
        ))}
      </div>
    </CustomScrollbar>
  ),
};
