import type { Meta, StoryObj } from "@storybook/react-vite";
import Nav, { NavLink } from "../../components/Nav";
import Sidebar from "../../components/Sidebar";

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Sidebar className="w-56 rounded-lg">
      <Nav className="flex-col items-stretch">
        <NavLink href="#overview" active>
          Overview
        </NavLink>
        <NavLink href="#settings">Settings</NavLink>
      </Nav>
    </Sidebar>
  ),
};
