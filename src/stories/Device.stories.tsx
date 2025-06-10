import type { Meta, StoryObj } from "@storybook/react-vite";
import Device, { DeviceProps } from "../components/Device";

const meta: Meta<DeviceProps> = {
  title: "Components/Device",
  component: Device,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<DeviceProps>;

const mobileImgSrc = "https://preline.co/assets/img/280x560/img1.jpg";
const browserImgSrc = "https://preline.co/assets/img/1618x1010/img1.jpg";

export const Mobile: Story = {
  render: () => (
    <Device.Mobile>
      <img
        className="max-w-full rounded-[1.25rem] h-auto"
        src={mobileImgSrc}
        alt="Mobile Placeholder"
      />
    </Device.Mobile>
  ),
};

export const Browser: Story = {
  render: () => (
    <div className="w-[768px] p-4">
      <Device.Browser url="www.preline.co">
        <img
          className="max-w-full h-auto rounded-b-lg"
          src={browserImgSrc}
          alt="Browser Placeholder"
        />
      </Device.Browser>
    </div>
  ),
};
