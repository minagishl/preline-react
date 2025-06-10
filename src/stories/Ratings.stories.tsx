import { FC, HTMLAttributes, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Ratings, { RatingsSize } from "../components/Ratings";
import Button from "../components/Button";

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
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    />
  </svg>
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
      <div className="mt-2 flex justify-center items-center">
        {["😔", "😐️", "🤩"].map((emoji) => (
          <Ratings.EmojiButton key={emoji}>{emoji}</Ratings.EmojiButton>
        ))}
      </div>
    </div>
  ),
};

const ThumbsUpIcon = () => (
  <svg
    className="shrink-0 size-4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 10v12"></path>
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
  </svg>
);

const ThumbsDownIcon = () => (
  <svg
    className="shrink-0 size-4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 14V2"></path>
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
  </svg>
);

export const RateWithThumbs: Story = {
  render: () => (
    <div className="flex justify-center items-center gap-x-2">
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
