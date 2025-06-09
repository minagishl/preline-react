import React, { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

// --- Sub-components ---

// Card.Image
interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  position?: "top" | "bottom";
}
const Image: FC<CardImageProps> = ({
  className,
  position = "top",
  ...props
}) => {
  const imageClasses = classNames(
    "w-full h-auto",
    {
      "rounded-t-xl": position === "top",
      "rounded-b-xl": position === "bottom",
    },
    className
  );
  return <img className={imageClasses} {...props} />;
};
Image.displayName = "Card.Image";

// Card.Body
type BodySize = "sm" | "md" | "lg";
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  size?: BodySize;
  children: ReactNode;
}
const Body: FC<CardBodyProps> = ({
  className,
  size = "sm",
  children,
  ...props
}) => {
  const sizeClasses: Record<BodySize, string> = {
    sm: "p-4 md:p-5",
    md: "p-4 md:p-7",
    lg: "p-4 md:p-10",
  };
  const bodyClasses = classNames(sizeClasses[size], className);
  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  );
};
Body.displayName = "Card.Body";

// Card.Title
const Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  const titleClasses = classNames(
    "text-lg font-bold text-gray-800 dark:text-white",
    className
  );
  return <h3 className={titleClasses} {...props} />;
};
Title.displayName = "Card.Title";

// Card.Subtitle
const Subtitle: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => {
  const subtitleClasses = classNames(
    "mt-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500",
    className
  );
  return <p className={subtitleClasses} {...props} />;
};
Subtitle.displayName = "Card.Subtitle";

// Card.Text
const Text: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => {
  const textClasses = classNames(
    "mt-1 text-gray-500 dark:text-neutral-400",
    className
  );
  return <p className={textClasses} {...props} />;
};
Text.displayName = "Card.Text";

// Card.Link
const Link: FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  className,
  ...props
}) => {
  const linkClasses = classNames(
    "mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-hidden focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600",
    className
  );
  return <a className={linkClasses} {...props} />;
};
Link.displayName = "Card.Link";

// Card.Header
const Header: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const headerClasses = classNames(
    "bg-gray-100 border-b border-gray-200 rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700",
    className
  );
  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};
Header.displayName = "Card.Header";

// Card.Footer
const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const footerClasses = classNames(
    "bg-gray-100 border-t border-gray-200 rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700",
    className
  );
  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};
Footer.displayName = "Card.Footer";

// --- Main Card component ---

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  bordered?: boolean;
  href?: string;
  children: ReactNode;
}

type CardComponent = FC<CardProps> & {
  Image: FC<CardImageProps>;
  Body: FC<CardBodyProps>;
  Title: FC<HTMLAttributes<HTMLHeadingElement>>;
  Subtitle: FC<HTMLAttributes<HTMLParagraphElement>>;
  Text: FC<HTMLAttributes<HTMLParagraphElement>>;
  Link: FC<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
  Header: FC<HTMLAttributes<HTMLDivElement>>;
  Footer: FC<HTMLAttributes<HTMLDivElement>>;
};

export const Card: CardComponent = ({
  className,
  hoverEffect,
  bordered,
  href,
  children,
  ...props
}) => {
  const cardClasses = classNames(
    "flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70",
    {
      "group hover:shadow-lg focus:outline-hidden focus:shadow-lg transition":
        hoverEffect,
      "border-t-4 border-t-blue-600 dark:border-t-blue-500": bordered,
    },
    className
  );

  if (href) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <a className={cardClasses} href={href} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.Image = Image;
Card.Body = Body;
Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Text = Text;
Card.Link = Link;
Card.Header = Header;
Card.Footer = Footer;
