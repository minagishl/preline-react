import React, { SelectHTMLAttributes } from "react";
import classNames from "classnames";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  className,
  children,
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
    <select
      className={classNames(
        "block w-full rounded-lg border-gray-200 px-4 py-3 pe-9 text-sm",
        "focus:border-blue-500 focus:ring-blue-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  </div>
);

export default Select;
