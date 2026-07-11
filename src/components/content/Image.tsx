import React from "react";
import { cn } from "../../utils/classNames";

export const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  className,
  alt = "",
  ...props
}) => <img alt={alt} className={cn("max-w-full", className)} {...props} />;

export const CustomScrollbar: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={cn(
      "overflow-auto [scrollbar-color:var(--muted-foreground)_transparent] [scrollbar-width:thin]",
      className,
    )}
    {...props}
  />
);
