import React, {
  FC,
  InputHTMLAttributes,
  useEffect,
  useId,
  useRef,
} from "react";
import classNames from "classnames";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  indeterminate?: boolean;
  labelPosition?: "start" | "end";
  validationState?: "error" | "success";
  variant?: "default" | "card" | "list";
}

const Checkbox: FC<CheckboxProps> = ({
  id: providedId,
  className,
  label,
  description,
  indeterminate = false,
  labelPosition = "end",
  validationState,
  variant = "default",
  ...props
}) => {
  const genId = useId();
  const id = providedId || genId;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [ref, indeterminate]);

  const inputClasses = classNames(
    "shrink-0 border-gray-200 rounded-sm disabled:opacity-50",
    "dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",
    {
      "mt-0.5": variant !== "list" && !description,
      "text-blue-600 focus:ring-blue-500 checked:border-blue-500 dark:checked:bg-blue-500 dark:checked:border-blue-500":
        !validationState,
      "text-red-600 focus:ring-red-500 checked:border-red-500 dark:checked:bg-red-500 dark:checked:border-red-500":
        validationState === "error",
      "text-teal-600 focus:ring-teal-500 checked:border-teal-500 dark:checked:bg-teal-500 dark:checked:border-teal-500":
        validationState === "success",
      "ms-auto": labelPosition === "start" && variant === "card",
    },
    className,
  );

  const inputEl = (
    <input
      ref={ref}
      type="checkbox"
      id={id}
      className={inputClasses}
      {...props}
      aria-describedby={description ? `${id}-description` : undefined}
    />
  );

  if (variant === "card") {
    const cardLabelClasses = classNames(
      "flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 items-center",
    );

    const content =
      labelPosition === "end" ? (
        <>
          {inputEl}
          <span className="ms-3 text-sm text-gray-500 dark:text-neutral-400">
            {label}
          </span>
        </>
      ) : (
        <>
          <span className="text-sm text-gray-500 dark:text-neutral-400">
            {label}
          </span>
          {inputEl}
        </>
      );

    return (
      <label htmlFor={id} className={cardLabelClasses}>
        {content}
      </label>
    );
  }

  if (description) {
    const wrapperClasses = classNames("relative flex items-start", {
      "opacity-40": props.disabled,
    });
    return (
      <div className={wrapperClasses}>
        <div className="mt-1 flex h-5 items-center">{inputEl}</div>
        <label htmlFor={id} className="ms-3">
          <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-300">
            {label}
          </span>
          <span
            id={`${id}-description`}
            className="block text-sm text-gray-600 dark:text-neutral-500"
          >
            {description}
          </span>
        </label>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="relative flex w-full items-start">
        <div className="flex h-5 items-center">{inputEl}</div>
        <label
          htmlFor={id}
          className="ms-3.5 block w-full text-sm text-gray-600 dark:text-neutral-500"
        >
          {label}
        </label>
      </div>
    );
  }

  const wrapperClasses = classNames("flex items-center", {
    "opacity-40": props.disabled,
  });

  const labelTextClasses = classNames("text-sm", {
    "ms-3": labelPosition === "end",
    "me-3": labelPosition === "start",
    "text-gray-500 dark:text-neutral-400": !validationState,
    "text-red-500": validationState === "error",
    "text-teal-500": validationState === "success",
  });

  const labelEl = label ? (
    <label htmlFor={id} className={labelTextClasses}>
      {label}
    </label>
  ) : null;

  const content =
    labelPosition === "end" ? (
      <>
        {inputEl}
        {labelEl}
      </>
    ) : (
      <>
        {labelEl}
        {inputEl}
      </>
    );

  return <div className={wrapperClasses}>{content}</div>;
};

export default Checkbox;
