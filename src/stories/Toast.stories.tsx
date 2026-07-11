import React, { FC, useState, HTMLAttributes } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Toast, {
  ToastProps,
  ToastColor,
  ToastVariant,
} from "../components/Toast";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import { Bell, CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";

const variants: ToastVariant[] = ["default", "solid", "soft"];
const colors: ToastColor[] = ["dark", "gray", "red", "yellow", "blue", "teal"];

const InfoIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <Info
    className="mt-0.5 size-4 shrink-0 text-blue-500"
    {...props}
    aria-hidden="true"
  />
);

const SuccessIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <CircleCheck
    className="mt-0.5 size-4 shrink-0 text-teal-500"
    {...props}
    aria-hidden="true"
  />
);

const ErrorIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <CircleX
    className="mt-0.5 size-4 shrink-0 text-red-500"
    {...props}
    aria-hidden="true"
  />
);

const WarningIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <CircleAlert
    className="mt-0.5 size-4 shrink-0 text-yellow-500"
    {...props}
    aria-hidden="true"
  />
);

const NotificationIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <Bell
    className="mt-1 size-5 text-gray-600 dark:text-neutral-400"
    {...props}
    aria-hidden="true"
  />
);

const meta: Meta<ToastProps> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: { control: "select", options: variants },
    color: { control: "select", options: colors },
    children: { control: false },
    show: { control: "boolean" },
    onDismiss: { action: "dismissed" },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: function Render(args) {
    const [show, setShow] = useState(args.show || false);

    React.useEffect(() => {
      setShow(args.show || false);
    }, [args.show]);

    return (
      <div className="flex min-h-48 flex-col items-center gap-4">
        <Button onClick={() => setShow(true)} disabled={show}>
          Show Toast
        </Button>
        {show && (
          <Toast {...args} show={show} onDismiss={() => setShow(false)} />
        )}
      </div>
    );
  },
  args: {
    show: false,
    children: (
      <div className="flex w-80 p-4">
        <div className="shrink-0">
          <SuccessIcon />
        </div>
        <div className="ms-3">
          <p className="text-sm text-gray-700 dark:text-neutral-400">
            This is a success message.
          </p>
        </div>
      </div>
    ),
  },
};

export const BasicTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast>
        <div className="flex w-80 p-4">
          <InfoIcon />
          <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            This is a normal message.
          </p>
        </div>
      </Toast>
      <Toast>
        <div className="flex w-80 p-4">
          <SuccessIcon />
          <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            This is a success message.
          </p>
        </div>
      </Toast>
      <Toast>
        <div className="flex w-80 p-4">
          <ErrorIcon />
          <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            This is an error message.
          </p>
        </div>
      </Toast>
      <Toast>
        <div className="flex w-80 p-4">
          <WarningIcon />
          <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            This is a warning message.
          </p>
        </div>
      </Toast>
    </div>
  ),
};

const renderColorGrid = (variant: ToastVariant) => (
  <div className="grid grid-cols-1 gap-4 text-sm">
    {colors.map((color) => (
      <Toast key={variant + color} variant={variant} color={color}>
        <div className="flex w-80 p-4">
          Hello, world! This is a toast message.
          <div className="ms-auto">
            <Toast.CloseButton />
          </div>
        </div>
      </Toast>
    ))}
  </div>
);

export const SolidColors: Story = {
  name: "Colors: Solid",
  render: () => renderColorGrid("solid"),
};

export const SoftColors: Story = {
  name: "Colors: Soft",
  render: () => renderColorGrid("soft"),
};

export const WithActions: Story = {
  render: function Render(args) {
    const [show, setShow] = useState(args.show || false);

    React.useEffect(() => {
      setShow(args.show || false);
    }, [args.show]);

    return (
      <div className="flex min-h-48 flex-col items-center gap-4">
        <Button onClick={() => setShow(true)} disabled={show}>
          Show Toast
        </Button>
        {show && (
          <Toast {...args} show={show} onDismiss={() => setShow(false)} />
        )}
      </div>
    );
  },
  args: {
    show: false,
    children: (
      <div className="flex w-80 p-4">
        <div className="shrink-0">
          <NotificationIcon />
        </div>
        <div className="ms-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            App notifications
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            Notifications may include alerts, sounds and icon badges.
          </div>
          <div className="mt-4">
            <div className="flex gap-x-3">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
              >
                Don&apos;t allow
              </button>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithAvatar: Story = {
  render: function Render(args) {
    const [show, setShow] = useState(args.show || false);

    React.useEffect(() => {
      setShow(args.show || false);
    }, [args.show]);

    return (
      <div className="flex min-h-48 flex-col items-center gap-4">
        <Button onClick={() => setShow(true)} disabled={show}>
          Show Toast
        </Button>
        {show && (
          <Toast {...args} show={show} onDismiss={() => setShow(false)} />
        )}
      </div>
    );
  },
  args: {
    show: false,
    children: (
      <div className="relative flex w-80 p-4">
        <div className="shrink-0">
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          />
          <div className="absolute inset-e-3 top-3">
            <Toast.CloseButton />
          </div>
        </div>
        <div className="ms-4 me-5">
          <h3 className="text-sm font-medium text-gray-800 dark:text-white">
            <span className="font-semibold">James</span> mentioned you in a
            comment
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            Nice work! Keep it up!
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
            >
              Mark as read
            </button>
          </div>
        </div>
      </div>
    ),
  },
};
