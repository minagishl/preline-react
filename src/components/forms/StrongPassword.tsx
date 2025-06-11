import React, {
  FC,
  InputHTMLAttributes,
  useMemo,
  useState,
  useEffect,
} from "react";
import { cn } from "../../utils/classNames";
import Input from "./Input";

const CheckIcon = () => (
  <svg
    className="size-4 shrink-0"
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
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const UncheckIcon = () => (
  <svg
    className="size-4 shrink-0"
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
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

type Rule =
  | "min-length"
  | "lowercase"
  | "uppercase"
  | "numbers"
  | "special-characters";

const ALL_RULES: Rule[] = [
  "min-length",
  "lowercase",
  "uppercase",
  "numbers",
  "special-characters",
];
const STRENGTH_LEVELS_TEXT = [
  "Empty",
  "Weak",
  "Medium",
  "Strong",
  "Very Strong",
  "Super Strong",
];

export interface StrongPasswordProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  minLength?: number;
  withIndicatorAndHints?: boolean;
  specialCharactersSet?: string;
  checksExclude?: Rule[];
  popover?: boolean;
  containerClassName?: string;
}

const StrongPassword: FC<StrongPasswordProps> = ({
  value: controlledValue,
  onChange,
  minLength = 6,
  withIndicatorAndHints = false,
  specialCharactersSet,
  checksExclude = [],
  popover = false,
  className,
  containerClassName,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [localMinLength, setLocalMinLength] = useState(minLength);

  useEffect(() => {
    setLocalMinLength(minLength);
  }, [minLength]);

  const ruleDefinitions = useMemo(
    () => ({
      "min-length": {
        text: `Minimum number of characters is ${localMinLength}.`,
        validate: (val: string) => val.length >= localMinLength,
      },
      lowercase: {
        text: "Should contain lowercase.",
        validate: (val: string) => /[a-z]/.test(val),
      },
      uppercase: {
        text: "Should contain uppercase.",
        validate: (val: string) => /[A-Z]/.test(val),
      },
      numbers: {
        text: "Should contain numbers.",
        validate: (val: string) => /\d/.test(val),
      },
      "special-characters": {
        text: `Should contain special characters${
          specialCharactersSet
            ? ` (available chars: ${specialCharactersSet})`
            : ""
        }.`,
        validate: (val: string) =>
          specialCharactersSet
            ? new RegExp(
                `[${specialCharactersSet.replace(
                  /[-/\\^$*+?.()|[\]{}]/g,
                  "\\$&",
                )}]`,
              ).test(val)
            : /[^A-Za-z0-9]/.test(val),
      },
    }),
    [localMinLength, specialCharactersSet],
  );

  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const setValue = (val: string) => {
    if (onChange) {
      onChange(val);
    }
    if (controlledValue === undefined) {
      setUncontrolledValue(val);
    }
  };

  const rules = useMemo(
    () => ALL_RULES.filter((rule) => !checksExclude.includes(rule)),
    [checksExclude],
  );

  const passedRules = useMemo(
    () => rules.filter((rule) => ruleDefinitions[rule].validate(value)),
    [value, rules, ruleDefinitions],
  );

  const strengthLevel = useMemo(() => {
    if (!value) return 0;
    const passedCount = passedRules.length;
    if (passedCount === 0) return 1; // Weak
    if (passedCount === rules.length) return STRENGTH_LEVELS_TEXT.length - 1; // Super Strong
    return Math.min(passedCount + 1, STRENGTH_LEVELS_TEXT.length - 2);
  }, [value, passedRules.length, rules.length]);

  const strengthText = STRENGTH_LEVELS_TEXT[strengthLevel];

  const progressStrips = (
    <div className="-mx-1 mt-2 flex">
      {Array.from({ length: rules.length }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "mx-1 h-2 flex-auto rounded-full bg-blue-500 opacity-50",
            i < passedRules.length && "opacity-100",
            passedRules.length === rules.length && "bg-teal-500",
          )}
        />
      ))}
    </div>
  );

  const hintsList = (
    <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
      {rules.map((rule) => (
        <li
          key={rule}
          className={cn(
            "flex items-center gap-x-2",
            passedRules.includes(rule) && "text-teal-500",
          )}
        >
          {passedRules.includes(rule) ? <CheckIcon /> : <UncheckIcon />}
          {ruleDefinitions[rule].text}
        </li>
      ))}
    </ul>
  );

  const indicatorAndHints = withIndicatorAndHints && !popover && (
    <div className="mt-2">
      {progressStrips}
      <div id="hs-strong-password-hints" className="mt-2 mb-3">
        <div>
          <span className="text-sm text-gray-800 dark:text-neutral-200">
            Level:
          </span>
          <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
            {" "}
            {strengthText}
          </span>
        </div>
        <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
          Your password must contain:
        </h4>
        {hintsList}
      </div>
    </div>
  );

  const popoverContent = isFocused && value && popover && (
    <div className="absolute z-10 mt-2 w-full rounded-lg bg-white p-4 shadow-md dark:border dark:border-neutral-700 dark:bg-neutral-800">
      {progressStrips}
      <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
        Your password must contain:
      </h4>
      {hintsList}
    </div>
  );

  return (
    <div className={cn("max-w-sm", containerClassName)}>
      <div className="relative">
        <Input
          type="password"
          placeholder="Enter password"
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "block w-full rounded-lg border-gray-200 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
            className,
          )}
        />
        {popoverContent}
      </div>
      {!withIndicatorAndHints && !popover && progressStrips}
      {indicatorAndHints}
    </div>
  );
};

export default StrongPassword;
