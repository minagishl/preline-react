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
  extends
    FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> {
  fieldSize?: Size;
}

// Preline UI context types
export interface PrelineContextValue {
  initialized: boolean;
  autoInit: (plugins?: string | string[]) => void;
}

export type PrelineTheme =
  | "theme"
  | "theme-harvest"
  | "theme-retro"
  | "theme-ocean"
  | "theme-bubblegum"
  | "theme-autumn"
  | "theme-moon"
  | "theme-cashmere"
  | "theme-olive";

export type ColorMode = "light" | "dark" | "system";

export interface PrelineThemeContextValue {
  theme: PrelineTheme;
  mode: ColorMode;
  resolvedMode: "light" | "dark";
  setTheme: (theme: PrelineTheme) => void;
  setMode: (mode: ColorMode) => void;
  setTokens: (tokens: Record<string, string>) => void;
}

// Component ref types
export type ComponentRef<T = HTMLElement> = React.Ref<T>;
