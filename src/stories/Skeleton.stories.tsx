import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonProps } from "../components/Skeleton";

const meta: Meta<SkeletonProps> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["block", "circle", "text"],
    },
    lines: {
      control: { type: "number", min: 1, max: 10, step: 1 },
    },
    animate: {
      control: "select",
      options: ["pulse", "none"],
    },
    isLoaded: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<SkeletonProps>;

export const Playground: Story = {
  args: {
    variant: "block",
    className: "h-10 w-48",
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Skeleton className="h-10 w-24" />
      <Skeleton variant="circle" className="size-16" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-6 w-32 rounded-full" />
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <Skeleton variant="text" lines={4} />
      <Skeleton variant="text" lines={2} />
    </div>
  ),
};

export const WithContent: Story = {
  render: () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = window.setTimeout(() => setLoaded(true), 1500);
      return () => window.clearTimeout(timer);
    }, []);

    return (
      <div className="max-w-sm space-y-3">
        <Skeleton variant="circle" className="size-12" isLoaded={loaded}>
          <img
            src="https://avatars.githubusercontent.com/u/0?v=4"
            alt="Avatar"
            className="size-12 rounded-full object-cover"
          />
        </Skeleton>
        <Skeleton variant="text" lines={3} isLoaded={loaded}>
          <div className="space-y-1.5 text-sm text-gray-700 dark:text-neutral-200">
            <div className="font-medium">Pat Doe</div>
            <p>
              This is a short bio that will replace the skeleton once the
              simulated loading state completes.
            </p>
          </div>
        </Skeleton>
      </div>
    );
  },
};
