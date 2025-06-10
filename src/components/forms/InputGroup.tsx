import React, { InputHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

export interface InputGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix"> {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({
  prefix,
  suffix,
  className,
  ...props
}) => {
  return (
    <div className="flex rounded-lg">
      {prefix && (
        <span className="inline-flex min-w-fit items-center rounded-s-md border border-e-0 border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-400">
          {prefix}
        </span>
      )}
      <input
        className={classNames(
          "block w-full border-gray-200 px-4 py-2.5 sm:py-3 sm:text-sm",
          prefix ? "rounded-none border-s-0" : "rounded-s-lg",
          suffix ? "rounded-none border-e-0" : "rounded-e-lg",
          "focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
          "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
          className,
        )}
        {...props}
      />
      {suffix && (
        <span className="inline-flex min-w-fit items-center rounded-e-md border border-s-0 border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-400">
          {suffix}
        </span>
      )}
    </div>
  );
};

export default InputGroup;
