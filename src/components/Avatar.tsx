import React from "react";
import classNames from "classnames";
import { UserRound } from "lucide-react";

type Size = "sm" | "md" | "lg" | "xl";
type Shape = "circular" | "rounded";
type Status = "online" | "offline" | "away" | "busy";
type StatusPosition = "top" | "bottom";
type Color = "dark" | "gray" | "green" | "blue" | "red" | "yellow" | "white";
type ColorVariant = "solid" | "soft" | "outline" | "white";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: Size;
  shape?: Shape;
  initials?: string;
  status?: Status;
  statusPosition?: StatusPosition;
  className?: string;
  color?: Color;
  colorVariant?: ColorVariant;
}

const sizeClasses: Record<Size, string> = {
  sm: "size-8",
  md: "size-9.5",
  lg: "size-11",
  xl: "size-15.5",
};

const shapeClasses: Record<Shape, string> = {
  circular: "rounded-full",
  rounded: "rounded-lg",
};

const statusColorClasses: Record<Status, string> = {
  offline: "bg-gray-400",
  busy: "bg-red-400",
  online: "bg-teal-400",
  away: "bg-yellow-400",
};

const statusSizeClasses: Record<Size, string> = {
  sm: "size-1.5",
  md: "size-2.5",
  lg: "size-3",
  xl: "size-3.5",
};

const solidColorClasses: Record<Color, string> = {
  dark: "bg-gray-800 text-white dark:bg-white dark:text-neutral-800",
  gray: "bg-gray-500 text-white",
  green: "bg-green-500 text-white",
  blue: "bg-blue-600 text-white dark:bg-blue-500",
  red: "bg-red-500 text-white",
  yellow: "bg-yellow-500 text-white",
  white: "bg-white text-gray-800",
};

const softColorClasses: Record<Color, string> = {
  dark: "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white",
  gray: "bg-gray-50 text-gray-500 dark:bg-white/10 dark:text-white",
  green: "bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500",
  red: "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500",
  white: "bg-white/10 text-white",
};

const outlineColorClasses: Record<Color, string> = {
  dark: "border border-gray-800 text-gray-800 dark:border-neutral-200 dark:text-white",
  gray: "border border-gray-500 text-gray-500 dark:text-neutral-400",
  green: "border border-teal-500 text-teal-500",
  blue: "border border-blue-600 text-blue-600 dark:text-blue-500",
  red: "border border-red-500 text-red-500",
  yellow: "border border-yellow-500 text-yellow-500",
  white: "border border-white text-white",
};

const whiteVariantClasses =
  "border border-gray-200 bg-white text-gray-800 shadow-2xs dark:bg-neutral-900 dark:border-neutral-700 dark:text-white";

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  shape = "circular",
  initials,
  status,
  statusPosition = "top",
  className,
  color = "gray",
  colorVariant,
}) => {
  const avatarBaseClasses = "inline-block";

  const avatarClasses = classNames(
    avatarBaseClasses,
    sizeClasses[size],
    shapeClasses[shape],
    className,
  );

  const statusBaseClasses =
    "absolute block rounded-full ring-2 ring-white dark:ring-neutral-900";
  const statusClasses = classNames(
    statusBaseClasses,
    statusColorClasses[status || "offline"],
    statusSizeClasses[size],
    {
      "top-0 end-0": statusPosition === "top" && shape === "circular",
      "bottom-0 end-0": statusPosition === "bottom" && shape === "circular",
      "top-0 end-0 transform -translate-y-1/2 translate-x-1/2":
        statusPosition === "top" && shape === "rounded",
      "bottom-0 end-0 transform translate-y-1/2 translate-x-1/2":
        statusPosition === "bottom" && shape === "rounded",
    },
  );

  const renderContent = () => {
    if (src) {
      return <img className={avatarClasses} src={src} alt={alt} />;
    }

    if (initials) {
      const colorClasses = (() => {
        if (colorVariant === "white") {
          return whiteVariantClasses;
        }
        if (colorVariant === "soft") {
          return softColorClasses[color];
        }
        if (colorVariant === "outline") {
          return outlineColorClasses[color];
        }
        // `solid` is the default
        return solidColorClasses[color];
      })();

      const initialsClasses = classNames(
        "inline-flex items-center justify-center font-semibold",
        avatarClasses,
        colorClasses,
      );
      const textSizeClass =
        size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg";
      return (
        <span className={classNames(initialsClasses, textSizeClass)}>
          {initials}
        </span>
      );
    }

    return (
      <span
        className={classNames("overflow-hidden bg-gray-100", avatarClasses)}
      >
        <UserRound className="size-full p-1 text-gray-300" aria-hidden="true" />
      </span>
    );
  };

  if (status) {
    return (
      <div className="relative inline-block">
        {renderContent()}
        <span className={statusClasses}></span>
      </div>
    );
  }

  return renderContent();
};

export default Avatar;
