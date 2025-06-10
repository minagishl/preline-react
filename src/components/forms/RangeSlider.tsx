import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export interface RangeSliderProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const rangeClasses =
  "w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out dark:[&::-webkit-slider-thumb]:bg-neutral-700 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-100 [&::-webkit-slider-runnable-track]:rounded-full dark:[&::-webkit-slider-runnable-track]:bg-neutral-700 [&::-moz-range-track]:w-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-100 [&::-moz-range-track]:rounded-full";

const RangeSlider: React.FC<RangeSliderProps> = ({
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
      type="range"
      className={classNames(rangeClasses, className)}
      {...props}
    />
  </div>
);

export default RangeSlider;
