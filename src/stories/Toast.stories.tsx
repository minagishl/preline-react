import React, { FC, useState, HTMLAttributes } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Toast,
  ToastProps,
  ToastColor,
  ToastVariant,
} from "../components/Toast";
import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";

const variants: ToastVariant[] = ["default", "solid", "soft"];
const colors: ToastColor[] = ["dark", "gray", "red", "yellow", "blue", "teal"];

const InfoIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    className="shrink-0 size-4 text-blue-500 mt-0.5"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
  </svg>
);

const SuccessIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    className="shrink-0 size-4 text-teal-500 mt-0.5"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
  </svg>
);

const ErrorIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    className="shrink-0 size-4 text-red-500 mt-0.5"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
  </svg>
);

const WarningIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    className="shrink-0 size-4 text-yellow-500 mt-0.5"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
  </svg>
);

const NotificationIcon: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    className="size-5 text-gray-600 mt-1 dark:text-neutral-400"
    {...props}
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
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
      <div className="flex flex-col items-center gap-4 min-h-48">
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
      <div className="flex p-4 w-80">
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
        <div className="flex p-4 w-80">
          <InfoIcon />
          <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            This is a normal message.
          </p>
        </div>
      </Toast>
      <Toast>
        <div className="flex p-4 w-80">
          <SuccessIcon />
          <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            This is a success message.
          </p>
        </div>
      </Toast>
      <Toast>
        <div className="flex p-4 w-80">
          <ErrorIcon />
          <p className="ms-3 text-sm text-gray-700 dark:text-neutral-400">
            This is an error message.
          </p>
        </div>
      </Toast>
      <Toast>
        <div className="flex p-4 w-80">
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
        <div className="flex p-4 w-80">
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
      <div className="flex flex-col items-center gap-4 min-h-48">
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
      <div className="flex p-4 w-80">
        <div className="shrink-0">
          <NotificationIcon />
        </div>
        <div className="ms-4">
          <h3 className="text-gray-800 font-semibold dark:text-white">
            App notifications
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            Notifications may include alerts, sounds and icon badges.
          </div>
          <div className="mt-4">
            <div className="flex gap-x-3">
              <button
                type="button"
                className="text-blue-600 decoration-2 hover:underline font-medium text-sm focus:outline-hidden focus:underline dark:text-blue-500"
              >
                Don&apos;t allow
              </button>
              <button
                type="button"
                className="text-blue-600 decoration-2 hover:underline font-medium text-sm focus:outline-hidden focus:underline dark:text-blue-500"
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
      <div className="flex flex-col items-center gap-4 min-h-48">
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
      <div className="relative flex p-4 w-80">
        <div className="shrink-0">
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          />
          <div className="absolute top-3 end-3">
            <Toast.CloseButton />
          </div>
        </div>
        <div className="ms-4 me-5">
          <h3 className="text-gray-800 font-medium text-sm dark:text-white">
            <span className="font-semibold">James</span> mentioned you in a
            comment
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            Nice work! Keep it up!
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="text-blue-600 decoration-2 hover:underline font-medium text-sm focus:outline-hidden focus:underline dark:text-blue-500"
            >
              Mark as read
            </button>
          </div>
        </div>
      </div>
    ),
  },
};
