import type { Meta, StoryObj } from "@storybook/react-vite";
import LayoutSplitter from "../../components/layout/LayoutSplitter";

const meta: Meta<typeof LayoutSplitter> = {
  title: "Layout & Content/Layout Splitter",
  component: LayoutSplitter,
  tags: ["autodocs"],
  argTypes: {
    children: { control: false },
    onResize: { control: false },
    onResizeEnd: { control: false },
    handleIcon: { control: false },
    className: { control: false },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof LayoutSplitter>;

const Panel = ({ label }: { label: string }) => (
  <div className="flex h-full w-full items-center justify-center p-4 text-sm font-medium text-gray-700 dark:text-neutral-200">
    {label}
  </div>
);

export const Horizontal: Story = {
  render: () => (
    <div className="h-64 w-full">
      <LayoutSplitter className="h-full rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <LayoutSplitter.Item defaultSize={38} className="overflow-hidden">
          <Panel label="Left" />
        </LayoutSplitter.Item>
        <LayoutSplitter.Item defaultSize={32} className="overflow-hidden">
          <Panel label="Center" />
        </LayoutSplitter.Item>
        <LayoutSplitter.Item defaultSize={30} className="overflow-hidden">
          <Panel label="Right" />
        </LayoutSplitter.Item>
      </LayoutSplitter>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-96 w-full">
      <LayoutSplitter
        direction="vertical"
        className="h-full rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800"
      >
        <LayoutSplitter.Item defaultSize={30} className="overflow-hidden">
          <Panel label="Top" />
        </LayoutSplitter.Item>
        <LayoutSplitter.Item defaultSize={45} className="overflow-hidden">
          <Panel label="Middle" />
        </LayoutSplitter.Item>
        <LayoutSplitter.Item defaultSize={25} className="overflow-hidden">
          <Panel label="Bottom" />
        </LayoutSplitter.Item>
      </LayoutSplitter>
    </div>
  ),
};

export const NestedDirections: Story = {
  render: () => (
    <div className="h-96 w-full">
      <LayoutSplitter
        direction="vertical"
        className="h-full rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-700"
      >
        <LayoutSplitter.Item defaultSize={28} className="overflow-hidden">
          <Panel label="Header" />
        </LayoutSplitter.Item>
        <LayoutSplitter.Item defaultSize={52} className="overflow-hidden">
          <LayoutSplitter className="h-full">
            <LayoutSplitter.Item defaultSize={35} className="overflow-hidden">
              <Panel label="Sidebar" />
            </LayoutSplitter.Item>
            <LayoutSplitter.Item defaultSize={40} className="overflow-hidden">
              <Panel label="Content" />
            </LayoutSplitter.Item>
            <LayoutSplitter.Item defaultSize={25} className="overflow-hidden">
              <Panel label="Details" />
            </LayoutSplitter.Item>
          </LayoutSplitter>
        </LayoutSplitter.Item>
        <LayoutSplitter.Item defaultSize={20} className="overflow-hidden">
          <Panel label="Footer" />
        </LayoutSplitter.Item>
      </LayoutSplitter>
    </div>
  ),
};

export const WithMinimumSizes: Story = {
  render: () => (
    <div className="h-64 w-full">
      <LayoutSplitter
        className="h-full rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800"
        itemMinSize={10}
      >
        <LayoutSplitter.Item
          defaultSize={45}
          minSize={15}
          className="overflow-hidden"
        >
          <Panel label="Navigation" />
        </LayoutSplitter.Item>
        <LayoutSplitter.Item
          defaultSize={35}
          minSize={20}
          className="overflow-hidden"
        >
          <Panel label="Canvas" />
        </LayoutSplitter.Item>
        <LayoutSplitter.Item
          defaultSize={20}
          minSize={10}
          className="overflow-hidden"
        >
          <Panel label="Inspector" />
        </LayoutSplitter.Item>
      </LayoutSplitter>
    </div>
  ),
};
