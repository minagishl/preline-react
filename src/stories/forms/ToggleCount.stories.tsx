import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ToggleCount from "../../components/ToggleCount";
const meta = {
  title: "Forms/Toggle Count",
  component: ToggleCount,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleCount>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState(2);
    return <ToggleCount value={value} min={0} max={5} onChange={setValue} />;
  },
};
