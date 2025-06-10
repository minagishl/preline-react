import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "../components/Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Badge component with various styles and features.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "The content of the badge",
    },
    color: {
      control: "select",
      options: ["dark", "gray", "teal", "blue", "red", "yellow", "white"],
      description: "Color of the badge",
    },
    variant: {
      control: "select",
      options: ["solid", "soft", "outline", "white"],
      description: "Visual style of the badge",
    },
    shape: {
      control: "select",
      options: ["rounded", "pill"],
      description: "Shape of the badge",
    },
    onRemove: {
      action: "removed",
      description: "Callback function when the remove button is clicked",
    },
    indicator: {
      control: "boolean",
      description: "Show an indicator dot inside the badge",
    },
  },
  args: {
    children: "Badge",
    onRemove: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SolidColors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} color="dark" variant="solid" />
      <Badge {...args} color="gray" variant="solid" />
      <Badge {...args} color="teal" variant="solid" />
      <Badge {...args} color="blue" variant="solid" />
      <Badge {...args} color="red" variant="solid" />
      <Badge {...args} color="yellow" variant="solid" />
      <Badge {...args} color="white" variant="solid" />
    </div>
  ),
};

export const SoftColors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} color="dark" variant="soft" />
      <Badge {...args} color="gray" variant="soft" />
      <Badge {...args} color="teal" variant="soft" />
      <Badge {...args} color="blue" variant="soft" />
      <Badge {...args} color="red" variant="soft" />
      <Badge {...args} color="yellow" variant="soft" />
      <Badge {...args} color="white" variant="soft" />
    </div>
  ),
};

export const OutlineColors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} color="dark" variant="outline" />
      <Badge {...args} color="gray" variant="outline" />
      <Badge {...args} color="teal" variant="outline" />
      <Badge {...args} color="blue" variant="outline" />
      <Badge {...args} color="red" variant="outline" />
      <Badge {...args} color="yellow" variant="outline" />
      <Badge {...args} color="white" variant="outline" />
    </div>
  ),
};

export const WhiteVariant: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} variant="white" shape="rounded" />
      <Badge {...args} variant="white" shape="pill" />
    </div>
  ),
};

export const WithIndicator: Story = {
  args: {
    indicator: true,
    variant: "soft",
    color: "blue",
  },
};

export const WithRemoveButton: Story = {
  args: {
    variant: "soft",
    color: "blue",
    onRemove: () => console.log("Remove Mark"),
  },
  argTypes: {
    onRemove: {
      action: "removed",
      description: "Callback function when the remove button is clicked",
    },
  },
};

export const WithAvatar: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <div className="inline-flex flex-nowrap items-center bg-white border border-gray-200 rounded-full p-1.5 pe-3 dark:bg-neutral-900 dark:border-neutral-700">
        <img
          className="me-1.5 inline-block size-6 rounded-full"
          src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Avatar"
        />
        <div className="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
          Christina
        </div>
      </div>

      <div className="inline-flex flex-nowrap items-center bg-white border border-gray-200 rounded-full p-1.5 dark:bg-neutral-900 dark:border-neutral-700">
        <img
          className="me-1.5 inline-block size-6 rounded-full"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Avatar"
        />
        <div className="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
          Mark
        </div>
        <button
          type="button"
          className="ms-2.5 inline-flex justify-center items-center size-5 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-hidden focus:ring-2 focus:ring-gray-400 dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer"
          onClick={() => console.log("Remove Mark")}
        >
          <span className="sr-only">Remove badge</span>
          <svg
            className="shrink-0 size-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  ),
};
