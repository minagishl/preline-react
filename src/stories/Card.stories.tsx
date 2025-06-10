import type { Meta, StoryObj } from "@storybook/react-vite";
import Card, { CardProps } from "../components/Card";
import Button from "../components/Button";

const meta: Meta<CardProps> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    hoverEffect: { control: "boolean" },
    bordered: { control: "boolean" },
    href: { control: "text" },
    children: { control: false },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<CardProps>;

const imageUrl =
  "https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80";

export const Default: Story = {
  args: {
    className: "max-w-xs",
    children: (
      <>
        <Card.Image src={imageUrl} alt="Card Image" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text className="mt-1">
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
          <Button color="blue" className="mt-2">
            Go somewhere
          </Button>
        </Card.Body>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    className: "max-w-xs",
    children: (
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Subtitle>Card subtitle</Card.Subtitle>
        <Card.Text className="mt-2">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </Card.Text>
        <Card.Link href="#">
          Card link
          <svg
            className="size-4 shrink-0"
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
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </Card.Link>
      </Card.Body>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    className: "max-w-xs",
    children: (
      <>
        <Card.Header>
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
            Featured
          </p>
        </Card.Header>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text className="mt-2">
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Card.Link href="#">Card link</Card.Link>
        </Card.Body>
        <Card.Footer>
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
            Last updated 5 mins ago
          </p>
        </Card.Footer>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    ...Simple.args,
    bordered: true,
  },
};

export const HoverEffect: Story = {
  args: {
    className: "max-w-xs",
    hoverEffect: true,
    href: "#",
    children: (
      <>
        <Card.Image src={imageUrl} alt="Card Image" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text className="mt-1">
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
        </Card.Body>
      </>
    ),
  },
};
