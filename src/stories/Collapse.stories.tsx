import type { Meta, StoryObj } from "@storybook/react-vite";
import Collapse, { CollapseProps } from "../components/Collapse";
import Button from "../components/Button";

const meta: Meta<CollapseProps> = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultOpen: { control: "boolean" },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<CollapseProps>;

export const Default: Story = {
  args: {
    className: "w-full max-w-sm",
    children: (
      <>
        <Collapse.Button asChild>
          <Button color="blue">
            Collapse <Collapse.Icon className="text-white" />
          </Button>
        </Collapse.Button>
        <Collapse.Content>
          <div className="mt-5">
            <p className="text-gray-500 dark:text-neutral-400">
              This is a collapse body. It is hidden by default, until the
              collapse plugin adds the appropriate classes that we use to style
              each element. These classes control the overall appearance, as
              well as the showing and hiding via CSS transitions.
            </p>
          </div>
        </Collapse.Content>
      </>
    ),
  },
};

export const ShowHide: Story = {
  args: {
    className: "w-full max-w-sm",
    children: (
      <>
        <p className="text-gray-500 dark:text-neutral-400">
          Preline UI is an open-source set of prebuilt UI components based on
          the utility-first Tailwind CSS framework.
        </p>
        <Collapse.Content>
          <p className="text-gray-500 dark:text-neutral-400 mt-2">
            This is a collapse body. It is hidden by default, until the collapse
            plugin adds the appropriate classes that we use to style each
            element. These classes control the overall appearance, as well as
            the showing and hiding via CSS transitions.
          </p>
        </Collapse.Content>
        <p className="mt-2">
          <Collapse.TriggerLink closedText="Read more" openText="Read less" />
        </p>
      </>
    ),
  },
};
