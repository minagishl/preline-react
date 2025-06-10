import React from "react";
import classNames from "classnames";
import { AvatarProps } from "./Avatar";

const sizeClasses: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm: "size-8",
  md: "size-9.5",
  lg: "size-11",
  xl: "size-15.5",
};

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  spacing?: string;
  borderColor?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circular" | "rounded";
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  spacing,
  borderColor = "ring-white",
  className,
  size,
  shape,
}) => {
  const avatars = React.Children.toArray(children);
  const totalAvatars = avatars.length;

  const visibleAvatars =
    max && max < totalAvatars ? avatars.slice(0, max) : avatars;
  const hiddenCount = max && max < totalAvatars ? totalAvatars - max : 0;

  const firstAvatar = React.Children.toArray(children)[0];
  const defaultSize =
    React.isValidElement<AvatarProps>(firstAvatar) && firstAvatar.props.size
      ? firstAvatar.props.size
      : "md";
  const groupSize = size || defaultSize;

  const defaultShape =
    React.isValidElement<AvatarProps>(firstAvatar) && firstAvatar.props.shape
      ? firstAvatar.props.shape
      : "circular";
  const groupShape = shape || defaultShape;

  const finalSpacing = spacing || "-space-x-2";

  const ringClass = classNames("ring-2", borderColor, "dark:ring-neutral-900");

  return (
    <div className={classNames("flex items-center", finalSpacing, className)}>
      {visibleAvatars.map((child) => {
        if (React.isValidElement<AvatarProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            size: size || child.props.size,
            shape: shape || child.props.shape,
            className: classNames(child.props.className, ringClass),
          });
        }
        return child;
      })}
      {hiddenCount > 0 && (
        <div
          className={classNames(
            "inline-flex items-center justify-center",
            sizeClasses[groupSize],
            groupShape === "circular" ? "rounded-full" : "rounded-lg",
            "bg-gray-100 border-2 border-white font-medium text-gray-700 shadow-2xs dark:bg-neutral-700 dark:border-neutral-800 dark:text-white"
          )}
        >
          <span className="font-medium text-gray-500 dark:text-neutral-400">
            +{hiddenCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
