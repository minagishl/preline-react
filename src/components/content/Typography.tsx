import React, { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/classNames";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "mark"
  | "del"
  | "s"
  | "ins"
  | "u"
  | "strong"
  | "em"
  | "gradient";

const variantMapping: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold dark:text-white",
  h2: "text-3xl font-bold dark:text-white",
  h3: "text-2xl font-bold dark:text-white",
  h4: "text-xl font-bold dark:text-white",
  h5: "text-lg font-bold dark:text-white",
  h6: "text-base font-bold dark:text-white",
  p: "text-base dark:text-white",
  small: "text-sm",
  mark: "bg-yellow-200 dark:bg-yellow-800",
  del: "line-through",
  s: "line-through",
  ins: "no-underline",
  u: "underline",
  strong: "font-bold",
  em: "italic",
  gradient:
    "bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500 text-transparent",
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  as: Component = "p",
  variant = "p",
  children,
  className,
  ...props
}) => {
  const variantClass = variantMapping[variant];

  return (
    <Component className={cn(variantClass, className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
