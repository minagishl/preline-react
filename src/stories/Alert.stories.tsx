import type { Meta, StoryObj } from "@storybook/react-vite";
import Alert from "../components/Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Alert component with multiple variants and soft/solid styling options.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "dark",
        "secondary",
        "info",
        "success",
        "danger",
        "warning",
        "light",
      ],
      description: "The visual style variant of the alert",
    },
    soft: {
      control: "boolean",
      description: "Toggle between soft (outlined) and solid styling",
    },
    border: {
      control: "select",
      options: [null, "top", "left"],
      description: "Border position option - top or left border",
    },
    children: {
      control: "text",
      description: "The content to display inside the alert",
    },
  },
  args: {
    children: "This is an alert message",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    variant: "info",
    soft: false,
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    children: "Dark alert! You should check in on some of those fields below.",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children:
      "Secondary alert! You should check in on some of those fields below.",
  },
};

// Variant stories
export const Info: Story = {
  args: {
    variant: "info",
    children: "Info alert! You should check in on some of those fields below.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children:
      "Success alert! You should check in on some of those fields below.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children:
      "Danger alert! You should check in on some of those fields below.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children:
      "Warning alert! You should check in on some of those fields below.",
  },
};

export const Light: Story = {
  args: {
    variant: "light",
    children: "Light alert! You should check in on some of those fields below.",
  },
};

// Soft variants
export const SoftDark: Story = {
  args: {
    variant: "dark",
    soft: true,
    children: "Dark alert! You should check in on some of those fields below.",
  },
};

export const SoftSecondary: Story = {
  args: {
    variant: "secondary",
    soft: true,
    children:
      "Secondary alert! You should check in on some of those fields below.",
  },
};

export const SoftInfo: Story = {
  args: {
    variant: "info",
    soft: true,
    children: "Info alert! You should check in on some of those fields below.",
  },
};

export const SoftSuccess: Story = {
  args: {
    variant: "success",
    soft: true,
    children:
      "Success alert! You should check in on some of those fields below.",
  },
};

export const SoftDanger: Story = {
  args: {
    variant: "danger",
    soft: true,
    children:
      "Danger alert! You should check in on some of those fields below.",
  },
};

export const SoftWarning: Story = {
  args: {
    variant: "warning",
    soft: true,
    children:
      "Warning alert! You should check in on some of those fields below.",
  },
};

export const SoftLight: Story = {
  args: {
    variant: "light",
    soft: true,
    children: "Light alert! You should check in on some of those fields below.",
  },
};

// Complex content example
export const WithComplexContent: Story = {
  args: {
    variant: "info",
    children: (
      <div>
        <h4 className="font-bold mb-1">Alert with Rich Content</h4>
        <p>You can include any React content inside the alert component.</p>
        <ul className="list-disc list-inside mt-2">
          <li>Lists</li>
          <li>Links</li>
          <li>Other components</li>
        </ul>
      </div>
    ),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="dark">
        Dark alert! You should check in on some of those fields below.
      </Alert>
      <Alert variant="secondary">
        Secondary alert! You should check in on some of those fields below.
      </Alert>
      <Alert variant="info">
        Info alert! You should check in on some of those fields below.
      </Alert>
      <Alert variant="success">
        Success alert! You should check in on some of those fields below.
      </Alert>
      <Alert variant="danger">
        Danger alert! You should check in on some of those fields below.
      </Alert>
      <Alert variant="warning">
        Warning alert! You should check in on some of those fields below.
      </Alert>
      <Alert variant="light">
        Light alert! You should check in on some of those fields below.
      </Alert>
    </div>
  ),
};

export const AllSoftVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="dark" soft>
        Soft dark alert message
      </Alert>
      <Alert variant="danger" soft>
        Soft danger alert message
      </Alert>
      <Alert variant="info" soft>
        Soft info alert message
      </Alert>
      <Alert variant="secondary" soft>
        Soft secondary alert message
      </Alert>
      <Alert variant="success" soft>
        Soft success alert message
      </Alert>
      <Alert variant="warning" soft>
        Soft warning alert message
      </Alert>
      <Alert variant="light" soft>
        Soft light alert message
      </Alert>
    </div>
  ),
};

// TODO: Allow it to work without specifying a style.

// Border options showcase
export const BorderOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Top Border</h3>
        <Alert
          variant="success"
          border="top"
          className="!bg-teal-50 !text-gray-700 dark:!text-neutral-400"
        >
          Soft success alert with top border
        </Alert>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Left Border</h3>
        <Alert
          variant="danger"
          border="left"
          className="rounded-none !bg-red-50 !text-gray-700 dark:!text-neutral-400"
        >
          Soft danger alert with left border
        </Alert>
      </div>
    </div>
  ),
};
