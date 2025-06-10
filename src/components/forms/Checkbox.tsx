import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => (
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      className={classNames(
        "shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500",
        "disabled:opacity-50 disabled:pointer-events-none",
        "dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",
        className
      )}
      {...props}
    />
    {label && <span className="ms-2 text-sm text-gray-500 dark:text-neutral-400">{label}</span>}
  </label>
);

export default Checkbox;
