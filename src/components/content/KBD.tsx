import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/classNames";

type KBDVariant = "ghost" | "subtle" | "light" | "outline" | "shadow";
type KBDSize = "xs" | "sm" | "lg";
export type KBDColor =
  | "gray"
  | "dark"
  | "secondary"
  | "info"
  | "success"
  | "danger"
  | "warning"
  | "light";

export interface KBDProps extends HTMLAttributes<HTMLElement> {
  variant?: KBDVariant;
  size?: KBDSize;
  color?: KBDColor;
  iconOnly?: boolean;
  children: ReactNode;
  className?: string;
}

const kbdStyles = {
  common: "font-mono",
  boxedBase: "inline-flex justify-center items-center rounded-md",
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

const variantColors: Record<KBDVariant, Record<KBDColor, string>> = {
  ghost: {
    gray: "text-gray-400 dark:text-neutral-600",
    dark: "text-gray-600 dark:text-neutral-300",
    secondary: "text-gray-500 dark:text-neutral-400",
    info: "text-blue-500 dark:text-blue-400",
    success: "text-teal-500 dark:text-teal-400",
    danger: "text-red-500 dark:text-red-400",
    warning: "text-yellow-500 dark:text-yellow-400",
    light: "text-gray-500 dark:text-white/80",
  },
  subtle: {
    gray: "text-gray-800 dark:text-neutral-200",
    dark: "text-gray-900 dark:text-white",
    secondary: "text-gray-600 dark:text-neutral-300",
    info: "text-blue-600 dark:text-blue-300",
    success: "text-teal-600 dark:text-teal-300",
    danger: "text-red-600 dark:text-red-300",
    warning: "text-yellow-600 dark:text-yellow-300",
    light: "text-gray-700 dark:text-white",
  },
  light: {
    gray: "bg-gray-200 border border-transparent text-gray-800 dark:bg-neutral-700 dark:text-neutral-200",
    dark: "bg-gray-800 border border-transparent text-white dark:bg-white dark:text-neutral-800",
    secondary:
      "bg-gray-100 border border-transparent text-gray-600 dark:bg-neutral-800 dark:text-neutral-300",
    info: "bg-blue-100 border border-transparent text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    success:
      "bg-teal-100 border border-transparent text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    danger:
      "bg-red-100 border border-transparent text-red-700 dark:bg-red-900/40 dark:text-red-300",
    warning:
      "bg-yellow-100 border border-transparent text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    light:
      "bg-white border border-transparent text-gray-700 dark:bg-white/10 dark:text-white",
  },
  outline: {
    gray: "bg-white border border-gray-200 text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200",
    dark: "bg-gray-900 border border-gray-900 text-white dark:bg-white dark:border-neutral-200 dark:text-neutral-800",
    secondary:
      "bg-white border border-gray-300 text-gray-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300",
    info: "bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-200",
    success:
      "bg-teal-50 border border-teal-200 text-teal-700 dark:bg-teal-950 dark:border-teal-700 dark:text-teal-200",
    danger:
      "bg-red-50 border border-red-200 text-red-700 dark:bg-red-950 dark:border-red-700 dark:text-red-200",
    warning:
      "bg-yellow-50 border border-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-700 dark:text-yellow-200",
    light:
      "bg-white border border-white/60 text-gray-700 dark:bg-white/10 dark:border-white/30 dark:text-white",
  },
  shadow: {
    gray: "bg-white border border-gray-200 text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]",
    dark: "bg-gray-900 border border-gray-900 text-white shadow-[0px_2px_0px_0px_rgba(0,0,0,0.25)] dark:bg-white dark:border-neutral-200 dark:text-neutral-800 dark:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)]",
    secondary:
      "bg-gray-100 border border-gray-300 text-gray-700 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]",
    info: "bg-blue-500 border border-blue-500 text-white shadow-[0px_2px_0px_0px_rgba(37,99,235,0.35)] dark:bg-blue-600 dark:border-blue-500 dark:text-white dark:shadow-[0px_2px_0px_0px_rgba(96,165,250,0.35)]",
    success:
      "bg-teal-500 border border-teal-500 text-white shadow-[0px_2px_0px_0px_rgba(15,118,110,0.35)] dark:bg-teal-600 dark:border-teal-500 dark:text-white dark:shadow-[0px_2px_0px_0px_rgba(94,234,212,0.35)]",
    danger:
      "bg-red-500 border border-red-500 text-white shadow-[0px_2px_0px_0px_rgba(220,38,38,0.35)] dark:bg-red-600 dark:border-red-500 dark:text-white dark:shadow-[0px_2px_0px_0px_rgba(252,165,165,0.35)]",
    warning:
      "bg-yellow-400 border border-yellow-400 text-neutral-900 shadow-[0px_2px_0px_0px_rgba(202,138,4,0.35)] dark:bg-yellow-500 dark:border-yellow-400 dark:text-neutral-900 dark:shadow-[0px_2px_0px_0px_rgba(253,224,71,0.35)]",
    light:
      "bg-white border border-white/60 text-gray-700 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:bg-white/10 dark:border-white/20 dark:text-white dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.2)]",
  },
};

const KBD: React.FC<KBDProps> = ({
  variant = "light",
  size = "sm",
  color = "gray",
  iconOnly = false,
  children,
  className,
  ...props
}) => {
  const isBoxed = variant !== "ghost" && variant !== "subtle";

  const finalClassName = cn(
    kbdStyles.common,
    isBoxed && kbdStyles.boxedBase,
    variantColors[variant][color],
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
