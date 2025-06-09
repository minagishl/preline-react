import { ReactNode, InputHTMLAttributes } from "react";

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

// Modal types
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  backdrop?: boolean;
  keyboard?: boolean;
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
