import { FC, HTMLAttributes, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Ratings, { RatingsSize } from "../components/Ratings";
import Button from "../components/Button";
import { Heart, ThumbsDown, ThumbsUp } from "lucide-react";

const meta: Meta<typeof Ratings> = {
  title: "Components/Ratings",
  component: Ratings,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    total: { control: "number" },
    value: { control: { type: "range", min: 0, max: 5, step: 1 } },
    readOnly: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    icon: { control: false },
    color: { control: "text" },
    emptyColor: { control: "text" },
    hoverColor: { control: "text" },
  },
  args: {
    total: 5,
    value: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Ratings>;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value || 0);
    return <Ratings {...args} value={value} onChange={setValue} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(["sm", "md", "lg"] as RatingsSize[]).map((size) => (
        <Ratings key={size} size={size} value={3} readOnly />
      ))}
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
};

const HeartIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <Heart {...props} fill="currentColor" aria-hidden="true" />
);

export const CustomIcon: Story = {
  name: "Custom Icon (Hearts)",
  args: {
    icon: <HeartIcon />,
    color: "text-red-500",
    hoverColor: "hover:text-red-500",
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value || 0);
    return <Ratings {...args} value={value} onChange={setValue} />;
  },
};

export const RateWithEmoji: Story = {
  render: () => (
    <div className="text-center">
      <h3 className="text-gray-800 dark:text-white">
        Did this answer your question?
      </h3>
      <div className="mt-2 flex items-center justify-center">
        {["😔", "😐️", "🤩"].map((emoji) => (
          <Ratings.EmojiButton key={emoji}>{emoji}</Ratings.EmojiButton>
        ))}
      </div>
    </div>
  ),
};

const ThumbsUpIcon = () => (
  <ThumbsUp className="size-4 shrink-0" aria-hidden="true" />
);

const ThumbsDownIcon = () => (
  <ThumbsDown className="size-4 shrink-0" aria-hidden="true" />
);

export const RateWithThumbs: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-x-2">
      <h3 className="text-gray-800 dark:text-white">Was this page helpful?</h3>
      <div className="flex gap-x-2">
        <Button variant="white" color="gray" size="sm">
          <ThumbsUpIcon /> Yes
        </Button>
        <Button variant="white" color="gray" size="sm">
          <ThumbsDownIcon /> No
        </Button>
      </div>
    </div>
  ),
};
