import React, { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

const sizeClasses = {
  sm: "h-1.5",
  md: "h-4",
  lg: "h-6",
};

const verticalSizeClasses = {
  sm: "w-1.5",
  md: "w-4",
  lg: "w-6",
};

const colorClasses = {
  blue: "bg-blue-600 dark:bg-blue-500",
  gray: "bg-gray-500",
  dark: "bg-gray-800 dark:bg-white",
  teal: "bg-teal-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  white: "bg-white",
};

export type ProgressColor = keyof typeof colorClasses;
export type ProgressSize = keyof typeof sizeClasses;
export type ProgressShape = "rounded" | "square";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  color?: ProgressColor;
  size?: ProgressSize;
  shape?: ProgressShape;
  label?: ReactNode;
  vertical?: boolean;
  barClassName?: string;
}

const Progress: FC<ProgressProps> = ({
  value,
  color = "blue",
  size = "sm",
  shape = "rounded",
  label,
  vertical = false,
  className,
  barClassName,
  ...props
}) => {
  const progressValue = Math.max(0, Math.min(100, value));

  const containerClasses = classNames(
    "flex bg-gray-200 overflow-hidden dark:bg-neutral-700",
    vertical
      ? `flex-col flex-nowrap justify-end h-32 ${verticalSizeClasses[size]}`
      : `w-full ${sizeClasses[size]}`,
    { "rounded-full": shape === "rounded" },
    className
  );

  const barStyles = {
    [vertical ? "height" : "width"]: `${progressValue}%`,
  };

  const barClasses = classNames(
    "flex flex-col justify-center overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500",
    colorClasses[color],
    { "rounded-full": shape === "rounded" },
    barClassName
  );

  return (
    <div
      className={containerClasses}
      role="progressbar"
      aria-valuenow={progressValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div className={barClasses} style={barStyles}>
        {label}
      </div>
    </div>
  );
};

export default Progress;
