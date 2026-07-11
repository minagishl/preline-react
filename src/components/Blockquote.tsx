import React from "react";
import classNames from "classnames";
import PrelineQuoteMark from "../icons/PrelineQuoteMark";

type Size = "sm" | "md" | "lg";
type Align = "left" | "center" | "right";

export interface BlockquoteProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: Size;
  align?: Align;
  bordered?: boolean;
  className?: string;
}

const QuoteIcon: React.FC<{ align?: Align }> = ({ align = "left" }) => {
  const iconClasses = classNames("text-muted-foreground/20", {
    "absolute -top-6 -inset-s-8 size-16": align === "left",
    "absolute -top-8 -inset-s-8 size-16 sm:h-24 sm:w-24": align === "center",
    "absolute -top-8 -end-8 inset-s-auto size-16 sm:h-24 sm:w-24":
      align === "right",
  });

  return <PrelineQuoteMark className={iconClasses} />;
};

const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  footer,
  size = "md",
  align = "left",
  bordered = false,
  className,
}) => {
  const sizeClasses = {
    sm: "text-gray-800 dark:text-white",
    md: "text-gray-800 sm:text-xl dark:text-white",
    lg: "text-xl text-gray-800 md:text-3xl md:leading-normal dark:text-white",
  };

  const alignClasses = {
    left: "",
    center: "text-center max-w-lg mx-auto",
    right: "text-end",
  };

  const blockquoteClasses = classNames(
    "relative",
    alignClasses[align],
    {
      "border-s-4 border-gray-200 ps-4 sm:ps-6 dark:border-neutral-700":
        bordered,
    },
    className,
  );

  const paragraphClasses = classNames(sizeClasses[size]);

  const mainContent = (
    <p className={paragraphClasses}>
      <em>{children}</em>
    </p>
  );

  const mainContentWithAlignedIcon = (
    <p className={paragraphClasses}>
      <em className="relative">
        <QuoteIcon align={align} />
        <span className="relative z-10 dark:text-white">{children}</span>
      </em>
    </p>
  );

  if (bordered) {
    return (
      <blockquote className={blockquoteClasses}>
        {mainContent}
        {footer && <footer className="mt-4">{footer}</footer>}
      </blockquote>
    );
  }

  return (
    <blockquote className={blockquoteClasses}>
      {align === "left" && <QuoteIcon align="left" />}
      <div className="relative z-10">
        {align === "center" || align === "right"
          ? mainContentWithAlignedIcon
          : mainContent}
      </div>
      {footer && <footer className="mt-6">{footer}</footer>}
    </blockquote>
  );
};

export default Blockquote;
