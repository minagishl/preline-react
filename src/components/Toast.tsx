import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  HTMLAttributes,
  ReactNode,
  ButtonHTMLAttributes,
} from "react";
import classNames from "classnames";

export type ToastVariant = "solid" | "soft" | "default";
export type ToastColor = "dark" | "gray" | "teal" | "blue" | "red" | "yellow";

interface ToastContextProps {
  variant: ToastVariant;
  color: ToastColor;
  onDismiss?: () => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a Toast provider");
  }
  return context;
};

const CloseButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { onDismiss, variant, color } = useToast();

  const softCloseButtonColorClasses: Record<string, string> = {
    dark: "dark:text-white",
    gray: "dark:text-white",
    teal: "text-teal-800 dark:text-teal-200",
    blue: "text-blue-800 dark:text-blue-200",
    red: "text-red-800 dark:text-red-200",
    yellow: "text-yellow-800 dark:text-yellow-200",
  };

  const buttonClasses = classNames(
    "inline-flex shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100",
    variant === "soft" && color
      ? softCloseButtonColorClasses[color]
      : "text-white hover:text-white",
    variant === "default" && "text-gray-800 dark:text-white",
    className,
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onDismiss}
      aria-label="Close"
      {...props}
    >
      <span className="sr-only">Close</span>
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
    </button>
  );
};
CloseButton.displayName = "Toast.CloseButton";

const solidColorClasses: Record<ToastColor, string> = {
  dark: "bg-gray-800 text-white dark:bg-neutral-900",
  gray: "bg-gray-500 text-white dark:bg-neutral-700",
  teal: "bg-teal-500 text-white",
  blue: "bg-blue-500 text-white",
  red: "bg-red-500 text-white",
  yellow: "bg-yellow-500 text-white",
};

const softColorClasses: Record<ToastColor, string> = {
  dark: "shadow-none bg-gray-100 border border-gray-200 text-gray-800 dark:bg-white/10 dark:border-white/20 dark:text-white",
  gray: "shadow-none bg-gray-50 border border-gray-200 text-gray-600 dark:bg-white/10 dark:border-white/10 dark:text-neutral-400",
  teal: "shadow-none bg-teal-100 border border-teal-200 text-teal-800 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500",
  blue: "shadow-none bg-blue-100 border border-blue-200 text-blue-800 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500",
  red: "shadow-none bg-red-100 border border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500",
  yellow:
    "shadow-none bg-yellow-100 border border-yellow-200 text-yellow-800 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500",
};

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  color?: ToastColor;
  onDismiss?: () => void;
  children: ReactNode;
  show?: boolean;
}

type ToastComponent = FC<ToastProps> & {
  CloseButton: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
};

const Toast: ToastComponent = ({
  className,
  variant = "default",
  color = "blue",
  onDismiss,
  children,
  show = true,
  ...props
}) => {
  const [isRendered, setIsRendered] = useState(show);

  useEffect(() => {
    if (show) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const toastClasses = classNames(
    "max-w-xs rounded-xl shadow-lg",
    "transition-all duration-300",
    {
      "translate-x-5 opacity-0": !show,
    },
    {
      "bg-white border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700":
        variant === "default",
    },
    variant === "solid" && solidColorClasses[color],
    variant === "soft" && softColorClasses[color],
    className,
  );

  if (!isRendered) {
    return null;
  }

  return (
    <ToastContext.Provider value={{ variant, color, onDismiss }}>
      <div className={toastClasses} role="alert" {...props}>
        {children}
      </div>
    </ToastContext.Provider>
  );
};

Toast.CloseButton = CloseButton;

export default Toast;
