import type { Meta, StoryObj } from "@storybook/react-vite";
import Progress, { ProgressColor } from "../components/Progress";

const colors: ProgressColor[] = [
  "blue",
  "gray",
  "dark",
  "teal",
  "red",
  "yellow",
  "white",
];

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    color: { control: "select", options: colors },
    size: { control: "select", options: ["sm", "md", "lg"] },
    shape: { control: "select", options: ["rounded", "square"] },
    label: { control: "text" },
    vertical: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    value: 25,
    className: "w-64",
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <Progress {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="w-64 space-y-4">
      <Progress {...args} size="sm" value={25} />
      <Progress {...args} size="md" value={50} />
      <Progress {...args} size="lg" value={75} />
    </div>
  ),
};

export const WithLabelInside: Story = {
  args: {
    value: 50,
    size: "md",
    label: "50%",
  },
  render: (args) => (
    <div className="w-64">
      <Progress {...args} />
    </div>
  ),
};

export const WithLabelOutside: Story = {
  name: "With Label at the end",
  render: (args) => (
    <div className="w-80 space-y-5">
      {[25, 50, 75, 100].map((value) => (
        <div
          key={value}
          className="flex items-center gap-x-3 whitespace-nowrap"
        >
          <Progress {...args} value={value} size="sm" />
          <div className="w-10 text-end">
            <span className="text-sm text-gray-800 dark:text-white">
              {value}%
            </span>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithTitleLabel: Story = {
  render: (args) => (
    <div className="w-80">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Upload progress
        </h3>
        <span className="text-sm text-gray-800 dark:text-white">
          {args.value}%
        </span>
      </div>
      <Progress {...args} size="sm" />
    </div>
  ),
};

export const WithFloatingLabel: Story = {
  render: (args) => {
    const value = args.value || 0;
    const offset = value > 10 ? `calc(${value}% - 1.25rem)` : `${value}%`;
    return (
      <div className="w-80">
        <div
          style={{ marginLeft: offset }}
          className="mb-2 inline-block rounded-lg border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 transition-all duration-500 dark:border-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
        >
          {value}%
        </div>
        <Progress {...args} size="sm" />
      </div>
    );
  },
};

export const ColorVariations: Story = {
  render: (args) => (
    <div className="w-64 space-y-5">
      {colors.map((color) => (
        <Progress {...args} key={color} color={color} value={50} />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div className="w-64 space-y-4">
      <Progress {...args} shape="rounded" value={50} />
      <Progress {...args} shape="square" value={50} />
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-48 gap-x-8">
      {[25, 50, 75, 90, 17].map((value) => (
        <Progress {...args} key={value} vertical value={value} />
      ))}
    </div>
  ),
  args: {
    className: "",
  },
};
