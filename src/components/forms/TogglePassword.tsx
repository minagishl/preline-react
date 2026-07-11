import React, { forwardRef, useState } from "react";
import { cn } from "../../utils/classNames";
import { Eye, EyeOff } from "lucide-react";

export interface TogglePasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
            className="absolute inset-y-0 inset-e-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 focus:text-blue-600 focus:outline-hidden dark:text-neutral-600 dark:focus:text-blue-500"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <Eye className="size-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <EyeOff className="size-3.5 shrink-0" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    );
  },
);

TogglePassword.displayName = "TogglePassword";

export default TogglePassword;
