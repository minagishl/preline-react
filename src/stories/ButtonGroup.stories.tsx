import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonGroup, { ButtonGroupProps } from "../components/ButtonGroup";

const meta: Meta<ButtonGroupProps> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    vertical: {
      control: "boolean",
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<ButtonGroupProps>;

export const Default: Story = {
  args: {
    children: (
      <ButtonGroup>
        <ButtonGroup.Button>Years</ButtonGroup.Button>
        <ButtonGroup.Button>Months</ButtonGroup.Button>
        <ButtonGroup.Button>Date</ButtonGroup.Button>
      </ButtonGroup>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <ButtonGroup.Button size="sm">Small</ButtonGroup.Button>
        <ButtonGroup.Button size="sm">Small</ButtonGroup.Button>
        <ButtonGroup.Button size="sm">Small</ButtonGroup.Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroup.Button size="md">Default</ButtonGroup.Button>
        <ButtonGroup.Button size="md">Default</ButtonGroup.Button>
        <ButtonGroup.Button size="md">Default</ButtonGroup.Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroup.Button size="lg">Large</ButtonGroup.Button>
        <ButtonGroup.Button size="lg">Large</ButtonGroup.Button>
        <ButtonGroup.Button size="lg">Large</ButtonGroup.Button>
      </ButtonGroup>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    vertical: true,
    children: (
      <ButtonGroup vertical>
        <ButtonGroup.Button>Item 1</ButtonGroup.Button>
        <ButtonGroup.Button>Item 2</ButtonGroup.Button>
        <ButtonGroup.Button>Item 3</ButtonGroup.Button>
      </ButtonGroup>
    ),
  },
};
