import React, { Children, cloneElement, ReactElement, ReactNode } from "react";
import { cn } from "../../utils/classNames";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipTriggerProps {
  className?: string;
  children?: ReactNode;
}

type TooltipTriggerElement = ReactElement<TooltipTriggerProps>;

export interface TooltipProps {
  children: TooltipTriggerElement;
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
  const trigger = Children.only(children) as TooltipTriggerElement;

  const triggerWithTooltip = cloneElement<TooltipTriggerProps>(
    trigger,
    {
      className: cn("hs-tooltip-toggle", trigger.props.className),
    },
    [
      trigger.props.children,
      <span
        key="tooltip"
        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-10 inline-block rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-2xs transition-opacity dark:bg-neutral-700"
        role="tooltip"
        data-placement={placement}
      >
        {content}
      </span>,
    ],
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
        className,
      )}
    >
      {triggerWithTooltip}
    </div>
  );
};

export default Tooltip;
