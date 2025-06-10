import React from "react";
import { cn } from "../utils/classNames";

type AlertVariant =
  | "dark"
  | "secondary"
  | "info"
  | "success"
  | "danger"
  | "warning"
  | "light";

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  soft?: boolean;
  border?: null | "top" | "left";
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = "info",
  children,
  soft = false,
  border = null,
  className,
}) => {
  const variantClasses: Record<AlertVariant, string> = {
    dark: soft
      ? "bg-gray-100 border-gray-200 text-gray-800 dark:bg-white/10 dark:border-white/20 dark:text-white border"
      : "bg-gray-800 text-white dark:bg-white dark:text-neutral-800",
    secondary: soft
      ? "bg-gray-50 border-gray-200 text-gray-600 dark:bg-white/10 dark:border-white/10 dark:text-neutral-400 border"
      : "bg-gray-500 text-white",
    info: soft
      ? "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500 border"
      : "bg-blue-600 text-white dark:bg-blue-500",
    success: soft
      ? "bg-teal-100 border-teal-200 text-teal-800 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500 border"
      : "bg-teal-500 text-white",
    danger: soft
      ? "bg-red-100 border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500 border"
      : "bg-red-500 text-white",
    warning: soft
      ? "bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500 border"
      : "bg-yellow-500 text-white",
    light: soft
      ? "bg-white/10 border-white/10 text-white border"
      : "bg-white text-gray-600",
  };

  const borderClasses =
    border === "top" ? "border-t-2" : border === "left" ? "border-l-4" : "";
  const borderColorClasses: Record<AlertVariant, string> = {
    dark: "border-gray-800 dark:border-white",
    secondary: "border-gray-500",
    info: "border-blue-600 dark:border-blue-500",
    success: "border-teal-500",
    danger: "border-red-500",
    warning: "border-yellow-500",
    light: "border-white",
  };

  return (
    <div
      className={cn(
        "mt-2 rounded-lg p-4 text-sm",
        borderClasses,
        variantClasses[variant],
        !soft && borderColorClasses[variant],
        className,
      )}
      role="alert"
      tabIndex={-1}
      aria-labelledby={`hs-${soft ? "soft" : "solid"}-color-${variant}-label`}
    >
      {children}
    </div>
  );
};

export default Alert;
