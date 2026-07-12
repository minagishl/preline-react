import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/classNames";

export type OffcanvasPlacement = "top" | "right" | "bottom" | "left";

export interface OffcanvasProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onClose"
> {
  open: boolean;
  onClose: () => void;
  placement?: OffcanvasPlacement;
  /** @deprecated Use `placement`, matching Preline's offcanvas terminology. */
  side?: "left" | "right";
  backdrop?: boolean;
  bodyScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  autoFocus?: boolean;
  backdropClassName?: string;
}

const placementClasses: Record<OffcanvasPlacement, string> = {
  right: "top-0 inset-e-0 h-full max-w-xs w-full border-e border-overlay-line",
  left: "top-0 inset-s-0 h-full max-w-xs w-full border-s border-overlay-line",
  top: "top-0 inset-x-0 max-h-40 size-full border-b border-overlay-line",
  bottom: "bottom-0 inset-x-0 max-h-40 size-full border-t border-overlay-line",
};

const closedClasses: Record<OffcanvasPlacement, string> = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

/**
 * Controlled React equivalent of Preline's `hs-overlay` offcanvas markup.
 * Compose the header and body as children so their markup stays identical to
 * the official examples.
 */
export const Offcanvas: React.FC<OffcanvasProps> = ({
  open,
  onClose,
  placement,
  side,
  backdrop = true,
  bodyScroll = false,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  autoFocus = true,
  backdropClassName,
  className,
  children,
  ...props
}) => {
  const resolvedPlacement = placement ?? side ?? "right";
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);
  const panelRef = useRef<HTMLElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame: number | undefined;
    let visibleFrame: number | undefined;
    let timeout: number | undefined;

    if (open) {
      setMounted(true);
      // Wait for the closed position to paint before changing the transform.
      // A second frame avoids React batching both states into one paint.
      frame = window.requestAnimationFrame(() => {
        visibleFrame = window.requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      timeout = window.setTimeout(() => setMounted(false), 300);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (visibleFrame) window.cancelAnimationFrame(visibleFrame);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    if (!bodyScroll) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = previousOverflow;
      };
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [bodyScroll, closeOnEscape, onClose, open]);

  useEffect(() => {
    if (!open) {
      restoreFocusRef.current?.focus();
      return;
    }
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (autoFocus) panelRef.current?.focus();
  }, [autoFocus, open]);

  // Preline applies `hidden` before opening. Keep the panel mounted only for
  // its 300ms exit transition, then remove it so it cannot leak into layout.
  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-80",
        visible ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {backdrop && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close offcanvas"
          className={cn(
            "absolute inset-0 bg-black/30 transition-opacity duration-300",
            visible ? "opacity-100" : "opacity-0",
            backdropClassName,
          )}
          onClick={closeOnBackdropClick ? onClose : undefined}
        />
      )}
      <aside
        ref={panelRef}
        className={cn(
          "bg-overlay fixed z-80 transform transition-all duration-300",
          placementClasses[resolvedPlacement],
          visible
            ? "translate-x-0 translate-y-0"
            : closedClasses[resolvedPlacement],
          className,
        )}
        role="dialog"
        aria-modal={!bodyScroll}
        aria-hidden={!visible}
        tabIndex={-1}
        {...props}
      >
        {children}
      </aside>
    </div>
  );
};

export default Offcanvas;
