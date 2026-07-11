import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Pagination from "../../components/Pagination";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(2);
    return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
  },
};
