import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FileInput: React.FC<FileInputProps> = ({ label, className, ...props }) => (
  <div>
    {label && (
      <label htmlFor={props.id} className="block mb-2 text-sm text-gray-700 dark:text-white">
        {label}
      </label>
    )}
    <input
      type="file"
      className={classNames(
        "block w-full border border-gray-200 shadow-sm rounded-lg text-sm",
        "focus:z-10 focus:border-blue-500 focus:ring-blue-500",
        "disabled:opacity-50 disabled:pointer-events-none",
        "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
        "file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4",
        "dark:file:bg-neutral-700 dark:file:text-neutral-400",
        className
      )}
      {...props}
    />
  </div>
);

export default FileInput;
