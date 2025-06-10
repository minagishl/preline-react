import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  className,
  ...props
}) => (
  <div>
    {label && (
      <label
        htmlFor={props.id}
        className="mb-2 block text-sm text-gray-700 dark:text-white"
      >
        {label}
      </label>
    )}
    <input
      type="file"
      className={classNames(
        "block w-full rounded-lg border border-gray-200 text-sm shadow-sm",
        "focus:z-10 focus:border-blue-500 focus:ring-blue-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400",
        "file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3",
        "dark:file:bg-neutral-700 dark:file:text-neutral-400",
        className,
      )}
      {...props}
    />
  </div>
);

export default FileInput;
