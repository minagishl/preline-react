import type { Meta, StoryObj } from "@storybook/react-vite";
import AdvancedSelect from "../../components/AdvancedSelect";
const meta = {
  title: "Forms/Advanced Select",
  component: AdvancedSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof AdvancedSelect>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <AdvancedSelect defaultValue="starter">
      <option value="starter">Starter</option>
      <option value="team">Team</option>
    </AdvancedSelect>
  ),
};
