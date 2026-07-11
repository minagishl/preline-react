import React, { useRef, useState } from "react";
import { cn } from "../utils/classNames";
import { Table } from "./Collection";
import { CopyMarkup, Datepicker, FileUpload } from "./ExtendedCore";
import Toast from "./Toast";

/** Dependency-free React fallbacks for Preline's optional third-party integrations. */
export const AdvancedRangeSlider: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className, type, ...props }) => (
  <input
    type={type ?? "range"}
    className={cn(
      "bg-muted accent-primary h-2 w-full cursor-pointer appearance-none rounded-full",
      className,
    )}
    {...props}
  />
);
export const AdvancedDatepicker = Datepicker;
export const Clipboard = CopyMarkup;
export const Datatable = Table;
export const DataTable = Table;

export const Chart: React.FC<{
  children?: React.ReactNode;
  title?: string;
  className?: string;
}> = ({ children, title = "Chart", className }) => (
  <section
    aria-label={title}
    className={cn("border-border bg-layer rounded-lg border p-4", className)}
  >
    {children}
  </section>
);
export const Datamap: React.FC<{
  title?: string;
  children?: React.ReactNode;
  className?: string;
}> = ({ title = "Map", children, className }) => (
  <section
    aria-label={title}
    className={cn(
      "border-border bg-muted text-muted-foreground flex min-h-48 items-center justify-center rounded-lg border p-4 text-sm",
      className,
    )}
  >
    {children ?? title}
  </section>
);

export const Confetti: React.FC<{
  children?: React.ReactNode;
  onTrigger?: () => void;
  className?: string;
}> = ({ children = "Celebrate", onTrigger, className }) => (
  <button
    type="button"
    className={cn(
      "bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm",
      className,
    )}
    onClick={onTrigger}
  >
    {children}
  </button>
);

export const DragAndDrop: React.FC<{
  onFiles?: (files: File[]) => void;
  children?: React.ReactNode;
  className?: string;
}> = ({ onFiles, children = "Drop files here or choose files", className }) => {
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const files = (list: FileList | null) =>
    onFiles?.(list ? Array.from(list) : []);
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "border-border text-muted-foreground cursor-pointer rounded-lg border border-dashed p-8 text-center text-sm",
        dragging && "border-primary bg-primary/5",
        className,
      )}
      onClick={() => input.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        files(event.dataTransfer.files);
      }}
      onKeyDown={(event) => event.key === "Enter" && input.current?.click()}
    >
      {children}
      <input
        ref={input}
        type="file"
        className="sr-only"
        onChange={(event) => files(event.target.files)}
      />
    </div>
  );
};
export const FileUploader = FileUpload;

export const Map: React.FC<{
  src?: string;
  title?: string;
  className?: string;
}> = ({ src, title = "Map", className }) =>
  src ? (
    <iframe
      title={title}
      src={src}
      className={cn(
        "border-border min-h-72 w-full rounded-lg border",
        className,
      )}
      loading="lazy"
    />
  ) : (
    <Datamap title={title} className={className} />
  );

export const WYSIWYGEditor: React.FC<{
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}> = ({ value, defaultValue = "", onChange, className }) => (
  <div
    className={cn(
      "border-border bg-layer text-foreground focus-within:border-primary min-h-32 rounded-lg border p-3 text-sm",
      className,
    )}
    contentEditable
    suppressContentEditableWarning
    onInput={(event) => onChange?.(event.currentTarget.innerHTML)}
  >
    {value ?? defaultValue}
  </div>
);

export const Charts = Chart;
export const Datamaps = Datamap;
export const Maps = Map;
export const ToastNotifications = Toast;
