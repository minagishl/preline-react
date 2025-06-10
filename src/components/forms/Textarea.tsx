import React, { TextareaHTMLAttributes } from "react";
import classNames from "classnames";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, className, ...props }) => (
  <div>
    {label && (
      <label htmlFor={props.id} className="block mb-2 text-sm text-gray-700 dark:text-white">
        {label}
      </label>
    )}
    <textarea
      className={classNames(
        "py-2 px-3 sm:py-3 sm:px-4 block w-full border-gray-200 rounded-lg sm:text-sm",
        "focus:border-blue-500 focus:ring-blue-500",
        "disabled:opacity-50 disabled:pointer-events-none",
        "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
        "dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
        className
      )}
      {...props}
    />
  </div>
);

export default Textarea;
