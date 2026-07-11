import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/classNames";

export const Dropdown: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}> = ({ trigger, children, align = "start", className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div ref={ref} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            "border-border bg-layer absolute z-50 mt-2 min-w-40 rounded-lg border p-1 shadow-lg",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const Drawer: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}> = ({ open, onClose, children, side = "right", className }) => {
  useEffect(() => {
    const handle = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close drawer"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <aside
        className={cn(
          "bg-layer absolute inset-y-0 w-full max-w-sm overflow-y-auto p-6 shadow-xl",
          side === "right" ? "right-0" : "left-0",
          className,
        )}
      >
        {children}
      </aside>
    </div>
  );
};
