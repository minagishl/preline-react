import { ReactNode, HTMLAttributes, InputHTMLAttributes } from "react";

// Common props interface
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// Size variations
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// Color variants
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

// Button specific types
export interface ButtonProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: "solid" | "outline" | "ghost" | "soft";
  size?: Size;
  color?: Color;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

// Modal types
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  backdrop?: boolean;
  keyboard?: boolean;
}

// Alert types
export interface AlertProps extends BaseProps {
  variant?: Color;
  style?: "solid" | "soft" | "bordered-top" | "bordered-left" | "card";
  dismissible?: boolean;
  onDismiss?: () => void;
  title?: string;
  description?: string;
  icon?: ReactNode;
  showIcon?: boolean;
  list?: string[];
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  }>;
  link?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  animated?: boolean;
}

// Form field types
export interface FormFieldProps extends BaseProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  fieldSize?: Size;
}

// Input types
export interface InputProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> {
  fieldSize?: Size;
}

// Preline UI context types
export interface PrelineContextValue {
  initialized: boolean;
  autoInit: () => void;
}

// Component ref types
export type ComponentRef<T = HTMLElement> = React.Ref<T>;
