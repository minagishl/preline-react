import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/classNames";

type DividerColor =
  | "default"
  | "gray-800"
  | "gray-500"
  | "teal-500"
  | "blue-500"
  | "red-500"
  | "yellow-500"
  | "white";
type DividerHeight = "1" | "2" | "4" | "8";
type LabelPosition = "left" | "center" | "right";

export interface DividerProps
  extends HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  color?: DividerColor;
  height?: DividerHeight;
  label?: ReactNode;
  labelPosition?: LabelPosition;
  vertical?: boolean;
  className?: string;
}

const colorClasses: Record<DividerColor, string> = {
  default: "border-gray-200 dark:border-neutral-700",
  "gray-800": "border-gray-800 dark:border-white",
  "gray-500": "border-gray-500 dark:border-neutral-500",
  "teal-500": "border-teal-500",
  "blue-500": "border-blue-500",
  "red-500": "border-red-500",
  "yellow-500": "border-yellow-500",
  white: "border-white",
};

const heightClasses: Record<DividerHeight, string> = {
  "1": "border-t",
  "2": "border-t-2",
  "4": "border-t-4",
  "8": "border-t-8",
};

const Divider: React.FC<DividerProps> = ({
  color = "default",
  height = "1",
  label,
  labelPosition = "center",
  vertical = false,
  className,
  ...props
}) => {
  if (label) {
    const baseLabelClass =
      "py-3 flex items-center text-sm text-gray-800 dark:text-white";
    const lineClass = `flex-1 border-t ${colorClasses[color]}`;

    return (
      <div className={cn(baseLabelClass, className)} {...props}>
        {labelPosition !== "left" && <span className={cn(lineClass, "me-6")} />}
        {label}
        {labelPosition !== "right" && (
          <span className={cn(lineClass, "ms-6")} />
        )}
      </div>
    );
  }

  if (vertical) {
    return (
      <div
        className={cn(
          "border-t sm:border-s sm:border-t-0",
          colorClasses[color],
          className,
        )}
        {...props}
      ></div>
    );
  }

  return (
    <hr
      className={cn(heightClasses[height], colorClasses[color], className)}
      {...props}
    />
  );
};

export default Divider;
