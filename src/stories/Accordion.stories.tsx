import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionItemProps } from "../components/Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const accordionItems: AccordionItemProps[] = [
  {
    id: "1",
    title: "Accordion #1",
    content: (
      <>
        <em>This is the first item&apos;s accordion body.</em> It is hidden by
        default, until the collapse plugin adds the appropriate classes that we
        use to style each element. These classes control the overall appearance,
        as well as the showing and hiding via CSS transitions.
      </>
    ),
    defaultOpen: true,
  },
  {
    id: "2",
    title: "Accordion #2",
    content: (
      <>
        <em>This is the second item&apos;s accordion body.</em> It is hidden by
        default, until the collapse plugin adds the appropriate classes that we
        use to style each element. These classes control the overall appearance,
        as well as the showing and hiding via CSS transitions.
      </>
    ),
  },
  {
    id: "3",
    title: "Accordion #3",
    content: (
      <>
        <em>This is the third item&apos;s accordion body.</em> It is hidden by
        default, until the collapse plugin adds the appropriate classes that we
        use to style each element. These classes control the overall appearance,
        as well as the showing and hiding via CSS transitions.
      </>
    ),
  },
];

export const Default: Story = {
  args: {
    items: accordionItems,
  },
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <Accordion {...args} />
    </div>
  ),
};

export const AlwaysOpen: Story = {
  args: {
    items: accordionItems,
    alwaysOpen: true,
  },
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <Accordion {...args} />
    </div>
  ),
};

export const NoArrow: Story = {
  args: {
    items: accordionItems,
    noArrow: true,
  },
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <Accordion {...args} />
    </div>
  ),
};
