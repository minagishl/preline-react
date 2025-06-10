import {
  FC,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";
import classNames from "classnames";

const solidColorClasses: Record<string, string> = {
  dark: "bg-gray-800 text-white dark:bg-white dark:text-neutral-800",
  gray: "bg-gray-500 text-white dark:bg-neutral-700",
  teal: "bg-teal-500 text-white",
  blue: "bg-blue-600 text-white dark:bg-blue-500",
  red: "bg-red-500 text-white",
  yellow: "bg-yellow-500 text-white",
  white: "bg-white text-gray-600",
};

const ghostColorClasses: Record<string, string> = {
  dark: "text-gray-700 dark:text-neutral-400",
  gray: "text-gray-500 dark:text-neutral-500",
  teal: "text-teal-500",
  blue: "text-blue-600 dark:text-blue-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
  white: "text-white",
};

const softColorClasses: Record<string, string> = {
  dark: "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-400",
  gray: "bg-gray-50 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200",
  teal: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-400",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400",
  white: "bg-white/10 text-white",
};

const outlineColorClasses: Record<string, string> = {
  dark: "border-gray-700 text-gray-700 dark:border-neutral-200 dark:text-neutral-200",
  gray: "border-gray-500 text-gray-500 dark:text-neutral-500",
  teal: "border-teal-500 text-teal-500",
  blue: "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500",
  red: "border-red-500 text-red-500",
  yellow: "border-yellow-500 text-yellow-500",
  white: "border-white text-white",
};

const softOutlinedColorClasses: Record<string, string> = {
  dark: "border-gray-100 bg-gray-200 text-gray-800 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200",
  gray: "border-gray-50 bg-gray-200 text-gray-800 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200",
  teal: "border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400",
  blue: "border-blue-100 bg-blue-200 text-blue-800 dark:border-blue-900 dark:bg-blue-800 dark:text-blue-400",
  red: "border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400",
  yellow:
    "border-yellow-100 bg-yellow-200 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-800 dark:text-yellow-400",
  white: "border-white/10 bg-white/10 text-white",
};

const containerSizeClasses = {
  sm: "size-9.5",
  md: "size-11",
  lg: "size-15.5",
};

const iconSizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-5",
};

export type StyledIconVariant =
  | "solid"
  | "soft"
  | "outline"
  | "ghost"
  | "soft-outlined"
  | "shadow";
export type StyledIconColor = keyof typeof solidColorClasses;
export type StyledIconSize = keyof typeof containerSizeClasses;
export type StyledIconShape = "rounded" | "square";

export interface StyledIconProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StyledIconVariant;
  color?: StyledIconColor;
  size?: StyledIconSize;
  shape?: StyledIconShape;
  children: ReactElement<{ className?: string }>;
}

const StyledIcon: FC<StyledIconProps> = ({
  variant = "ghost",
  color = "blue",
  size = "md",
  shape = "rounded",
  children,
  className,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "solid":
        return solidColorClasses[color];
      case "soft":
        return softColorClasses[color];
      case "outline":
        return `border ${outlineColorClasses[color]}`;
      case "soft-outlined":
        return `border-4 ${softOutlinedColorClasses[color]}`;
      case "shadow":
        return "border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400";
      case "ghost":
      default:
        return ghostColorClasses[color];
    }
  };

  const containerClasses = classNames(
    "inline-flex justify-center items-center",
    containerSizeClasses[size],
    {
      "rounded-full": shape === "rounded",
      "rounded-lg": shape === "square",
    },
    getVariantClasses(),
    className,
  );

  const iconSized = isValidElement(children)
    ? cloneElement(children, {
        className: classNames(
          children.props.className,
          "shrink-0",
          iconSizeClasses[size],
        ),
      })
    : null;

  return (
    <span className={containerClasses} {...props}>
      {iconSized}
    </span>
  );
};

export default StyledIcon;
