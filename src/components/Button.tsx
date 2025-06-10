import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import Spinner from "./Spinner";

export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "white"
  | "link";
export type ButtonColor =
  | "dark"
  | "gray"
  | "teal"
  | "blue"
  | "red"
  | "yellow"
  | "white";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "default" | "pill" | "block";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: ButtonShape;
  loading?: boolean;
  iconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const buttonStyles = {
  base: "inline-flex items-center gap-x-2 text-sm font-medium focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none",
  iconOnlyBase: "flex shrink-0 justify-center items-center gap-2",
  sizes: {
    sm: "py-2 px-3",
    md: "py-3 px-4",
    lg: "p-4 sm:p-5",
  },
  iconOnlySizes: {
    sm: "size-9.5",
    md: "size-11",
    lg: "size-15.5",
  },
  shapes: {
    default: "rounded-lg",
    pill: "rounded-full",
    block: "w-full justify-center",
  },
  variants: {
    solid: {
      dark: "border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900 dark:bg-white dark:text-neutral-800",
      gray: "border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600",
      teal: "border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:bg-teal-600",
      blue: "border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
      red: "border border-transparent bg-red-500 text-white hover:bg-red-600 focus:bg-red-600",
      yellow:
        "border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600",
      white:
        "border border-transparent bg-white text-gray-800 hover:bg-gray-200 focus:bg-gray-200",
    },
    outline: {
      dark: "border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 dark:border-white dark:text-white dark:hover:text-neutral-300 dark:hover:border-neutral-300",
      gray: "border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 dark:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:border-neutral-300",
      teal: "border border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400",
      blue: "border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 dark:border-blue-500 dark:text-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400",
      red: "border border-red-500 text-red-500 hover:border-red-400 hover:text-red-400",
      yellow:
        "border border-yellow-500 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400",
      white:
        "border border-white text-white hover:border-white/70 hover:text-white/70",
    },
    ghost: {
      dark: "border border-transparent text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700",
      gray: "border border-transparent text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
      teal: "border border-transparent text-teal-500 hover:bg-teal-100 hover:text-teal-800 dark:hover:bg-teal-800/30 dark:hover:text-teal-400",
      blue: "border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400",
      red: "border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800/30 dark:hover:text-red-400",
      yellow:
        "border border-transparent text-yellow-500 hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-800/30 dark:hover:text-yellow-400",
      white:
        "border border-transparent text-white hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-white/10 dark:hover:text-white",
    },
    soft: {
      dark: "border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
      gray: "border border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/10 dark:text-neutral-400 dark:hover:bg-white/20 dark:hover:text-neutral-300",
      teal: "border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20",
      blue: "border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20",
      red: "border border-transparent bg-red-100 text-red-800 hover:bg-red-200 dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20",
      yellow:
        "border border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:text-yellow-500 dark:bg-yellow-800/30 dark:hover:bg-yellow-800/20",
      white:
        "border border-transparent bg-white/10 text-white hover:bg-white/20",
    },
    white: {
      dark: "border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700",
      gray: "border border-gray-200 bg-white text-gray-500 shadow-2xs hover:bg-gray-50 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700",
      teal: "border border-gray-200 bg-white text-teal-500 shadow-2xs hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700",
      blue: "border border-gray-200 bg-white text-blue-600 shadow-2xs hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-blue-500 dark:hover:bg-neutral-700",
      red: "border border-gray-200 bg-white text-red-500 shadow-2xs hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700",
      yellow:
        "border border-gray-200 bg-white text-yellow-500 shadow-2xs hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700",
      white: "", // This combination doesn't exist, but added for type completeness.
    },
    link: {
      dark: "text-gray-800 hover:text-blue-600 dark:text-white dark:hover:text-white/70",
      gray: "text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white",
      teal: "text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300", // Example, not in docs
      blue: "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400",
      red: "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300", // Example, not in docs
      yellow:
        "text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300", // Example, not in docs
      white: "text-white hover:text-white/80",
    },
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  color = "blue",
  size = "md",
  shape = "default",
  loading = false,
  iconOnly = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const variantClasses = buttonStyles.variants[variant]?.[color] || "";

  const finalClassName = classNames(
    buttonStyles.base,
    iconOnly ? buttonStyles.iconOnlyBase : buttonStyles.sizes[size],
    iconOnly ? buttonStyles.iconOnlySizes[size] : "",
    shape === "pill" ? buttonStyles.shapes.pill : buttonStyles.shapes.default,
    shape === "block" && !iconOnly ? buttonStyles.shapes.block : "",
    variantClasses,
    className,
  );

  const spinner = <Spinner size="sm" color="white" />;

  return (
    <button
      type="button"
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && iconOnly && spinner}
      {loading && !iconOnly && (
        <>
          {spinner}
          {children && <span>{children}</span>}
        </>
      )}
      {!loading && (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
