import React, { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

const colorClasses = {
  dark: "bg-gray-800 dark:bg-white",
  gray: "bg-gray-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-600 dark:bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  light: "bg-white",
};

export type LegendIndicatorColor = keyof typeof colorClasses;

export interface LegendIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color?: LegendIndicatorColor;
}

export const LegendIndicator: FC<LegendIndicatorProps> = ({
  children,
  className,
  color = "gray",
  ...props
}) => {
  return (
    <div
      className={classNames("inline-flex items-center", className)}
      {...props}
    >
      <span
        className={classNames(
          "size-2 inline-block rounded-full me-2",
          colorClasses[color]
        )}
      ></span>
      <span className="text-gray-600 dark:text-neutral-400">{children}</span>
    </div>
  );
};
