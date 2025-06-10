import React, { Children, cloneElement, ReactElement, ReactNode } from "react";
import { cn } from "../../utils/classNames";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";
export type PopoverTrigger = "click" | "hover" | "focus";

export interface PopoverProps {
  children: ReactElement;
  content: ReactNode;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  placement = "top",
  trigger = "click",
  className,
}) => {
  const triggerElement = Children.only(children);

  const triggerWithPopover = cloneElement(
    triggerElement,
    {
      className: cn("hs-tooltip-toggle", triggerElement.props.className),
    },
    ...[
      triggerElement.props.children,
      <span
        key="popover"
        className={
          "hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border border-gray-200 text-sm text-gray-600 rounded-lg shadow-md dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
        }
        role="tooltip"
      >
        {content}
      </span>,
    ]
  );

  const placementClasses: Record<PopoverPlacement, string> = {
    top: "",
    bottom: "[--placement:bottom]",
    left: "[--placement:left]",
    right: "[--placement:right]",
  };

  const triggerClasses: Record<PopoverTrigger, string> = {
    click: "[--trigger:click]",
    hover: "[--trigger:hover]",
    focus: "[--trigger:focus]",
  };

  return (
    <div
      className={cn(
        "hs-tooltip inline-block",
        placementClasses[placement],
        triggerClasses[trigger],
        className
      )}
    >
      {triggerWithPopover}
    </div>
  );
};

export default Popover;
