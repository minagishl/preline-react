import type { Meta, StoryObj } from "@storybook/react-vite";
import Navbar from "../../components/Navbar";
import Nav, { NavLink } from "../../components/Nav";

const meta = {
  title: "Navigation/Navbar",
  component: Navbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Navbar className="rounded-lg px-3 py-2">
      <Nav>
        <NavLink href="#home" active>
          Home
        </NavLink>
        <NavLink href="#docs">Docs</NavLink>
        <NavLink href="#pricing">Pricing</NavLink>
      </Nav>
    </Navbar>
  ),
};
