import React, { Children, cloneElement, ReactElement, ReactNode } from "react";
import { cn } from "../../utils/classNames";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  children: ReactElement;
  content: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = "top",
  className,
}) => {
  const trigger = Children.only(children);

  const triggerWithTooltip = cloneElement(
    trigger,
    {
      className: cn("hs-tooltip-toggle", trigger.props.className),
    },
    ...[
      trigger.props.children,
      <span
        key="tooltip"
        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-neutral-700"
        role="tooltip"
        data-placement={placement}
      >
        {content}
      </span>,
    ]
  );

  const placementClasses = {
    top: "",
    bottom: "[--placement:bottom]",
    left: "[--placement:left]",
    right: "[--placement:right]",
  };

  return (
    <div
      className={cn(
        "hs-tooltip inline-block",
        placementClasses[placement],
        className
      )}
    >
      {triggerWithTooltip}
    </div>
  );
};

export default Tooltip;
