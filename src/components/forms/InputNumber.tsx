import React from "react";
import { cn } from "../../utils/classNames";
import usePreline from "../../hooks/usePreline";

const MinusIcon = () => (
  <svg
    className="size-3.5 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
  </svg>
);

const PlusIcon = () => (
  <svg
    className="size-3.5 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="M12 5v14"></path>
  </svg>
);

const ExclamationCircleIcon = () => (
  <svg
    className="size-4 shrink-0 text-red-500"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" x2="12" y1="8" y2="12"></line>
    <line x1="12" x2="12.01" y1="16" y2="16"></line>
  </svg>
);

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  description?: string;
  variant?:
    | "default"
    | "input-style"
    | "vertically-stacked"
    | "horizontally-stacked"
    | "mini"
    | "pricing-seats";
  error?: string;
  containerClassName?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  min,
  max,
  step,
  label,
  description,
  variant = "default",
  error,
  className,
  containerClassName,
  ...props
}) => {
  usePreline();

  const options: { [key: string]: number } = {};
  if (min !== undefined) options.min = min;
  if (max !== undefined) options.max = max;
  if (step !== undefined) options.step = step;

  const dataHsInputNumber = JSON.stringify(options);

  const containerClasses = cn(
    "rounded-lg",
    (variant === "default" ||
      variant === "input-style" ||
      variant === "pricing-seats" ||
      variant === "mini") &&
      "py-2 px-3",
    variant === "default" && "bg-gray-100 dark:bg-neutral-700",
    variant !== "default" && "border bg-white dark:bg-neutral-900",
    variant === "mini" && "inline-block",
    error
      ? "border-red-500"
      : !error &&
          variant !== "default" &&
          "border-gray-200 dark:border-neutral-700",
    containerClassName,
  );

  const inputClasses = cn(
    "p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white",
    variant !== "mini" && variant !== "pricing-seats"
      ? "w-full"
      : "w-6 text-center",
    className,
  );

  const buttonBaseClasses =
    "inline-flex justify-center items-center gap-x-2 text-sm font-medium disabled:opacity-50 disabled:pointer-events-none";
  const commonButtonClasses =
    "border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800";

  const buttonVariantClasses = {
    default: "size-6 rounded-md",
    "input-style": "size-6 rounded-full",
    "vertically-stacked":
      "size-7 bg-gray-50 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
    "horizontally-stacked":
      "border-gray-200 size-10 bg-white text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
    mini: "size-6 rounded-md",
    "pricing-seats": "size-6 rounded-md",
  };

  const input = (
    <div
      className={cn(
        "grow",
        (variant === "vertically-stacked" ||
          variant === "horizontally-stacked") &&
          "px-3 py-2",
      )}
    >
      {label &&
        (variant === "input-style" || variant === "vertically-stacked") && (
          <span className="block text-xs text-gray-500 dark:text-neutral-400">
            {label}
          </span>
        )}
      <div className={cn("relative", error && "w-full")}>
        <input
          className={inputClasses}
          style={{ MozAppearance: "textfield" }}
          type="number"
          data-hs-input-number-input=""
          {...props}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center">
            <ExclamationCircleIcon />
          </div>
        )}
      </div>
    </div>
  );

  const decrementButton = (
    <button
      type="button"
      className={cn(
        buttonBaseClasses,
        (variant === "default" ||
          variant === "input-style" ||
          variant === "mini" ||
          variant === "pricing-seats") &&
          commonButtonClasses,
        buttonVariantClasses[variant],
        variant === "vertically-stacked" && "rounded-se-lg",
      )}
      data-hs-input-number-decrement=""
    >
      <MinusIcon />
    </button>
  );

  const incrementButton = (
    <button
      type="button"
      className={cn(
        buttonBaseClasses,
        (variant === "default" ||
          variant === "input-style" ||
          variant === "mini" ||
          variant === "pricing-seats") &&
          commonButtonClasses,
        buttonVariantClasses[variant],
        variant === "vertically-stacked" && "rounded-ee-lg",
        variant === "horizontally-stacked" && "last:rounded-e-lg",
      )}
      data-hs-input-number-increment=""
    >
      <PlusIcon />
    </button>
  );

  return (
    <div>
      <div
        className={containerClasses}
        data-hs-input-number={
          Object.keys(options).length > 0 ? dataHsInputNumber : ""
        }
      >
        {variant === "mini" ? (
          <div className="flex items-center gap-x-1.5">
            {decrementButton}
            {input}
            {incrementButton}
          </div>
        ) : variant === "pricing-seats" ? (
          <div className="flex w-full items-center justify-between gap-x-3">
            <div>
              <span className="block text-sm font-medium text-gray-800 dark:text-white">
                {label}
              </span>
              <span className="block text-xs text-gray-500 dark:text-neutral-400">
                {description}
              </span>
            </div>
            <div className="flex items-center gap-x-1.5">
              {decrementButton}
              {input}
              {incrementButton}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "flex w-full items-center justify-between",
              variant === "default" || variant === "input-style"
                ? "gap-x-5"
                : "gap-x-1",
            )}
          >
            {input}
            <div
              className={cn(
                "flex justify-end",
                (variant === "default" ||
                  variant === "input-style" ||
                  variant === "horizontally-stacked") &&
                  "items-center",
                (variant === "default" || variant === "input-style") &&
                  "gap-x-1.5",
                variant === "vertically-stacked" &&
                  "-gap-y-px flex-col divide-y divide-gray-200",
                (variant === "vertically-stacked" ||
                  variant === "horizontally-stacked") &&
                  "border-s border-gray-200 dark:divide-neutral-700 dark:border-neutral-700",
                variant === "horizontally-stacked" && "divide-x",
              )}
            >
              {decrementButton}
              {incrementButton}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputNumber;
