import React, { Children, cloneElement, ReactElement, ReactNode } from "react";
import { cn } from "../../utils/classNames";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";
export type PopoverTrigger = "click" | "hover" | "focus";

interface PopoverTriggerProps {
  className?: string;
  children?: ReactNode;
}

type PopoverTriggerElement = ReactElement<PopoverTriggerProps>;

export interface PopoverProps {
  children: PopoverTriggerElement;
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
  const triggerElement = Children.only(children) as PopoverTriggerElement;

  const triggerWithPopover = cloneElement<PopoverTriggerProps>(
    triggerElement,
    {
      className: cn("hs-tooltip-toggle", triggerElement.props.className),
    },
    [
      triggerElement.props.children,
      <span
        key="popover"
        className={
          "hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 opacity-0 shadow-md transition-opacity dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
        }
        role="tooltip"
      >
        {content}
      </span>,
    ],
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
        className,
      )}
    >
      {triggerWithPopover}
    </div>
  );
};

export default Popover;
