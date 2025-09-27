import type { Meta, StoryObj } from "@storybook/react-vite";
import ChatBubble, { ChatBubbleProps } from "../components/ChatBubble";

const meta: Meta<ChatBubbleProps> = {
  title: "Components/Chat Bubble",
  component: ChatBubble,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<ChatBubbleProps>;

const avatarUrl =
  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80";

const Link = ({ href, children }: { href: string; children: string }) => (
  <a
    className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500 dark:hover:text-blue-400"
    href={href}
  >
    {children}
  </a>
);

export const Default: Story = {
  args: {
    className: "w-full max-w-2xl",
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatBubble.Bubble>
        <ChatBubble.Content className="space-y-3">
          <h2 className="font-medium">How can we help?</h2>
          <div className="space-y-1.5">
            <p className="mb-1.5 text-sm">You can ask questions like:</p>
            <ul className="list-outside list-disc space-y-1.5 ps-3.5">
              <li className="text-sm">What&apos;s Preline UI?</li>
              <li className="text-sm">
                How many Starter Pages & Examples are there?
              </li>
              <li className="text-sm">Is there a PRO version?</li>
            </ul>
          </div>
        </ChatBubble.Content>
      </ChatBubble.Bubble>
      <ChatBubble.Bubble align="right">
        <div className="grow space-y-3 text-end">
          <ChatBubble.Content variant="primary">
            <p className="text-sm">what&apos;s preline ui?</p>
          </ChatBubble.Content>
        </div>
      </ChatBubble.Bubble>
      <ChatBubble.Bubble>
        <ChatBubble.Content className="space-y-3">
          <p className="text-sm">
            Preline UI is an open-source set of prebuilt UI components based on
            the utility-first Tailwind CSS framework.
          </p>
          <div className="space-y-1.5">
            <p className="text-sm">Here&apos;re some links to get started</p>
            <ul>
              <li>
                <Link href="#">Installation Guide</Link>
              </li>
              <li>
                <Link href="#">Framework Guides</Link>
              </li>
            </ul>
          </div>
        </ChatBubble.Content>
      </ChatBubble.Bubble>
    </ChatBubble>
  ),
};

export const WithAvatar: Story = {
  args: {
    className: "w-full max-w-2xl",
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatBubble.Bubble>
        <ChatBubble.Avatar src={avatarUrl} alt="Avatar" />
        <ChatBubble.Content className="space-y-3">
          <h2 className="font-medium">How can we help?</h2>
        </ChatBubble.Content>
      </ChatBubble.Bubble>

      <ChatBubble.Bubble align="right">
        <div className="grow space-y-3 text-end">
          <ChatBubble.Content variant="primary">
            <p className="text-sm">what&apos;s preline ui?</p>
          </ChatBubble.Content>
        </div>
        <ChatBubble.AvatarInitials>AZ</ChatBubble.AvatarInitials>
      </ChatBubble.Bubble>

      <ChatBubble.Bubble>
        <ChatBubble.Avatar src={avatarUrl} alt="Avatar" />
        <ChatBubble.Content>
          <p className="text-sm">
            Preline UI is an open-source set of prebuilt UI components based on
            the utility-first Tailwind CSS framework.
          </p>
        </ChatBubble.Content>
      </ChatBubble.Bubble>
    </ChatBubble>
  ),
};

export const WithFooter: Story = {
  args: {
    className: "w-full max-w-2xl",
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatBubble.Bubble>
        <ChatBubble.Avatar src={avatarUrl} alt="Avatar" />
        <div>
          <ChatBubble.Content className="space-y-3">
            <h2 className="font-medium">How can we help?</h2>
          </ChatBubble.Content>
          <ChatBubble.Footer status="sent">Sent</ChatBubble.Footer>
        </div>
      </ChatBubble.Bubble>
      <ChatBubble.Bubble align="right">
        <div className="grow space-y-3 text-end">
          <div className="inline-flex flex-col justify-end">
            <ChatBubble.Content variant="primary">
              <p className="text-sm">what&apos;s preline ui?</p>
            </ChatBubble.Content>
            <ChatBubble.Footer status="sent">Sent</ChatBubble.Footer>
          </div>
        </div>
        <ChatBubble.AvatarInitials>AZ</ChatBubble.AvatarInitials>
      </ChatBubble.Bubble>
      <ChatBubble.Bubble>
        <ChatBubble.Avatar src={avatarUrl} alt="Avatar" />
        <div>
          <ChatBubble.Content>
            <p className="text-sm">
              Preline UI is an open-source set of prebuilt UI components based
              on the utility-first Tailwind CSS framework.
            </p>
          </ChatBubble.Content>
          <ChatBubble.Footer status="not-sent">Not sent</ChatBubble.Footer>
        </div>
      </ChatBubble.Bubble>
    </ChatBubble>
  ),
};
