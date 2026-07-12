import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useId,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/classNames";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTriggerMode = "hover" | "focus" | "both";

interface TooltipTriggerProps {
  className?: string;
  children?: ReactNode;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  "aria-describedby"?: string;
}

export interface TooltipProps {
  children: ReactElement<TooltipTriggerProps>;
  content: ReactNode;
  placement?: TooltipPlacement;
  triggerMode?: TooltipTriggerMode;
  delay?: number;
  className?: string;
  contentClassName?: string;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "top-1/2 right-full mr-2 -translate-y-1/2",
  right: "top-1/2 left-full ml-2 -translate-y-1/2",
};

const Tooltip = ({
  children,
  content,
  placement = "top",
  triggerMode = "both",
  delay = 0,
  className,
  contentClassName,
}: TooltipProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trigger = Children.only(children);
  const supportsHover = triggerMode === "hover" || triggerMode === "both";
  const supportsFocus = triggerMode === "focus" || triggerMode === "both";

  const show = () => {
    if (timeout.current) clearTimeout(timeout.current);
    if (delay) timeout.current = setTimeout(() => setOpen(true), delay);
    else setOpen(true);
  };
  const hide = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(false);
  };

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  const triggerWithTooltip = cloneElement<TooltipTriggerProps>(trigger, {
    className: cn("hs-tooltip-toggle", trigger.props.className),
    "aria-describedby": open ? id : undefined,
    onMouseEnter: (event) => {
      trigger.props.onMouseEnter?.(event);
      if (!event.defaultPrevented && supportsHover) show();
    },
    onMouseLeave: (event) => {
      trigger.props.onMouseLeave?.(event);
      if (!event.defaultPrevented && supportsHover) hide();
    },
    onFocus: (event) => {
      trigger.props.onFocus?.(event);
      if (!event.defaultPrevented && supportsFocus) show();
    },
    onBlur: (event) => {
      trigger.props.onBlur?.(event);
      if (!event.defaultPrevented && supportsFocus) hide();
    },
  });

  return (
    <span className={cn("hs-tooltip relative inline-flex", className)}>
      {triggerWithTooltip}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "hs-tooltip-content bg-tooltip border-tooltip-line text-tooltip-foreground pointer-events-none absolute z-20 inline-block rounded-md border px-2 py-1 text-xs font-medium whitespace-nowrap shadow-2xs transition-opacity duration-150",
          placementClasses[placement],
          open ? "visible opacity-100" : "invisible opacity-0",
          contentClassName,
        )}
      >
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
