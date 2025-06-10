import React from "react";
import classNames from "classnames";

type Color = "dark" | "gray" | "teal" | "blue" | "red" | "yellow" | "white";
type Variant = "solid" | "soft" | "outline" | "white";
type Shape = "rounded" | "pill";

export interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  variant?: Variant;
  shape?: Shape;
  onRemove?: () => void | undefined;
  className?: string;
  indicator?: boolean;
}

const solidColorClasses: Record<Color, string> = {
  dark: "bg-gray-800 text-white dark:bg-white dark:text-neutral-800",
  gray: "bg-gray-500 text-white",
  teal: "bg-teal-500 text-white",
  blue: "bg-blue-600 text-white dark:bg-blue-500",
  red: "bg-red-500 text-white",
  yellow: "bg-yellow-500 text-white",
  white: "bg-white text-gray-600",
};

const softColorClasses: Record<Color, string> = {
  dark: "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white",
  gray: "bg-gray-50 text-gray-500 dark:bg-white/10 dark:text-white",
  teal: "bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500",
  red: "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500",
  white: "bg-white/10 text-white",
};

const outlineColorClasses: Record<Color, string> = {
  dark: "border border-gray-800 text-gray-800 dark:border-neutral-200 dark:text-white",
  gray: "border border-gray-500 text-gray-500 dark:text-neutral-400",
  teal: "border border-teal-500 text-teal-500",
  blue: "border border-blue-600 text-blue-600 dark:text-blue-500",
  red: "border border-red-500 text-red-500",
  yellow: "border border-yellow-500 text-yellow-500",
  white: "border border-white text-white",
};

const whiteVariantClasses =
  "border border-gray-200 bg-white text-gray-800 shadow-2xs dark:bg-neutral-900 dark:border-neutral-700 dark:text-white";

const removeButtonSoftClasses: Record<Color, string> = {
  dark: "hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-900",
  gray: "hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-900",
  teal: "hover:bg-teal-200 focus:bg-teal-200 focus:text-teal-500 dark:hover:bg-teal-900",
  blue: "hover:bg-blue-200 focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900",
  red: "hover:bg-red-200 focus:bg-red-200 focus:text-red-500 dark:hover:bg-red-900",
  yellow:
    "hover:bg-yellow-200 focus:bg-yellow-200 focus:text-yellow-500 dark:hover:bg-yellow-900",
  white: "hover:bg-white/20 focus:bg-white/20",
};

const indicatorColorClasses: Record<Color, string> = {
  dark: "bg-gray-800 dark:bg-white",
  gray: "bg-gray-500",
  teal: "bg-teal-500",
  blue: "bg-blue-600 dark:bg-blue-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  white: "bg-gray-800",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  color = "gray",
  variant = "solid",
  shape = "pill",
  onRemove,
  className,
  indicator,
}) => {
  const colorClasses = (() => {
    if (variant === "white") return whiteVariantClasses;
    if (variant === "soft") return softColorClasses[color];
    if (variant === "outline") return outlineColorClasses[color];
    return solidColorClasses[color];
  })();

  const badgeClasses = classNames(
    "inline-flex items-center gap-x-1.5 py-1.5 text-xs font-medium",
    shape === "pill" ? "rounded-full" : "rounded-md",
    colorClasses,
    onRemove ? "ps-3 pe-2" : "px-3",
    className,
  );

  return (
    <span className={badgeClasses}>
      {indicator && (
        <span
          className={classNames(
            "inline-block size-1.5 rounded-full",
            indicatorColorClasses[color],
          )}
        ></span>
      )}
      {children}
      {onRemove !== undefined && (
        <button
          type="button"
          className={classNames(
            "inline-flex size-4 shrink-0 items-center justify-center rounded-full focus:outline-none",
            variant === "soft"
              ? removeButtonSoftClasses[color]
              : "hover:bg-black/20 focus:bg-black/20",
          )}
          onClick={onRemove}
        >
          <span className="sr-only">Remove badge</span>
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
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;
