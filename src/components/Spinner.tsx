import React, { FC, HTMLAttributes } from "react";
import classNames from "classnames";

const colorClasses = {
  blue: "text-blue-600 dark:text-blue-500",
  gray: "text-gray-400",
  dark: "text-gray-800 dark:text-white",
  red: "text-red-600",
  yellow: "text-yellow-600",
  green: "text-green-600",
  indigo: "text-indigo-600",
  purple: "text-purple-600",
  pink: "text-pink-600",
  orange: "text-orange-600",
};

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

export type SpinnerColor = keyof typeof colorClasses;
export type SpinnerSize = keyof typeof sizeClasses;

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  color?: SpinnerColor;
  size?: SpinnerSize;
}

export const Spinner: FC<SpinnerProps> = ({
  color = "blue",
  size = "md",
  className,
  ...props
}) => {
  const combinedClassName = classNames(
    "animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full",
    colorClasses[color],
    sizeClasses[size],
    className
  );

  return (
    <div
      className={combinedClassName}
      role="status"
      aria-label="loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
