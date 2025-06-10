import React, { InputHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

export interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ prefix, suffix, className, ...props }) => {
  return (
    <div className="flex rounded-lg">
      {prefix && (
        <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
          {prefix}
        </span>
      )}
      <input
        className={classNames(
          "py-2.5 sm:py-3 px-4 block w-full border-gray-200 sm:text-sm",
          prefix ? "border-s-0 rounded-none" : "rounded-s-lg",
          suffix ? "border-e-0 rounded-none" : "rounded-e-lg",
          "focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
          "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
          className
        )}
        {...props}
      />
      {suffix && (
        <span className="px-4 inline-flex items-center min-w-fit rounded-e-md border border-s-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
          {suffix}
        </span>
      )}
    </div>
  );
};

export default InputGroup;
