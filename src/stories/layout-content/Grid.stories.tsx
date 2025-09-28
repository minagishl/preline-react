import type { Meta, StoryObj } from "@storybook/react-vite";
import Grid, {
  type GridItemProps,
  type GridProps,
} from "../../components/layout/Grid";

const meta: Meta<typeof Grid> = {
  title: "Layout & Content/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    inline: {
      control: "boolean",
    },
    columns: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "none"],
    },
    gap: {
      control: { type: "select" },
      options: [
        undefined,
        "0",
        "px",
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
        "16",
        "20",
      ],
    },
    flow: {
      control: { type: "select" },
      options: [undefined, "row", "col", "dense", "row-dense", "col-dense"],
    },
    rows: {
      control: { type: "select" },
      options: [undefined, 1, 2, 3, 4, 5, 6, "none"],
    },
    columnsResponsive: { control: false },
    rowsResponsive: { control: false },
    flowResponsive: { control: false },
    gapResponsive: { control: false },
    gapX: {
      control: { type: "select" },
      options: [undefined, "0", "px", "1", "2", "3", "4", "6", "8", "10"],
    },
    gapY: {
      control: { type: "select" },
      options: [undefined, "0", "px", "1", "2", "3", "4", "6", "8", "10"],
    },
    gapXResponsive: { control: false },
    gapYResponsive: { control: false },
    justifyItems: {
      control: { type: "select" },
      options: [undefined, "start", "end", "center", "stretch"],
    },
    alignItems: {
      control: { type: "select" },
      options: [undefined, "start", "end", "center", "stretch"],
    },
    justifyItemsResponsive: { control: false },
    alignItemsResponsive: { control: false },
    as: { control: false },
    className: { control: false },
    children: { control: false },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<GridProps>;

const DemoItem = ({ label, ...rest }: GridItemProps & { label: string }) => (
  <Grid.Item
    className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-600/60 dark:bg-slate-700/20 dark:text-slate-200"
    {...rest}
  >
    {label}
  </Grid.Item>
);

export const Playground: Story = {
  args: {
    columns: 3,
    gap: "4",
  },
  render: (args) => (
    <Grid {...args}>
      <DemoItem label="01" />
      <DemoItem label="02" />
      <DemoItem label="03" />
      <DemoItem label="04" />
      <DemoItem label="05" />
      <DemoItem label="06" />
    </Grid>
  ),
};

export const ColumnSpanning: Story = {
  render: () => (
    <Grid columns={3} gap="4">
      <DemoItem label="01" />
      <DemoItem label="02" />
      <DemoItem label="03" />
      <DemoItem label="04" colSpan={2} />
      <DemoItem label="05" />
      <DemoItem label="06" />
      <DemoItem label="07" colSpan={2} />
    </Grid>
  ),
};

export const LinePlacement: Story = {
  render: () => (
    <Grid columns={6} gap="4">
      <DemoItem label="A" colStart={2} colSpan={4} />
      <DemoItem label="B" colStart={1} colEnd={3} />
      <DemoItem label="C" colEnd={7} colSpan={2} />
      <DemoItem label="D" colStart={1} colEnd={7} />
    </Grid>
  ),
};

export const RowsAndFlow: Story = {
  render: () => (
    <Grid columns={3} rows={3} gap="4" flow="row-dense">
      <DemoItem label="01" colSpan={2} />
      <DemoItem label="02" colSpan={2} />
      <DemoItem label="03" />
      <DemoItem label="04" />
      <DemoItem label="05" />
    </Grid>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <Grid
      columns={1}
      columnsResponsive={{ sm: 2, md: 3, lg: 4 }}
      gap="4"
      gapYResponsive={{ sm: "6" }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <DemoItem key={index} label={`Item ${index + 1}`} />
      ))}
    </Grid>
  ),
};
