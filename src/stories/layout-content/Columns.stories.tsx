import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import Columns, { type ColumnsProps } from "../../components/layout/Columns";

const COLUMN_VALUES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "auto",
  "3xs",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
];

const GAP_VALUES = [
  "0",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
];

const meta: Meta<typeof Columns> = {
  title: "Layout & Content/Columns",
  component: Columns,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: { type: "select" },
      options: COLUMN_VALUES,
    },
    gap: {
      control: { type: "select" },
      options: GAP_VALUES,
    },
    gapX: {
      control: { type: "select" },
      options: GAP_VALUES,
    },
    gapY: {
      control: { type: "select" },
      options: GAP_VALUES,
    },
    responsive: {
      control: false,
    },
    as: {
      control: false,
    },
    className: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<ColumnsProps>;

const StorySection = ({ children }: { children: ReactNode }) => (
  <div className="m-6 rounded-xl border-2 border-dashed border-red-400 p-6">
    {children}
  </div>
);

const items = [
  {
    title: "Column Ready",
    description:
      "Use the columns utility to flow cards or text blocks naturally across multiple columns.",
  },
  {
    title: "Auto Balancing",
    description:
      "Tailwind automatically balances column height so your content stays visually even.",
  },
  {
    title: "Responsive",
    description:
      "Switch column counts or widths per breakpoint with a simple object configuration.",
  },
  {
    title: "Gaps",
    description:
      "Mix column utilities with gap classes to control spacing between items.",
  },
  {
    title: "Media",
    description:
      "Columns work just as well for media galleries, article listings, or mixed content blocks.",
  },
  {
    title: "Accessibility",
    description:
      "Keep reading order intact by using semantic markup; columns only affect visual flow.",
  },
];

const ColumnCard = ({ title, description }: (typeof items)[number]) => (
  <article className="mb-4 break-inside-avoid rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
    <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-neutral-300">{description}</p>
  </article>
);

const renderItems = () =>
  items.map((item) => <ColumnCard key={item.title} {...item} />);

export const Default: Story = {
  args: {
    columns: "3",
    gap: "6",
  },
  render: (args) => (
    <StorySection>
      <Columns {...args}>{renderItems()}</Columns>
    </StorySection>
  ),
};

export const WidthBased: Story = {
  render: () => (
    <StorySection>
      <Columns columns="md" gap="6">
        {renderItems()}
      </Columns>
    </StorySection>
  ),
};

export const Responsive: Story = {
  render: () => (
    <StorySection>
      <Columns columns="1" responsive={{ sm: "2", lg: "3" }} gap="6" gapY="8">
        {renderItems()}
      </Columns>
    </StorySection>
  ),
};

export const GapControl: Story = {
  render: () => (
    <StorySection>
      <Columns columns="3" gap="2" gapX="8">
        {renderItems()}
      </Columns>
    </StorySection>
  ),
};
