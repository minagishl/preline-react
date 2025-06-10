import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

const Switch: React.FC<SwitchProps> = ({ label, className, ...props }) => (
  <label className="flex items-center gap-x-3">
    <span className="relative inline-block h-6 w-11">
      <input
        type="checkbox"
        className={classNames("peer sr-only", className)}
        {...props}
      />
      <span className="absolute inset-0 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 peer-disabled:pointer-events-none peer-disabled:opacity-50 dark:bg-neutral-700 dark:peer-checked:bg-blue-500"></span>
      <span className="absolute start-0.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
    </span>
    {label && (
      <span className="text-sm text-gray-500 dark:text-neutral-400">
        {label}
      </span>
    )}
  </label>
);

export default Switch;
