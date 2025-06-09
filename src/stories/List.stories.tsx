import type { Meta, StoryObj } from "@storybook/react-vite";
import { List, ListProps } from "../components/List";

const meta: Meta<ListProps> = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["disc", "decimal", "none", "inline", "checked"],
    },
    as: {
      control: "select",
      options: ["ul", "ol"],
    },
    markerColor: {
      control: "text",
    },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<ListProps>;

const listItems = [
  "Now this is a story all about how, my life got flipped turned upside down",
  "And I like to take a minute and sit right here",
  "I'll tell you how I became the prince of a town called Bel-Air",
];

export const ListStyleType: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <div>
        <span className="font-medium text-sm text-gray-500 font-mono mb-3 dark:text-neutral-400">
          list-disc
        </span>
        <List variant="disc">
          {listItems.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      </div>
      <div>
        <span className="font-medium text-sm text-gray-500 font-mono mb-3 dark:text-neutral-400">
          list-decimal
        </span>
        <List as="ol" variant="decimal">
          {listItems.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      </div>
      <div>
        <span className="font-medium text-sm text-gray-500 font-mono mb-3 dark:text-neutral-400">
          list-none
        </span>
        <List variant="none">
          {listItems.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      </div>
    </div>
  ),
};

export const MarkerColor: Story = {
  args: {
    variant: "disc",
    markerColor: true,
    className: "ps-5 space-y-2 text-sm",
    children: (
      <>
        <List.Item>FAQ</List.Item>
        <List.Item>License</List.Item>
        <List.Item>Terms & Conditions</List.Item>
      </>
    ),
  },
};

export const Separator: Story = {
  args: {
    variant: "inline",
    children: (
      <>
        <List.Item>FAQ</List.Item>
        <List.Item>License</List.Item>
        <List.Item>Terms & Conditions</List.Item>
      </>
    ),
  },
};

const checkedItems = ["FAQ", "License", "Terms & Conditions"];

export const CheckedStyle: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <List variant="checked">
        {checkedItems.map((item, index) => (
          <List.Item key={index}>
            <List.Icon variant="simple" />
            <span className="text-gray-800 dark:text-neutral-400">{item}</span>
          </List.Item>
        ))}
      </List>
      <List variant="checked">
        {checkedItems.map((item, index) => (
          <List.Item key={index}>
            <List.Icon variant="circled" />
            <span className="text-gray-800 dark:text-neutral-400">{item}</span>
          </List.Item>
        ))}
      </List>
      <List variant="checked">
        {checkedItems.map((item, index) => (
          <List.Item key={index}>
            <List.Icon variant="filled" />
            <span className="text-gray-800 dark:text-neutral-400">{item}</span>
          </List.Item>
        ))}
      </List>
    </div>
  ),
};

const colors: (
  | "dark"
  | "gray"
  | "green"
  | "blue"
  | "red"
  | "yellow"
  | "light"
)[] = ["dark", "gray", "green", "blue", "red", "yellow", "light"];

export const CheckedColorVariations: Story = {
  render: () => (
    <div className="flex items-start gap-8 p-4 rounded-lg">
      <List variant="checked">
        {colors.map((color) => (
          <List.Item key={color}>
            <List.Icon variant="simple" color={color} />
            <span className="text-gray-800 dark:text-white capitalize">
              {color}
            </span>
          </List.Item>
        ))}
      </List>
      <List variant="checked">
        {colors.map((color) => (
          <List.Item key={color}>
            <List.Icon variant="circled" color={color} />
            <span className="text-gray-800 dark:text-white capitalize">
              {color}
            </span>
          </List.Item>
        ))}
      </List>
      <List variant="checked">
        {colors.map((color) => (
          <List.Item key={color}>
            <List.Icon variant="filled" color={color} />
            <span className="text-gray-800 dark:text-white capitalize">
              {color}
            </span>
          </List.Item>
        ))}
      </List>
    </div>
  ),
};
