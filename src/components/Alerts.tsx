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
}

export default function Alert({
  variant = "info",
  children,
  soft = false,
}: AlertProps) {
  const variantClasses: Record<AlertVariant, string> = {
    dark: soft
      ? "bg-gray-100 border border-gray-200 text-gray-800 dark:bg-white/10 dark:border-white/20 dark:text-white"
      : "bg-gray-800 text-white dark:bg-white dark:text-neutral-800",
    secondary: soft
      ? "bg-gray-50 border border-gray-200 text-gray-600 dark:bg-white/10 dark:border-white/10 dark:text-neutral-400"
      : "bg-gray-500 text-white",
    info: soft
      ? "bg-blue-100 border border-blue-200 text-blue-800 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500"
      : "bg-blue-600 text-white dark:bg-blue-500",
    success: soft
      ? "bg-teal-100 border border-teal-200 text-teal-800 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
      : "bg-teal-500 text-white",
    danger: soft
      ? "bg-red-100 border border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
      : "bg-red-500 text-white",
    warning: soft
      ? "bg-yellow-100 border border-yellow-200 text-yellow-800 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
      : "bg-yellow-500 text-white",
    light: soft
      ? "bg-white/10 border border-white/10 text-white"
      : "bg-white text-gray-600",
  };

  return (
    <div
      className={cn("mt-2 text-sm rounded-lg p-4", variantClasses[variant])}
      role="alert"
      tabIndex={-1}
      aria-labelledby={`hs-${soft ? "soft" : "solid"}-color-${variant}-label`}
    >
      {children}
    </div>
  );
}
