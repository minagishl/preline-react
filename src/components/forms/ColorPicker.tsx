import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface ColorPickerProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  className,
  ...props
}) => (
  <div>
    {label && (
      <label
        htmlFor={props.id}
        className="mb-2 block text-sm text-gray-700 dark:text-white"
      >
        {label}
      </label>
    )}
    <input
      type="color"
      className={classNames(
        "block h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:border-neutral-700 dark:bg-neutral-900",
        className,
      )}
      {...props}
    />
  </div>
);

export default ColorPicker;
