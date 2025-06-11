import React, { forwardRef, useState } from "react";
import { cn } from "../../utils/classNames";

export interface TogglePasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

const TogglePassword = forwardRef<HTMLInputElement, TogglePasswordProps>(
  ({ className, label, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType = showPassword ? "text" : "password";

    return (
      <div className={cn("max-w-sm", containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-2 block text-sm dark:text-white"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            {...props}
            ref={ref}
            type={inputType}
            className={cn(
              "block w-full rounded-lg border-gray-200 py-2.5 ps-4 pe-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
              className,
            )}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 end-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 focus:text-blue-600 focus:outline-hidden dark:text-neutral-600 dark:focus:text-blue-500"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <svg
                className="size-3.5 shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              <svg
                className="size-3.5 shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  },
);

TogglePassword.displayName = "TogglePassword";

export default TogglePassword;
