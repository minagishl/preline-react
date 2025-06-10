import React, { ElementType, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/classNames";

type LinkVariant = "default" | "underline" | "icon" | "white";

type LinkColor = "dark" | "gray" | "teal" | "blue" | "red" | "yellow" | "white";

type LinkUnderlineOffset = "1" | "2" | "4" | "8";

const linkStyles = {
  base: "text-blue-600 focus:outline-hidden",
  variants: {
    default: "hover:text-blue-500",
    underline: "decoration-2 hover:underline focus:underline",
  },
  underlineColors: {
    dark: "decoration-gray-800 dark:decoration-white",
    gray: "decoration-gray-500",
    teal: "decoration-teal-500",
    blue: "decoration-blue-600",
    red: "decoration-red-500",
    yellow: "decoration-yellow-500",
    white: "decoration-white",
  },
  underlineOffsets: {
    "1": "underline-offset-1",
    "2": "underline-offset-2",
    "4": "underline-offset-4",
    "8": "underline-offset-8",
  },
  icon: "inline-flex items-center gap-x-1 text-sm text-gray-800 hover:text-blue-600 focus:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-500 dark:focus:text-blue-500",
  white:
    "py-2 px-3 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
};

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  variant?: LinkVariant;
  underlineColor?: LinkColor;
  underlineOffset?: LinkUnderlineOffset;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  as: Component = "a",
  variant = "default",
  underlineColor,
  underlineOffset,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) => {
  const underlineColorClass = underlineColor
    ? linkStyles.underlineColors[underlineColor]
    : "";
  const underlineOffsetClass = underlineOffset
    ? linkStyles.underlineOffsets[underlineOffset]
    : "";

  const finalClassName = cn(
    variant !== "icon" && variant !== "white" && linkStyles.base,
    variant === "default" && linkStyles.variants.default,
    variant === "underline" && linkStyles.variants.underline,
    variant === "underline" && underlineColorClass,
    variant === "underline" && underlineOffsetClass,
    variant === "icon" && linkStyles.icon,
    variant === "white" && linkStyles.white,
    className,
  );

  return (
    <Component className={finalClassName} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </Component>
  );
};

export default Link;
