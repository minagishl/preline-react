import React, { SelectHTMLAttributes } from "react";
import classNames from "classnames";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select: React.FC<SelectProps> = ({ label, className, children, ...props }) => (
  <div>
    {label && (
      <label htmlFor={props.id} className="block mb-2 text-sm text-gray-700 dark:text-white">
        {label}
      </label>
    )}
    <select
      className={classNames(
        "py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm",
        "focus:border-blue-500 focus:ring-blue-500",
        "disabled:opacity-50 disabled:pointer-events-none",
        "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
        className
      )}
      {...props}
    >
      {children}
    </select>
  </div>
);

export default Select;
