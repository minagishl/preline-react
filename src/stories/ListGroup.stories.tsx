import type { Meta, StoryObj } from "@storybook/react-vite";
import ListGroup, { ListGroupItem } from "../components/ListGroup";

const meta = {
  title: "Components/List Group",
  component: ListGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ListGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <ListGroup>
      <ListGroupItem>Account settings</ListGroupItem>
      <ListGroupItem>Notification preferences</ListGroupItem>
      <ListGroupItem>Team members</ListGroupItem>
    </ListGroup>
  ),
};
