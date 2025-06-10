import React, { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

// --- Sub-components ---

// --- Avatar ---
interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
const Avatar: FC<AvatarProps> = ({ className, ...props }) => {
  const avatarClasses = classNames(
    "inline-block size-9 rounded-full",
    className,
  );
  return <img className={avatarClasses} {...props} />;
};
Avatar.displayName = "ChatBubble.Avatar";

interface AvatarInitialsProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}
const AvatarInitials: FC<AvatarInitialsProps> = ({
  className,
  children,
  ...props
}) => {
  const avatarClasses = classNames(
    "shrink-0 inline-flex items-center justify-center size-9 rounded-full bg-gray-600",
    className,
  );
  return (
    <span className={avatarClasses} {...props}>
      <span className="text-sm font-medium text-white">{children}</span>
    </span>
  );
};
AvatarInitials.displayName = "ChatBubble.AvatarInitials";

// --- Content ---
type ContentVariant = "default" | "primary";
interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ContentVariant;
  children: ReactNode;
}
const Content: FC<ContentProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const contentClasses = classNames(
    "rounded-2xl p-4",
    {
      "bg-white border border-gray-200 text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white":
        variant === "default",
      "inline-block bg-blue-600 text-white shadow-2xs": variant === "primary",
    },
    className,
  );

  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};
Content.displayName = "ChatBubble.Content";

// --- Footer ---
type Status = "sent" | "not-sent";
interface FooterProps extends HTMLAttributes<HTMLSpanElement> {
  status?: Status;
  children: ReactNode;
}

const SentIcon = () => (
  <svg
    className="size-3 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 7 17l-5-5"></path>
    <path d="m22 10-7.5 7.5L13 16"></path>
  </svg>
);

const NotSentIcon = () => (
  <svg
    className="size-3 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" x2="12" y1="8" y2="12"></line>
    <line x1="12" x2="12.01" y1="16" y2="16"></line>
  </svg>
);

const Footer: FC<FooterProps> = ({ className, status, children, ...props }) => {
  const footerClasses = classNames(
    "mt-1.5 flex items-center gap-x-1 text-xs",
    {
      "text-gray-500 dark:text-neutral-500": status === "sent",
      "text-red-500": status === "not-sent",
    },
    className,
  );

  return (
    <span className={footerClasses} {...props}>
      {status === "sent" && <SentIcon />}
      {status === "not-sent" && <NotSentIcon />}
      {children}
    </span>
  );
};
Footer.displayName = "ChatBubble.Footer";

// --- Bubble (list item) ---
type BubbleAlign = "left" | "right";
interface BubbleProps extends HTMLAttributes<HTMLLIElement> {
  align?: BubbleAlign;
  children: ReactNode;
}
const Bubble: FC<BubbleProps> = ({
  className,
  align = "left",
  children,
  ...props
}) => {
  const bubbleClasses = classNames(
    "max-w-lg flex gap-x-2 sm:gap-x-4",
    {
      "ms-auto justify-end": align === "right",
    },
    className,
  );
  return (
    <li className={bubbleClasses} {...props}>
      {children}
    </li>
  );
};
Bubble.displayName = "ChatBubble.Bubble";

// --- Main ChatBubble component ---
export interface ChatBubbleProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

type ChatBubbleComponent = FC<ChatBubbleProps> & {
  Bubble: FC<BubbleProps>;
  Content: FC<ContentProps>;
  Avatar: FC<AvatarProps>;
  AvatarInitials: FC<AvatarInitialsProps>;
  Footer: FC<FooterProps>;
};

const ChatBubble: ChatBubbleComponent = ({ className, children, ...props }) => {
  const chatClasses = classNames("space-y-5", className);
  return (
    <ul className={chatClasses} {...props}>
      {children}
    </ul>
  );
};

ChatBubble.Bubble = Bubble;
ChatBubble.Content = Content;
ChatBubble.Avatar = Avatar;
ChatBubble.AvatarInitials = AvatarInitials;
ChatBubble.Footer = Footer;

export default ChatBubble;
