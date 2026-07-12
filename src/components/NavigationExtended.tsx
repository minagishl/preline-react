import React, { useEffect, useState } from "react";
import { cn } from "../utils/classNames";
import { Dropdown } from "./overlays/Dropdown";

export const Navbar: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => (
  <header
    className={cn("border-navbar-line bg-navbar border-b", className)}
    {...props}
  />
);
export const Nav: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => <nav className={cn("flex items-center gap-1", className)} {...props} />;
export const NavLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
> = ({ className, active, ...props }) => (
  <a
    className={cn(
      "text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm",
      active && "bg-muted text-primary",
      className,
    )}
    aria-current={active ? "page" : undefined}
    {...props}
  />
);
export const Sidebar: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => (
  <aside
    className={cn(
      "border-sidebar-line bg-sidebar h-full border-r p-3",
      className,
    )}
    {...props}
  />
);
export const MegaMenu: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ trigger, children, className }) => (
  <Dropdown trigger={trigger} className={className}>
    <div className="grid min-w-72 gap-2 p-2 sm:grid-cols-2">{children}</div>
  </Dropdown>
);
export interface ScrollspyItem {
  id: string;
  label: React.ReactNode;
}
export const Scrollspy: React.FC<{
  items: ScrollspyItem[];
  offset?: number;
  className?: string;
}> = ({ items, offset = 96, className }) => {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const update = () => {
      const found = [...items].reverse().find((item) => {
        const element = document.getElementById(item.id);
        return element ? element.getBoundingClientRect().top <= offset : false;
      });
      if (found) setActive(found.id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items, offset]);
  return (
    <nav aria-label="Scrollspy" className={cn("flex gap-1", className)}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "rounded-md px-3 py-2 text-sm",
            active === item.id
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export const ContextMenu: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ trigger, children, className }) => {
  const [state, setState] = useState<{ x: number; y: number } | null>(null);
  return (
    <div
      className={className}
      onContextMenu={(event) => {
        event.preventDefault();
        setState({ x: event.clientX, y: event.clientY });
      }}
      onClick={() => setState(null)}
    >
      {trigger}
      {state && (
        <div
          role="menu"
          className="border-border bg-layer fixed z-50 min-w-40 rounded-lg border p-1 shadow-lg"
          style={{ left: state.x, top: state.y }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
