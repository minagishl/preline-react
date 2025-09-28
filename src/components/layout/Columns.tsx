import React, { ElementType, HTMLAttributes } from "react";
import { BaseProps } from "../../types";
import { cn } from "../../utils/classNames";

export type ColumnValue =
  | "auto"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

export type ColumnBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type GapSize =
  | "0"
  | "px"
  | "0.5"
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "52"
  | "56"
  | "60"
  | "64"
  | "72"
  | "80"
  | "96";

type GapPrefix = "gap" | "gap-x" | "gap-y";

const COLUMN_CLASS_MAP: Record<ColumnValue, string> = {
  auto: "columns-auto",
  "1": "columns-1",
  "2": "columns-2",
  "3": "columns-3",
  "4": "columns-4",
  "5": "columns-5",
  "6": "columns-6",
  "7": "columns-7",
  "8": "columns-8",
  "9": "columns-9",
  "10": "columns-10",
  "11": "columns-11",
  "12": "columns-12",
  "3xs": "columns-3xs",
  "2xs": "columns-2xs",
  xs: "columns-xs",
  sm: "columns-sm",
  md: "columns-md",
  lg: "columns-lg",
  xl: "columns-xl",
  "2xl": "columns-2xl",
  "3xl": "columns-3xl",
  "4xl": "columns-4xl",
  "5xl": "columns-5xl",
  "6xl": "columns-6xl",
  "7xl": "columns-7xl",
};

const RESPONSIVE_COLUMNS_CLASS_MAP: Record<
  ColumnBreakpoint,
  Record<ColumnValue, string>
> = {
  sm: {
    auto: "sm:columns-auto",
    "1": "sm:columns-1",
    "2": "sm:columns-2",
    "3": "sm:columns-3",
    "4": "sm:columns-4",
    "5": "sm:columns-5",
    "6": "sm:columns-6",
    "7": "sm:columns-7",
    "8": "sm:columns-8",
    "9": "sm:columns-9",
    "10": "sm:columns-10",
    "11": "sm:columns-11",
    "12": "sm:columns-12",
    "3xs": "sm:columns-3xs",
    "2xs": "sm:columns-2xs",
    xs: "sm:columns-xs",
    sm: "sm:columns-sm",
    md: "sm:columns-md",
    lg: "sm:columns-lg",
    xl: "sm:columns-xl",
    "2xl": "sm:columns-2xl",
    "3xl": "sm:columns-3xl",
    "4xl": "sm:columns-4xl",
    "5xl": "sm:columns-5xl",
    "6xl": "sm:columns-6xl",
    "7xl": "sm:columns-7xl",
  },
  md: {
    auto: "md:columns-auto",
    "1": "md:columns-1",
    "2": "md:columns-2",
    "3": "md:columns-3",
    "4": "md:columns-4",
    "5": "md:columns-5",
    "6": "md:columns-6",
    "7": "md:columns-7",
    "8": "md:columns-8",
    "9": "md:columns-9",
    "10": "md:columns-10",
    "11": "md:columns-11",
    "12": "md:columns-12",
    "3xs": "md:columns-3xs",
    "2xs": "md:columns-2xs",
    xs: "md:columns-xs",
    sm: "md:columns-sm",
    md: "md:columns-md",
    lg: "md:columns-lg",
    xl: "md:columns-xl",
    "2xl": "md:columns-2xl",
    "3xl": "md:columns-3xl",
    "4xl": "md:columns-4xl",
    "5xl": "md:columns-5xl",
    "6xl": "md:columns-6xl",
    "7xl": "md:columns-7xl",
  },
  lg: {
    auto: "lg:columns-auto",
    "1": "lg:columns-1",
    "2": "lg:columns-2",
    "3": "lg:columns-3",
    "4": "lg:columns-4",
    "5": "lg:columns-5",
    "6": "lg:columns-6",
    "7": "lg:columns-7",
    "8": "lg:columns-8",
    "9": "lg:columns-9",
    "10": "lg:columns-10",
    "11": "lg:columns-11",
    "12": "lg:columns-12",
    "3xs": "lg:columns-3xs",
    "2xs": "lg:columns-2xs",
    xs: "lg:columns-xs",
    sm: "lg:columns-sm",
    md: "lg:columns-md",
    lg: "lg:columns-lg",
    xl: "lg:columns-xl",
    "2xl": "lg:columns-2xl",
    "3xl": "lg:columns-3xl",
    "4xl": "lg:columns-4xl",
    "5xl": "lg:columns-5xl",
    "6xl": "lg:columns-6xl",
    "7xl": "lg:columns-7xl",
  },
  xl: {
    auto: "xl:columns-auto",
    "1": "xl:columns-1",
    "2": "xl:columns-2",
    "3": "xl:columns-3",
    "4": "xl:columns-4",
    "5": "xl:columns-5",
    "6": "xl:columns-6",
    "7": "xl:columns-7",
    "8": "xl:columns-8",
    "9": "xl:columns-9",
    "10": "xl:columns-10",
    "11": "xl:columns-11",
    "12": "xl:columns-12",
    "3xs": "xl:columns-3xs",
    "2xs": "xl:columns-2xs",
    xs: "xl:columns-xs",
    sm: "xl:columns-sm",
    md: "xl:columns-md",
    lg: "xl:columns-lg",
    xl: "xl:columns-xl",
    "2xl": "xl:columns-2xl",
    "3xl": "xl:columns-3xl",
    "4xl": "xl:columns-4xl",
    "5xl": "xl:columns-5xl",
    "6xl": "xl:columns-6xl",
    "7xl": "xl:columns-7xl",
  },
  "2xl": {
    auto: "2xl:columns-auto",
    "1": "2xl:columns-1",
    "2": "2xl:columns-2",
    "3": "2xl:columns-3",
    "4": "2xl:columns-4",
    "5": "2xl:columns-5",
    "6": "2xl:columns-6",
    "7": "2xl:columns-7",
    "8": "2xl:columns-8",
    "9": "2xl:columns-9",
    "10": "2xl:columns-10",
    "11": "2xl:columns-11",
    "12": "2xl:columns-12",
    "3xs": "2xl:columns-3xs",
    "2xs": "2xl:columns-2xs",
    xs: "2xl:columns-xs",
    sm: "2xl:columns-sm",
    md: "2xl:columns-md",
    lg: "2xl:columns-lg",
    xl: "2xl:columns-xl",
    "2xl": "2xl:columns-2xl",
    "3xl": "2xl:columns-3xl",
    "4xl": "2xl:columns-4xl",
    "5xl": "2xl:columns-5xl",
    "6xl": "2xl:columns-6xl",
    "7xl": "2xl:columns-7xl",
  },
};

const GAP_CLASS_MAP: Record<GapPrefix, Record<GapSize, string>> = {
  gap: {
    "0": "gap-0",
    px: "gap-px",
    "0.5": "gap-0.5",
    "1": "gap-1",
    "1.5": "gap-1.5",
    "2": "gap-2",
    "2.5": "gap-2.5",
    "3": "gap-3",
    "3.5": "gap-3.5",
    "4": "gap-4",
    "5": "gap-5",
    "6": "gap-6",
    "7": "gap-7",
    "8": "gap-8",
    "9": "gap-9",
    "10": "gap-10",
    "11": "gap-11",
    "12": "gap-12",
    "14": "gap-14",
    "16": "gap-16",
    "20": "gap-20",
    "24": "gap-24",
    "28": "gap-28",
    "32": "gap-32",
    "36": "gap-36",
    "40": "gap-40",
    "44": "gap-44",
    "48": "gap-48",
    "52": "gap-52",
    "56": "gap-56",
    "60": "gap-60",
    "64": "gap-64",
    "72": "gap-72",
    "80": "gap-80",
    "96": "gap-96",
  },
  "gap-x": {
    "0": "gap-x-0",
    px: "gap-x-px",
    "0.5": "gap-x-0.5",
    "1": "gap-x-1",
    "1.5": "gap-x-1.5",
    "2": "gap-x-2",
    "2.5": "gap-x-2.5",
    "3": "gap-x-3",
    "3.5": "gap-x-3.5",
    "4": "gap-x-4",
    "5": "gap-x-5",
    "6": "gap-x-6",
    "7": "gap-x-7",
    "8": "gap-x-8",
    "9": "gap-x-9",
    "10": "gap-x-10",
    "11": "gap-x-11",
    "12": "gap-x-12",
    "14": "gap-x-14",
    "16": "gap-x-16",
    "20": "gap-x-20",
    "24": "gap-x-24",
    "28": "gap-x-28",
    "32": "gap-x-32",
    "36": "gap-x-36",
    "40": "gap-x-40",
    "44": "gap-x-44",
    "48": "gap-x-48",
    "52": "gap-x-52",
    "56": "gap-x-56",
    "60": "gap-x-60",
    "64": "gap-x-64",
    "72": "gap-x-72",
    "80": "gap-x-80",
    "96": "gap-x-96",
  },
  "gap-y": {
    "0": "gap-y-0",
    px: "gap-y-px",
    "0.5": "gap-y-0.5",
    "1": "gap-y-1",
    "1.5": "gap-y-1.5",
    "2": "gap-y-2",
    "2.5": "gap-y-2.5",
    "3": "gap-y-3",
    "3.5": "gap-y-3.5",
    "4": "gap-y-4",
    "5": "gap-y-5",
    "6": "gap-y-6",
    "7": "gap-y-7",
    "8": "gap-y-8",
    "9": "gap-y-9",
    "10": "gap-y-10",
    "11": "gap-y-11",
    "12": "gap-y-12",
    "14": "gap-y-14",
    "16": "gap-y-16",
    "20": "gap-y-20",
    "24": "gap-y-24",
    "28": "gap-y-28",
    "32": "gap-y-32",
    "36": "gap-y-36",
    "40": "gap-y-40",
    "44": "gap-y-44",
    "48": "gap-y-48",
    "52": "gap-y-52",
    "56": "gap-y-56",
    "60": "gap-y-60",
    "64": "gap-y-64",
    "72": "gap-y-72",
    "80": "gap-y-80",
    "96": "gap-y-96",
  },
};

export interface ColumnsProps
  extends Omit<HTMLAttributes<HTMLElement>, "className">,
    BaseProps {
  as?: ElementType;
  columns?: ColumnValue;
  responsive?: Partial<Record<ColumnBreakpoint, ColumnValue>>;
  gap?: GapSize;
  gapX?: GapSize;
  gapY?: GapSize;
}

const getColumnsClass = (value?: ColumnValue) =>
  value ? COLUMN_CLASS_MAP[value] : undefined;

const getResponsiveColumns = (
  responsive?: Partial<Record<ColumnBreakpoint, ColumnValue>>,
) =>
  responsive
    ? (
        Object.entries(responsive) as [
          ColumnBreakpoint,
          ColumnValue | undefined,
        ][]
      ).map(([breakpoint, value]) =>
        value ? RESPONSIVE_COLUMNS_CLASS_MAP[breakpoint][value] : undefined,
      )
    : [];

const getGapClass = (prefix: GapPrefix, value?: GapSize) =>
  value ? GAP_CLASS_MAP[prefix][value] : undefined;

const Columns: React.FC<ColumnsProps> = ({
  as: Component = "div",
  columns = "1",
  responsive,
  gap,
  gapX,
  gapY,
  className,
  children,
  ...rest
}) => (
  <Component
    className={cn(
      getColumnsClass(columns),
      ...getResponsiveColumns(responsive),
      getGapClass("gap", gap),
      getGapClass("gap-x", gapX),
      getGapClass("gap-y", gapY),
      className,
    )}
    {...rest}
  >
    {children}
  </Component>
);

export default Columns;
