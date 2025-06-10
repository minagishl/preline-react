import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

const Radio: React.FC<RadioProps> = ({ label, className, ...props }) => (
  <label className="inline-flex items-center">
    <input
      type="radio"
      className={classNames(
        "mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800",
        className,
      )}
      {...props}
    />
    {label && (
      <span className="ms-2 text-sm text-gray-500 dark:text-neutral-400">
        {label}
      </span>
    )}
  </label>
);

export default Radio;
