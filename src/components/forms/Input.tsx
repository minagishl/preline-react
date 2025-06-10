import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
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
      className={classNames(
        "block w-full rounded-lg border-gray-200 px-4 py-2.5 sm:py-3 sm:text-sm",
        "focus:border-blue-500 focus:ring-blue-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400",
        "dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
        className,
      )}
      {...props}
    />
  </div>
);

export default Input;
