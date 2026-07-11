import type { Meta, StoryObj } from "@storybook/react-vite";
import Table from "../components/Table";

const meta = {
  title: "Tables/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Table>
      <thead>
        <tr className="border-border border-b">
          <th className="p-3">Name</th>
          <th className="p-3">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-3">Avery</td>
          <td className="p-3">Admin</td>
        </tr>
      </tbody>
    </Table>
  ),
};
