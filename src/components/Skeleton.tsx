import React, { HTMLAttributes } from "react";
import { cn } from "../utils/classNames";

const baseBackground = "bg-gray-200 dark:bg-neutral-700";

type SkeletonVariant = "block" | "circle" | "text";
type SkeletonAnimation = "pulse" | "none";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  lines?: number;
  animate?: SkeletonAnimation;
  isLoaded?: boolean;
  lineClassName?: string;
}

const resolveLineWidths = (count: number): string[] => {
  if (count <= 1) return ["w-full"];
  const widths = Array.from({ length: count }, () => "w-full");
  widths[count - 1] = "w-5/6";
  return widths;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "block",
  lines = 3,
  animate = "pulse",
  isLoaded = false,
  lineClassName,
  className,
  children,
  ...props
}) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  const animationClass = animate === "pulse" ? "animate-pulse" : undefined;

  if (variant === "text") {
    const normalizedLines = Math.max(lines, 1);
    const widths = resolveLineWidths(normalizedLines);

    return (
      <div className={cn("space-y-2", className)} {...props} aria-hidden>
        {Array.from({ length: normalizedLines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseBackground,
              "h-3 rounded",
              animationClass,
              widths[index],
              lineClassName,
            )}
          />
        ))}
      </div>
    );
  }

  const shapeClass = variant === "circle" ? "rounded-full" : "rounded-md";

  return (
    <div
      className={cn(baseBackground, shapeClass, animationClass, className)}
      aria-hidden
      {...props}
    />
  );
};

export default Skeleton;
