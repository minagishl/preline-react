import React, { ElementType, HTMLAttributes } from "react";
import { BaseProps } from "../../types";
import { cn } from "../../utils/classNames";
import type { GapSize } from "./Columns";
import "../../utils/gridSafelist"; // Tailwind safelist for dynamic classes

type GridBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
type ResponsiveValue<T> = Partial<Record<GridBreakpoint, T>>;

type GridColumnsCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridRowsCount = 1 | 2 | 3 | 4 | 5 | 6;

export type GridTemplateColumnsValue = GridColumnsCount | "none";
export type GridTemplateRowsValue = GridRowsCount | "none";
export type GridAutoFlowValue =
  | "row"
  | "col"
  | "dense"
  | "row-dense"
  | "col-dense";
export type GridJustifyItemsValue = "start" | "end" | "center" | "stretch";
export type GridAlignItemsValue = "start" | "end" | "center" | "stretch";

type GridColumnLine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type GridRowLine = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type GridColumnSpanValue = GridColumnsCount | "full";
export type GridRowSpanValue = GridRowsCount | "full";
export type GridColumnLineValue = GridColumnLine | "auto";
export type GridRowLineValue = GridRowLine | "auto";
export type GridItemSelfValue = "auto" | "start" | "end" | "center" | "stretch";

type ClassValue = string | number;

const formatClassName = (prefix: string, value?: ClassValue | null) =>
  value !== undefined && value !== null ? `${prefix}-${value}` : undefined;

const formatResponsiveClasses = (
  prefix: string,
  values?: ResponsiveValue<ClassValue>,
) =>
  values
    ? (
        Object.entries(values) as [GridBreakpoint, ClassValue | undefined][]
      )?.map(([breakpoint, value]) =>
        value !== undefined && value !== null
          ? `${breakpoint}:${prefix}-${value}`
          : undefined,
      )
    : [];

export interface GridProps
  extends Omit<HTMLAttributes<HTMLElement>, "className">,
    BaseProps {
  as?: ElementType;
  inline?: boolean;
  columns?: GridTemplateColumnsValue;
  columnsResponsive?: ResponsiveValue<GridTemplateColumnsValue>;
  rows?: GridTemplateRowsValue;
  rowsResponsive?: ResponsiveValue<GridTemplateRowsValue>;
  flow?: GridAutoFlowValue;
  flowResponsive?: ResponsiveValue<GridAutoFlowValue>;
  gap?: GapSize;
  gapResponsive?: ResponsiveValue<GapSize>;
  gapX?: GapSize;
  gapXResponsive?: ResponsiveValue<GapSize>;
  gapY?: GapSize;
  gapYResponsive?: ResponsiveValue<GapSize>;
  justifyItems?: GridJustifyItemsValue;
  justifyItemsResponsive?: ResponsiveValue<GridJustifyItemsValue>;
  alignItems?: GridAlignItemsValue;
  alignItemsResponsive?: ResponsiveValue<GridAlignItemsValue>;
}

const GridComponent: React.FC<GridProps> = ({
  as: Component = "div",
  inline = false,
  columns = 1,
  columnsResponsive,
  rows,
  rowsResponsive,
  flow,
  flowResponsive,
  gap,
  gapResponsive,
  gapX,
  gapXResponsive,
  gapY,
  gapYResponsive,
  justifyItems,
  justifyItemsResponsive,
  alignItems,
  alignItemsResponsive,
  className,
  children,
  ...rest
}) => (
  <Component
    className={cn(
      inline ? "inline-grid" : "grid",
      formatClassName("grid-cols", columns),
      ...formatResponsiveClasses("grid-cols", columnsResponsive),
      formatClassName("grid-rows", rows),
      ...formatResponsiveClasses("grid-rows", rowsResponsive),
      formatClassName("grid-flow", flow),
      ...formatResponsiveClasses("grid-flow", flowResponsive),
      formatClassName("gap", gap),
      ...formatResponsiveClasses("gap", gapResponsive),
      formatClassName("gap-x", gapX),
      ...formatResponsiveClasses("gap-x", gapXResponsive),
      formatClassName("gap-y", gapY),
      ...formatResponsiveClasses("gap-y", gapYResponsive),
      formatClassName("justify-items", justifyItems),
      ...formatResponsiveClasses("justify-items", justifyItemsResponsive),
      formatClassName("items", alignItems),
      ...formatResponsiveClasses("items", alignItemsResponsive),
      className,
    )}
    {...rest}
  >
    {children}
  </Component>
);

GridComponent.displayName = "Grid";

export interface GridItemProps
  extends Omit<HTMLAttributes<HTMLElement>, "className">,
    BaseProps {
  as?: ElementType;
  colSpan?: GridColumnSpanValue;
  colSpanResponsive?: ResponsiveValue<GridColumnSpanValue>;
  colStart?: GridColumnLineValue;
  colStartResponsive?: ResponsiveValue<GridColumnLineValue>;
  colEnd?: GridColumnLineValue;
  colEndResponsive?: ResponsiveValue<GridColumnLineValue>;
  rowSpan?: GridRowSpanValue;
  rowSpanResponsive?: ResponsiveValue<GridRowSpanValue>;
  rowStart?: GridRowLineValue;
  rowStartResponsive?: ResponsiveValue<GridRowLineValue>;
  rowEnd?: GridRowLineValue;
  rowEndResponsive?: ResponsiveValue<GridRowLineValue>;
  justifySelf?: GridItemSelfValue;
  justifySelfResponsive?: ResponsiveValue<GridItemSelfValue>;
  alignSelf?: GridItemSelfValue;
  alignSelfResponsive?: ResponsiveValue<GridItemSelfValue>;
}

const GridItem: React.FC<GridItemProps> = ({
  as: Component = "div",
  colSpan,
  colSpanResponsive,
  colStart,
  colStartResponsive,
  colEnd,
  colEndResponsive,
  rowSpan,
  rowSpanResponsive,
  rowStart,
  rowStartResponsive,
  rowEnd,
  rowEndResponsive,
  justifySelf,
  justifySelfResponsive,
  alignSelf,
  alignSelfResponsive,
  className,
  children,
  ...rest
}) => (
  <Component
    className={cn(
      formatClassName("col-span", colSpan),
      ...formatResponsiveClasses("col-span", colSpanResponsive),
      formatClassName("col-start", colStart),
      ...formatResponsiveClasses("col-start", colStartResponsive),
      formatClassName("col-end", colEnd),
      ...formatResponsiveClasses("col-end", colEndResponsive),
      formatClassName("row-span", rowSpan),
      ...formatResponsiveClasses("row-span", rowSpanResponsive),
      formatClassName("row-start", rowStart),
      ...formatResponsiveClasses("row-start", rowStartResponsive),
      formatClassName("row-end", rowEnd),
      ...formatResponsiveClasses("row-end", rowEndResponsive),
      formatClassName("justify-self", justifySelf),
      ...formatResponsiveClasses("justify-self", justifySelfResponsive),
      formatClassName("self", alignSelf),
      ...formatResponsiveClasses("self", alignSelfResponsive),
      className,
    )}
    {...rest}
  >
    {children}
  </Component>
);

GridItem.displayName = "Grid.Item";

const Grid = Object.assign(GridComponent, { Item: GridItem });

export default Grid;
