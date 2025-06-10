import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/classNames";

type KBDVariant = "ghost" | "subtle" | "light" | "outline" | "shadow";
type KBDSize = "xs" | "sm" | "lg";

export interface KBDProps extends HTMLAttributes<HTMLElement> {
  variant?: KBDVariant;
  size?: KBDSize;
  iconOnly?: boolean;
  children: ReactNode;
  className?: string;
}

const kbdStyles = {
  common: "font-mono",
  boxedBase: "inline-flex justify-center items-center rounded-md",
  variants: {
    ghost: "text-gray-400 dark:text-neutral-600",
    subtle: "text-gray-800 dark:text-neutral-200",
    light:
      "bg-gray-200 border border-transparent text-gray-800 dark:bg-neutral-700 dark:text-neutral-200",
    outline:
      "bg-white border border-gray-200 text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200",
    shadow:
      "bg-white border border-gray-200 text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]",
  },
  sizes: {
    xs: "min-h-4.5 px-1 text-xs",
    sm: "min-h-7.5 py-1 px-1.5 text-sm",
    lg: "min-h-10.5 py-1.5 px-2 text-lg",
  },
  nonBoxedSizes: {
    xs: "text-xs",
    sm: "text-sm",
    lg: "text-lg",
  },
  iconOnlySizes: {
    xs: "min-w-4.5",
    sm: "min-w-7.5",
    lg: "min-w-10.5",
  },
};

const KBD: React.FC<KBDProps> = ({
  variant = "light",
  size = "sm",
  iconOnly = false,
  children,
  className,
  ...props
}) => {
  const isBoxed = variant !== "ghost" && variant !== "subtle";

  const finalClassName = cn(
    kbdStyles.common,
    isBoxed && kbdStyles.boxedBase,
    kbdStyles.variants[variant],
    isBoxed ? kbdStyles.sizes[size] : kbdStyles.nonBoxedSizes[size],
    isBoxed && iconOnly && kbdStyles.iconOnlySizes[size],
    className,
  );

  return (
    <kbd className={finalClassName} {...props}>
      {children}
    </kbd>
  );
};

export default KBD;
