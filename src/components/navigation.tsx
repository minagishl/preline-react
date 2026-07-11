import React, { useId, useState } from "react";
import { cn } from "../utils/classNames";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}
export const Breadcrumb: React.FC<{
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}> = ({ items, separator = "/", className }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, index) => (
        <li className="flex items-center gap-2" key={index}>
          {index > 0 && <span aria-hidden="true">{separator}</span>}
          {item.href && index < items.length - 1 ? (
            <a className="hover:text-primary" href={item.href}>
              {item.label}
            </a>
          ) : (
            <span
              aria-current={index === items.length - 1 ? "page" : undefined}
              className="text-foreground"
            >
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}
export const Tabs: React.FC<{
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}> = ({ items, defaultValue, className }) => {
  const [active, setActive] = useState(defaultValue ?? items[0]?.id);
  const id = useId();
  const current = items.find((item) => item.id === active);
  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Tabs"
        className="border-border flex gap-1 border-b"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${id}-${item.id}-tab`}
            aria-selected={active === item.id}
            aria-controls={`${id}-${item.id}-panel`}
            disabled={item.disabled}
            onClick={() => setActive(item.id)}
            className={cn(
              "border-b-2 px-3 py-2 text-sm font-medium",
              active === item.id
                ? "border-primary text-primary"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {current && (
        <div
          role="tabpanel"
          id={`${id}-${current.id}-panel`}
          aria-labelledby={`${id}-${current.id}-tab`}
          className="pt-4"
        >
          {current.content}
        </div>
      )}
    </div>
  );
};

export const Pagination: React.FC<{
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}> = ({ page, totalPages, onPageChange, className }) => (
  <nav
    className={cn("flex items-center gap-1", className)}
    aria-label="Pagination"
  >
    <button
      type="button"
      className="border-border rounded-md border px-3 py-2 text-sm disabled:opacity-50"
      disabled={page <= 1}
      onClick={() => onPageChange(page - 1)}
    >
      Previous
    </button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (number) => (
        <button
          type="button"
          key={number}
          aria-current={page === number ? "page" : undefined}
          onClick={() => onPageChange(number)}
          className={cn(
            "size-9 rounded-md text-sm",
            page === number
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted",
          )}
        >
          {number}
        </button>
      ),
    )}
    <button
      type="button"
      className="border-border rounded-md border px-3 py-2 text-sm disabled:opacity-50"
      disabled={page >= totalPages}
      onClick={() => onPageChange(page + 1)}
    >
      Next
    </button>
  </nav>
);

export interface StepperItem {
  title: React.ReactNode;
  description?: React.ReactNode;
}
export const Stepper: React.FC<{
  items: StepperItem[];
  currentStep: number;
  className?: string;
}> = ({ items, currentStep, className }) => (
  <ol className={cn("flex flex-col gap-4 sm:flex-row", className)}>
    {items.map((item, index) => (
      <li className="flex flex-1 items-start gap-3" key={index}>
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            index < currentStep
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {index + 1}
        </span>
        <span>
          <span className="text-foreground block text-sm font-medium">
            {item.title}
          </span>
          {item.description && (
            <span className="text-muted-foreground block text-sm">
              {item.description}
            </span>
          )}
        </span>
      </li>
    ))}
  </ol>
);
