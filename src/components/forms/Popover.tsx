import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/classNames";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";
export type PopoverTrigger = "click" | "hover" | "focus";

interface PopoverTriggerProps {
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: "dialog";
}

export interface PopoverProps {
  children: ReactElement<PopoverTriggerProps>;
  content: ReactNode;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  className?: string;
  contentClassName?: string;
}

const placementClasses: Record<PopoverPlacement, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "top-1/2 right-full mr-2 -translate-y-1/2",
  right: "top-1/2 left-full ml-2 -translate-y-1/2",
};

const Popover = ({
  children,
  content,
  placement = "top",
  trigger = "click",
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  className,
  contentClassName,
}: PopoverProps) => {
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };
  const triggerElement = Children.only(children);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (closeOnOutsideClick && !ref.current?.contains(event.target as Node))
        setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeOnEscape, closeOnOutsideClick, isOpen]);

  const triggerWithPopover = cloneElement<PopoverTriggerProps>(triggerElement, {
    className: cn("hs-tooltip-toggle", triggerElement.props.className),
    "aria-expanded": isOpen,
    "aria-controls": id,
    "aria-haspopup": "dialog",
    onClick: (event) => {
      triggerElement.props.onClick?.(event);
      if (!event.defaultPrevented && trigger === "click") setOpen(!isOpen);
    },
    onFocus: (event) => {
      triggerElement.props.onFocus?.(event);
      if (!event.defaultPrevented && trigger === "focus") setOpen(true);
    },
    onBlur: (event) => {
      triggerElement.props.onBlur?.(event);
      if (!event.defaultPrevented && trigger === "focus") setOpen(false);
    },
    onMouseEnter: (event) => {
      triggerElement.props.onMouseEnter?.(event);
      if (!event.defaultPrevented && trigger === "hover") setOpen(true);
    },
    onMouseLeave: (event) => {
      triggerElement.props.onMouseLeave?.(event);
      if (!event.defaultPrevented && trigger === "hover") setOpen(false);
    },
  });

  return (
    <span
      ref={ref}
      className={cn("hs-tooltip relative inline-flex", className)}
    >
      {triggerWithPopover}
      <span
        id={id}
        role="dialog"
        aria-hidden={!isOpen}
        className={cn(
          "bg-overlay border-overlay-line text-foreground absolute z-20 inline-block min-w-48 rounded-lg border px-4 py-3 text-sm shadow-md transition-opacity duration-150",
          placementClasses[placement],
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
          contentClassName,
        )}
      >
        {content}
      </span>
    </span>
  );
};

export default Popover;
