import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, className, ...props }) => (
  <div>
    {label && (
      <label htmlFor={props.id} className="block mb-2 text-sm text-gray-700 dark:text-white">
        {label}
      </label>
    )}
    <input
      type="color"
      className={classNames(
        "p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg",
        "disabled:opacity-50 disabled:pointer-events-none",
        "dark:bg-neutral-900 dark:border-neutral-700",
        className
      )}
      {...props}
    />
  </div>
);

export default ColorPicker;
