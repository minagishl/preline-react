import type { Meta, StoryObj } from "@storybook/react-vite";
import Modal from "../../components/overlays/Modal";
import Button from "../../components/Button";

const meta: Meta<typeof Modal> = {
  title: "Overlays/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal.Content>;

const DefaultModalContent = () => (
  <>
    <Modal.Header>
      <Modal.Title>Modal title</Modal.Title>
      <Modal.CloseButton />
    </Modal.Header>
    <Modal.Body>
      <p className="mt-1 text-gray-800 dark:text-neutral-400">
        This is a wider card with supporting text below as a natural lead-in to
        additional content.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Modal.Close>
        <Button variant="white" color="dark" size="sm">
          Close
        </Button>
      </Modal.Close>
      <Button size="sm">Save changes</Button>
    </Modal.Footer>
  </>
);

export const Default: Story = {
  render: (args) => (
    <Modal>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content {...args}>
        <DefaultModalContent />
      </Modal.Content>
    </Modal>
  ),
  args: {
    size: "sm",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Modal>
        <Modal.Trigger>
          <Button>Small</Button>
        </Modal.Trigger>
        <Modal.Content {...args} size="sm">
          <DefaultModalContent />
        </Modal.Content>
      </Modal>
      <Modal>
        <Modal.Trigger>
          <Button>Medium</Button>
        </Modal.Trigger>
        <Modal.Content {...args} size="md">
          <DefaultModalContent />
        </Modal.Content>
      </Modal>
      <Modal>
        <Modal.Trigger>
          <Button>Large</Button>
        </Modal.Trigger>
        <Modal.Content {...args} size="lg">
          <DefaultModalContent />
        </Modal.Content>
      </Modal>
      <Modal>
        <Modal.Trigger>
          <Button>Extra Large</Button>
        </Modal.Trigger>
        <Modal.Content {...args} size="xl">
          <DefaultModalContent />
        </Modal.Content>
      </Modal>
    </div>
  ),
};

export const Animations: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Modal>
        <Modal.Trigger>
          <Button>Slide Down</Button>
        </Modal.Trigger>
        <Modal.Content {...args} animation="slide-down">
          <DefaultModalContent />
        </Modal.Content>
      </Modal>
      <Modal>
        <Modal.Trigger>
          <Button>Slide Up</Button>
        </Modal.Trigger>
        <Modal.Content {...args} animation="slide-up">
          <DefaultModalContent />
        </Modal.Content>
      </Modal>
      <Modal>
        <Modal.Trigger>
          <Button>Scale</Button>
        </Modal.Trigger>
        <Modal.Content {...args} animation="scale">
          <DefaultModalContent />
        </Modal.Content>
      </Modal>
    </div>
  ),
  args: {
    centered: true,
  },
};

export const StaticBackdrop: Story = {
  render: (args) => (
    <Modal>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content {...args}>
        <DefaultModalContent />
      </Modal.Content>
    </Modal>
  ),
  args: {
    staticBackdrop: true,
  },
};

export const VerticallyCentered: Story = {
  render: (args) => (
    <Modal>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content {...args}>
        <DefaultModalContent />
      </Modal.Content>
    </Modal>
  ),
  args: {
    centered: true,
  },
};

export const ScrollingBehavior: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Modal>
        <Modal.Trigger>
          <Button>Scroll Inside</Button>
        </Modal.Trigger>
        <Modal.Content {...args} scroll="inside">
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Some text
                  </h3>
                  <p className="mt-1 text-gray-800 dark:text-neutral-400">
                    This is some text description. This is some text
                    description. This is some text description. This is some
                    text description.
                  </p>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>
              <Button color="white">Close</Button>
            </Modal.Close>
            <Button>Save changes</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal>
        <Modal.Trigger>
          <Button>Scroll Outside</Button>
        </Modal.Trigger>
        <Modal.Content {...args} scroll="outside">
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Some text
                  </h3>
                  <p className="mt-1 text-gray-800 dark:text-neutral-400">
                    This is some text description. This is some text
                    description. This is some text description. This is some
                    text description.
                  </p>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>
              <Button color="white">Close</Button>
            </Modal.Close>
            <Button>Save changes</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  ),
};
