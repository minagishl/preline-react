import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  AdvancedDatepicker,
  AdvancedRangeSlider,
  Chart,
  Clipboard,
  Confetti,
  Datamap,
  Datatable,
  DragAndDrop,
  FileUploader,
  Map,
  WYSIWYGEditor,
} from "../../components/ThirdParty";

const meta = {
  title: "Integrations/Preline optional plugins",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inputs: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      <AdvancedRangeSlider defaultValue={45} />
      <AdvancedDatepicker label="Delivery date" />
      <Clipboard value="Copied from Preline React" />
    </div>
  ),
};

export const Visualizations: Story = {
  render: () => (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <Chart title="Monthly signups">
        <div className="bg-primary/10 h-40 rounded" />
      </Chart>
      <Datamap title="Regional activity" />
    </div>
  ),
};

export const DataAndFiles: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      <Datatable>
        <tbody>
          <tr>
            <td className="p-3">Demo row</td>
          </tr>
        </tbody>
      </Datatable>
      <DragAndDrop onFiles={() => undefined} />
      <FileUploader label="Choose a file" />
      <Map title="Map placeholder" />
    </div>
  ),
};

export const EditorAndConfetti: Story = {
  render: function Render() {
    const [value, setValue] = useState("Start writing here...");
    return (
      <div className="max-w-xl space-y-4">
        <WYSIWYGEditor value={value} onChange={setValue} />
        <Confetti onTrigger={() => window.alert("Celebration triggered")}>
          Celebrate
        </Confetti>
      </div>
    );
  },
};
