import React, {
  useRef,
  useState,
  useEffect,
  InputHTMLAttributes,
  ClipboardEvent,
  KeyboardEvent,
} from "react";
import classNames from "classnames";

export interface PinInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "gray" | "focus-effect";
  inputSize?: "sm" | "md" | "lg";
}

const PinInput: React.FC<PinInputProps> = ({
  length = 4,
  value = "",
  onChange,
  className,
  variant = "default",
  inputSize = "md",
  disabled,
  ...props
}) => {
  const [pin, setPin] = useState<string[]>(
    Array.from({ length }, (_, i) => value[i] || ""),
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const newPin = Array.from({ length }, (_, i) => value[i] || "");
    if (newPin.join("") !== pin.join("")) {
      setPin(newPin);
    }
  }, [value, length, pin]);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPin = [...pin];
    const inputValue = e.target.value;

    if (inputValue.length > 1) return;

    newPin[index] = inputValue;
    setPin(newPin);
    onChange?.(newPin.join(""));

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    const newPin = Array.from({ length }, (_, i) => pastedData[i] || "");
    setPin(newPin);
    onChange?.(newPin.join(""));
    const lastFilledIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const baseClasses =
    "block text-center disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:placeholder-neutral-500";

  const sizeClasses = {
    sm: "size-9.5 sm:text-sm",
    md: "size-11 sm:text-sm",
    lg: "size-15.5 text-lg",
  };

  const variantClasses = {
    default:
      "border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:focus:ring-neutral-600",
    gray: "bg-gray-200 border-transparent rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:focus:ring-neutral-600",
    "focus-effect":
      "border-gray-200 rounded-md focus:scale-110 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:focus:ring-neutral-600",
  };

  const spinButtonNone =
    "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex gap-x-3" data-hs-pin-input>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type={props.type || "text"}
          value={pin[index]}
          onChange={(e) => handleInputChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          maxLength={1}
          className={classNames(
            baseClasses,
            sizeClasses[inputSize],
            variantClasses[variant],

            spinButtonNone,
            className,
          )}
          autoFocus={index === 0 && props.autoFocus}
          disabled={disabled}
          {...props}
          data-hs-pin-input-item
        />
      ))}
    </div>
  );
};

export default PinInput;
