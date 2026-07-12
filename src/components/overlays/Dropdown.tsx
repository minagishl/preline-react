import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils/classNames";

export type DropdownPlacement =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";
export type DropdownTrigger = "click" | "hover";
export type DropdownTransition =
  | "fade"
  | "scale"
  | "slide-up"
  | "inner-translate";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  /** @deprecated Use `placement`. */
  align?: "start" | "end";
  placement?: DropdownPlacement;
  triggerMode?: DropdownTrigger;
  transition?: DropdownTransition;
  autoClose?: "inside" | "outside" | "none";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const placementClasses: Record<DropdownPlacement, string> = {
  "bottom-start": "top-full left-0 mt-2 origin-top-left",
  "bottom-end": "top-full right-0 mt-2 origin-top-right",
  "top-start": "bottom-full left-0 mb-2 origin-bottom-left",
  "top-end": "bottom-full right-0 mb-2 origin-bottom-right",
  "right-start": "top-0 left-full ml-2 origin-top-left",
  "right-end": "bottom-0 left-full ml-2 origin-bottom-left",
  "left-start": "top-0 right-full mr-2 origin-top-right",
  "left-end": "bottom-0 right-full mr-2 origin-bottom-right",
};

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = "start",
  placement,
  triggerMode = "click",
  transition = "fade",
  autoClose = "inside",
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  closeOnEscape = true,
  className,
}) => {
  const id = useId();
  const resolvedPlacement: DropdownPlacement =
    placement ?? (align === "end" ? "bottom-end" : "bottom-start");
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame: number | undefined;
    let visibleFrame: number | undefined;
    let timeout: number | undefined;

    if (isOpen) {
      setMounted(true);
      frame = window.requestAnimationFrame(() => {
        visibleFrame = window.requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      timeout = window.setTimeout(() => setMounted(false), 150);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (visibleFrame) window.cancelAnimationFrame(visibleFrame);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: MouseEvent) => {
      if (
        autoClose !== "none" &&
        !ref.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [autoClose, closeOnEscape, isOpen]);

  const focusMenuItem = (last = false) => {
    window.requestAnimationFrame(() => {
      const menu = ref.current?.querySelector<HTMLElement>("[role=menu]");
      const items = menu
        ? Array.from(
            menu.querySelectorAll<HTMLElement>(
              'a, button:not([disabled]), [role="menuitem"], [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];
      (last ? items.at(-1) : items[0])?.focus();
    });
  };

  const hiddenTransitionClasses =
    transition === "scale"
      ? "pointer-events-none opacity-0 scale-95"
      : transition === "slide-up"
        ? "pointer-events-none opacity-0 translate-y-2"
        : transition === "inner-translate"
          ? "pointer-events-none opacity-0 -translate-y-2"
          : "pointer-events-none -mt-1 opacity-0";
  const renderedChildren =
    transition === "inner-translate" ? (
      <div
        className={cn(
          "transition-all duration-150 ease-out",
          visible ? "translate-y-0" : "translate-y-2",
        )}
      >
        {children}
      </div>
    ) : (
      children
    );

  return (
    <div
      ref={ref}
      className={cn(
        "hs-dropdown relative inline-flex",
        isOpen && "open",
        className,
      )}
      onMouseEnter={
        triggerMode === "hover" && !disabled ? () => setOpen(true) : undefined
      }
      onMouseLeave={
        triggerMode === "hover" && !disabled ? () => setOpen(false) : undefined
      }
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
        className="hs-dropdown-toggle"
        onClick={
          triggerMode === "click"
            ? () => !disabled && setOpen(!isOpen)
            : undefined
        }
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!disabled) {
              setOpen(true);
              focusMenuItem(event.key === "ArrowUp");
            }
          }
          if (event.key === "Escape" && isOpen && closeOnEscape) {
            setOpen(false);
          }
        }}
      >
        {trigger}
      </button>
      {mounted && (
        <div
          id={`${id}-menu`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={id}
          className={cn(
            "hs-dropdown-menu bg-dropdown border-dropdown-line absolute z-20 min-w-60 rounded-lg border shadow-md transition-all duration-150 ease-out before:absolute before:-top-4 before:h-4 before:w-full after:absolute after:-bottom-4 after:h-4 after:w-full",
            placementClasses[resolvedPlacement],
            visible
              ? "translate-x-0 translate-y-0 scale-100 opacity-100"
              : hiddenTransitionClasses,
          )}
          onClick={(event) => {
            const target = event.target;
            if (
              autoClose === "inside" &&
              target instanceof Element &&
              target.closest("a, button, [role=menuitem]")
            ) {
              setOpen(false);
            }
          }}
        >
          {renderedChildren}
        </div>
      )}
    </div>
  );
};
