import React, { ElementType, HTMLAttributes } from "react";
import { BaseProps } from "../../types";
import { cn } from "../../utils/classNames";

export type ContainerBreakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ContainerPadding = "none" | "2" | "4" | "6" | "8";

export interface ContainerProps
  extends Omit<HTMLAttributes<HTMLElement>, "className">,
    BaseProps {
  as?: ElementType;
  breakpoint?: ContainerBreakpoint;
  centered?: boolean;
  paddingX?: ContainerPadding;
  fluid?: boolean;
}

const breakpointClasses: Record<ContainerBreakpoint, string> = {
  base: "container",
  sm: "sm:container",
  md: "md:container",
  lg: "lg:container",
  xl: "xl:container",
  "2xl": "2xl:container",
};

const paddingClasses: Record<ContainerPadding, string> = {
  none: "px-0",
  2: "px-2",
  4: "px-4",
  6: "px-6",
  8: "px-8",
};

const Container: React.FC<ContainerProps> = ({
  as: Component = "div",
  breakpoint = "base",
  centered = true,
  paddingX = "4",
  fluid = false,
  className,
  children,
  ...rest
}) => {
  const containerClass = fluid ? "w-full" : breakpointClasses[breakpoint];
  const paddingClass = paddingClasses[paddingX];

  return (
    <Component
      className={cn(
        containerClass,
        centered && "mx-auto",
        paddingClass,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Container;
