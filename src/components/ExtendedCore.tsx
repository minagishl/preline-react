import React, { useState } from "react";
import { cn } from "../utils/classNames";

export const Datepicker: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
> = ({ className, label, id, ...props }) => (
  <label className="text-foreground block text-sm" htmlFor={id}>
    {label && <span className="mb-2 block">{label}</span>}
    <input
      id={id}
      type="date"
      className={cn(
        "border-border bg-layer text-foreground focus:border-primary focus:ring-primary block w-full rounded-lg border px-3 py-2 text-sm",
        className,
      )}
      {...props}
    />
  </label>
);
export const DatePicker = Datepicker;

export const ListGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <ul
    className={cn(
      "divide-border border-border bg-layer divide-y overflow-hidden rounded-lg border",
      className,
    )}
  >
    {children}
  </ul>
);
export const ListGroupItem: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({
  className,
  ...props
}) => (
  <li
    className={cn("text-foreground px-4 py-3 text-sm", className)}
    {...props}
  />
);

export const FileUploadingProgress: React.FC<{
  fileName?: string;
  progress: number;
  onCancel?: () => void;
  className?: string;
}> = ({ fileName = "Uploading file", progress, onCancel, className }) => (
  <div
    className={cn("border-border bg-layer rounded-lg border p-4", className)}
  >
    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
      <span className="text-foreground truncate">{fileName}</span>
      {onCancel && (
        <button
          type="button"
          className="text-muted-foreground hover:text-destructive"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </div>
    <div className="bg-muted h-2 overflow-hidden rounded-full">
      <div
        className="bg-primary h-full transition-all"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
    <span className="text-muted-foreground mt-2 block text-xs">
      {Math.round(progress)}%
    </span>
  </div>
);

export const FileUpload: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { label?: string }
> = ({ className, label = "Choose file", ...props }) => (
  <label
    className={cn(
      "border-border text-muted-foreground hover:bg-muted flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-sm",
      className,
    )}
  >
    {label}
    <input className="sr-only" type="file" {...props} />
  </label>
);

export const CopyMarkup: React.FC<{
  value: string;
  children?: React.ReactNode;
  className?: string;
}> = ({ value, children = "Copy", className }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      className={cn(
        "border-border hover:bg-muted rounded-md border px-3 py-2 text-sm",
        className,
      )}
      onClick={copy}
    >
      {copied ? "Copied" : children}
    </button>
  );
};

export const ToggleCount: React.FC<{
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}> = ({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  className,
}) => {
  const [internal, setInternal] = useState(defaultValue);
  const count = value ?? internal;
  const update = (next: number) => {
    const result = Math.min(max, Math.max(min, next));
    if (value === undefined) setInternal(result);
    onChange?.(result);
  };
  return (
    <div
      className={cn(
        "border-border inline-flex items-center rounded-lg border",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease"
        className="hover:bg-muted px-3 py-2"
        disabled={count <= min}
        onClick={() => update(count - 1)}
      >
        −
      </button>
      <output className="min-w-10 text-center text-sm">{count}</output>
      <button
        type="button"
        aria-label="Increase"
        className="hover:bg-muted px-3 py-2"
        disabled={count >= max}
        onClick={() => update(count + 1)}
      >
        +
      </button>
    </div>
  );
};

export const ComboBox: React.FC<{
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ options, value, onChange, placeholder = "Search", className }) => {
  const id = React.useId();
  const [query, setQuery] = useState(value ?? "");
  const matches = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className={cn("relative", className)}>
      <input
        list={id}
        value={query}
        placeholder={placeholder}
        onChange={(event) => {
          setQuery(event.target.value);
          onChange?.(event.target.value);
        }}
        className="border-border bg-layer block w-full rounded-lg border px-3 py-2 text-sm"
      />
      <datalist id={id}>
        {matches.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
};
export const SearchBox: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className, type, ...props }) => (
  <input
    type={type ?? "search"}
    className={cn(
      "border-border bg-layer focus:border-primary focus:ring-primary block w-full rounded-lg border px-3 py-2 text-sm",
      className,
    )}
    {...props}
  />
);
export const AdvancedSelect: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement>
> = ({ className, ...props }) => (
  <select
    className={cn(
      "border-border bg-layer focus:border-primary focus:ring-primary block w-full rounded-lg border px-3 py-2 text-sm",
      className,
    )}
    {...props}
  />
);
