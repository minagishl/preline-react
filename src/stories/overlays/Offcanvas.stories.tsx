import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import { useState } from "react";
import { Offcanvas, type OffcanvasPlacement } from "../../components/Offcanvas";

const meta = {
  title: "Overlays/Offcanvas",
  component: Offcanvas,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-[720px] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Offcanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

const triggerClassName =
  "border-primary-line bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus inline-flex items-center gap-x-2 rounded-lg border px-4 py-3 text-sm font-medium focus:outline-hidden disabled:pointer-events-none disabled:opacity-50";

function OffcanvasContent({
  onClose,
  title = "Offcanvas title",
  children,
}: {
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="border-overlay-header flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-foreground font-semibold">{title}</h3>
        <button
          type="button"
          aria-label="Close"
          className="border-surface-line bg-surface text-surface-foreground hover:bg-surface-hover focus:bg-surface-focus inline-flex size-8 items-center justify-center gap-x-2 rounded-full border focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          onClick={onClose}
        >
          <X className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
      <div className="p-4">
        {children ?? (
          <p className="text-foreground">
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </p>
        )}
      </div>
    </>
  );
}

function OffcanvasExample({
  label,
  placement,
  backdrop = true,
  bodyScroll = false,
  backdropClassName,
}: {
  label: string;
  placement?: OffcanvasPlacement;
  backdrop?: boolean;
  bodyScroll?: boolean;
  backdropClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      <Offcanvas
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
        backdrop={backdrop}
        bodyScroll={bodyScroll}
        backdropClassName={backdropClassName}
      >
        <OffcanvasContent
          onClose={() => setOpen(false)}
          title={bodyScroll ? label : undefined}
        >
          {bodyScroll ? (
            <p className="text-foreground">
              Try scrolling the rest of the page to see this option in action.
            </p>
          ) : undefined}
        </OffcanvasContent>
      </Offcanvas>
    </>
  );
}

export const Default: Story = {
  render: () => <OffcanvasExample label="Open (right) offcanvas" />,
};

export const AlternativePlacements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <OffcanvasExample label="Toggle top offcanvas" placement="top" />
      <OffcanvasExample label="Toggle left offcanvas" placement="left" />
      <OffcanvasExample label="Toggle bottom offcanvas" placement="bottom" />
    </div>
  ),
};

export const BodyScrollOptions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <OffcanvasExample
        label="Body scrolling (no backdrop)"
        bodyScroll
        backdrop={false}
      />
      <OffcanvasExample label="Body scrolling with backdrop" bodyScroll />
    </div>
  ),
};

export const CustomBackdropColor: Story = {
  render: () => (
    <OffcanvasExample
      label="Open offcanvas"
      backdropClassName="bg-primary-950/90"
    />
  ),
};
