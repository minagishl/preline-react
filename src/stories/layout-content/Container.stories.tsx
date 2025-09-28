import type { Meta, StoryObj } from "@storybook/react-vite";
import Container, {
  type ContainerProps,
} from "../../components/layout/Container";

const meta: Meta<typeof Container> = {
  title: "Layout & Content/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    breakpoint: {
      control: { type: "select" },
      options: ["base", "sm", "md", "lg", "xl", "2xl"],
    },
    centered: {
      control: "boolean",
    },
    paddingX: {
      control: { type: "select" },
      options: ["none", "2", "4", "6", "8"],
    },
    fluid: {
      control: "boolean",
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

type Story = StoryObj<ContainerProps>;

const ExampleBlock = ({ label }: { label: string }) => (
  <div className="rounded-lg border border-dashed border-blue-300 bg-blue-50 p-6 text-sm font-medium text-blue-900 shadow-sm dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100">
    {label}
  </div>
);

export const Default: Story = {
  args: {},
  render: (args) => (
    <Container {...args}>
      <ExampleBlock label="The container centers content and applies responsive max-widths." />
    </Container>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <div className="space-y-6">
      <Container breakpoint="base">
        <ExampleBlock label="Default container (applies at every breakpoint)." />
      </Container>
      <Container breakpoint="md">
        <ExampleBlock label="Fluid until md breakpoint, then constrained." />
      </Container>
      <Container breakpoint="xl">
        <ExampleBlock label="Fluid until xl breakpoint, then constrained." />
      </Container>
    </div>
  ),
};

export const Fluid: Story = {
  render: () => (
    <Container fluid paddingX="6">
      <ExampleBlock label="Fluid container spans the full available width." />
    </Container>
  ),
};

export const CustomPadding: Story = {
  render: () => (
    <div className="space-y-4">
      <Container paddingX="2">
        <ExampleBlock label={'paddingX="2" (px-2)'} />
      </Container>
      <Container paddingX="8">
        <ExampleBlock label={'paddingX="8" (px-8)'} />
      </Container>
    </div>
  ),
};
