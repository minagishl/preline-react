import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { cn } from "../../utils/classNames";
import { GripHorizontalIcon, GripVerticalIcon } from "lucide-react";
import type { BaseProps } from "../../types";

type LayoutSplitterDirection = "horizontal" | "vertical";

type HandleIconRenderer =
  | React.ReactNode
  | ((direction: LayoutSplitterDirection) => React.ReactNode);

interface ItemMeta {
  minSize: number;
  maxSize: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const roundToTwo = (value: number) => Math.round(value * 100) / 100;

const arraysAlmostEqual = (a: number[], b: number[], epsilon = 0.001) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (Math.abs(a[i] - b[i]) > epsilon) {
      return false;
    }
  }
  return true;
};

const normalizeToTotal = (values: number[], total = 100) => {
  if (!values.length) return values;
  const sanitized = values.map((value) =>
    isFiniteNumber(value) ? Math.max(value, 0) : 0,
  );
  const sum = sanitized.reduce((acc, value) => acc + value, 0);
  if (sum <= 0) {
    const fallback = total / sanitized.length;
    return sanitized.map(() => fallback);
  }
  if (Math.abs(sum - total) < 0.0001) {
    return sanitized;
  }
  const scale = total / sum;
  return sanitized.map((value) => value * scale);
};

const enforceBounds = (values: number[], meta: ItemMeta[], total = 100) => {
  if (!values.length) return values;

  let sizes = values.map((value, index) => {
    const { minSize, maxSize } = meta[index] ?? { minSize: 0, maxSize: 100 };
    const clamped = clamp(value, minSize, maxSize);
    return clamped;
  });

  const enforceTotal = (targetTotal: number) => {
    const currentTotal = sizes.reduce((acc, value) => acc + value, 0);
    if (Math.abs(currentTotal - targetTotal) < 0.0001) return;

    if (currentTotal < targetTotal) {
      let remaining = targetTotal - currentTotal;
      const adjustable = sizes.map((size, index) => ({
        index,
        room: (meta[index]?.maxSize ?? 100) - size,
      }));

      let hasRoom = adjustable.some((entry) => entry.room > 0.0001);

      while (remaining > 0.0001 && hasRoom) {
        const totalRoom = adjustable.reduce(
          (acc, entry) => acc + Math.max(entry.room, 0),
          0,
        );
        if (totalRoom <= 0.0001) break;

        adjustable.forEach((entry) => {
          if (entry.room <= 0) return;
          const share = (entry.room / totalRoom) * remaining;
          const delta = Math.min(share, entry.room);
          sizes[entry.index] += delta;
          entry.room -= delta;
          remaining -= delta;
        });

        hasRoom = adjustable.some((entry) => entry.room > 0.0001);
      }

      if (remaining > 0.0001) {
        const distributed = remaining / sizes.length;
        sizes = sizes.map((size) => size + distributed);
      }
    } else {
      let remaining = currentTotal - targetTotal;
      const reducible = sizes.map((size, index) => ({
        index,
        room: size - (meta[index]?.minSize ?? 0),
      }));

      let hasRoom = reducible.some((entry) => entry.room > 0.0001);

      while (remaining > 0.0001 && hasRoom) {
        const totalRoom = reducible.reduce(
          (acc, entry) => acc + Math.max(entry.room, 0),
          0,
        );
        if (totalRoom <= 0.0001) break;

        reducible.forEach((entry) => {
          if (entry.room <= 0) return;
          const share = (entry.room / totalRoom) * remaining;
          const delta = Math.min(share, entry.room);
          sizes[entry.index] -= delta;
          entry.room -= delta;
          remaining -= delta;
        });

        hasRoom = reducible.some((entry) => entry.room > 0.0001);
      }

      if (remaining > 0.0001) {
        const distributed = remaining / sizes.length;
        sizes = sizes.map((size) => size - distributed);
      }
    }

    const adjustedTotal = sizes.reduce((acc, value) => acc + value, 0);
    if (Math.abs(adjustedTotal - targetTotal) > 0.0001) {
      const scale = targetTotal / adjustedTotal;
      sizes = sizes.map((size) => size * scale);
    }
  };

  enforceTotal(total);

  sizes = sizes.map((value, index) => {
    const { minSize, maxSize } = meta[index] ?? { minSize: 0, maxSize: 100 };
    return clamp(value, minSize, maxSize);
  });

  return sizes;
};

const flattenChildren = (children: React.ReactNode): ReactElement[] => {
  const result: ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === React.Fragment) {
      result.push(
        ...flattenChildren(
          (child.props as { children?: React.ReactNode }).children,
        ),
      );
    } else {
      result.push(child as ReactElement);
    }
  });
  return result;
};

export interface LayoutSplitterItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    BaseProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children?: React.ReactNode;
}

const LayoutSplitterItem = React.forwardRef<
  HTMLDivElement,
  LayoutSplitterItemProps
>(({ className, style, children, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn("min-h-0 min-w-0", className)}
    style={style}
    {...rest}
  >
    {children}
  </div>
));

LayoutSplitterItem.displayName = "LayoutSplitter.Item";

type LayoutSplitterItemElement = React.ReactElement<
  LayoutSplitterItemProps,
  typeof LayoutSplitterItem
>;

export interface LayoutSplitterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">,
    BaseProps {
  direction?: LayoutSplitterDirection;
  sizes?: number[];
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  handleClassName?: string;
  handleIcon?: HandleIconRenderer;
  disabled?: boolean;
  itemMinSize?: number;
  itemMaxSize?: number;
  keyboardStep?: number;
}

const LayoutSplitterRoot = React.forwardRef<
  HTMLDivElement,
  LayoutSplitterProps
>(
  (
    {
      direction = "horizontal",
      className,
      children,
      sizes,
      onResize,
      onResizeEnd,
      handleClassName,
      handleIcon,
      disabled = false,
      itemMinSize = 0,
      itemMaxSize = 100,
      keyboardStep = 2,
      ...rest
    },
    ref,
  ) => {
    const childElements = useMemo(() => flattenChildren(children), [children]);

    const items = useMemo(
      () =>
        childElements.filter(
          (child): child is LayoutSplitterItemElement =>
            React.isValidElement(child) && child.type === LayoutSplitterItem,
        ),
      [childElements],
    );

    useEffect(() => {
      if (childElements.length && childElements.length !== items.length) {
        // eslint-disable-next-line no-console
        console.warn(
          "LayoutSplitter children should be LayoutSplitter.Item components.",
        );
      }
    }, [childElements.length, items.length]);

    const itemCount = items.length;

    const itemsMeta = useMemo<ItemMeta[]>(() => {
      if (!itemCount) return [];
      return items.map((child) => {
        const rawMin = isFiniteNumber(child.props.minSize)
          ? child.props.minSize!
          : itemMinSize;
        const rawMax = isFiniteNumber(child.props.maxSize)
          ? child.props.maxSize!
          : itemMaxSize;
        const minSize = clamp(rawMin, 0, 100);
        const maxSize = clamp(Math.max(minSize, rawMax), minSize, 100);
        return { minSize, maxSize };
      });
    }, [itemCount, items, itemMaxSize, itemMinSize]);

    const computeDefaults = useCallback(() => {
      if (!itemCount) return [] as number[];
      const fallbackWeights = items.map((child) => {
        const value = child.props.defaultSize;
        if (isFiniteNumber(value) && value >= 0) return value;
        return 1;
      });
      const normalized = normalizeToTotal(fallbackWeights, 100);
      return enforceBounds(normalized, itemsMeta, 100);
    }, [itemCount, items, itemsMeta]);

    const defaultSizes = useMemo(() => computeDefaults(), [computeDefaults]);

    const [sizesState, setSizesState] = useState<number[]>(defaultSizes);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const mergeRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const sizesRef = useRef<number[]>(sizesState);
    useEffect(() => {
      sizesRef.current = sizesState;
    }, [sizesState]);

    const itemsMetaRef = useRef(itemsMeta);
    useEffect(() => {
      itemsMetaRef.current = itemsMeta;
    }, [itemsMeta]);

    const structureSignature = useMemo(
      () =>
        items
          .map((child, index) => {
            const key = child.key ?? index;
            const defaults = [
              child.props.defaultSize ?? "d",
              child.props.minSize ?? "min",
              child.props.maxSize ?? "max",
            ];
            return `${key}:${defaults.join(":")}`;
          })
          .join("|"),
      [items],
    );

    const signatureRef = useRef(structureSignature);
    useEffect(() => {
      if (signatureRef.current !== structureSignature) {
        const fresh = computeDefaults();
        signatureRef.current = structureSignature;
        sizesRef.current = fresh;
        setSizesState(fresh);
      }
    }, [computeDefaults, structureSignature]);

    useEffect(() => {
      if (!sizes) return;
      if (sizes.length !== itemCount) {
        if (sizes.length) {
          // eslint-disable-next-line no-console
          console.warn(
            "LayoutSplitter received a sizes prop that does not match the number of items.",
          );
        }
        return;
      }
      const sanitized = enforceBounds(
        normalizeToTotal(sizes, 100),
        itemsMetaRef.current,
        100,
      );
      if (!arraysAlmostEqual(sanitized, sizesRef.current)) {
        sizesRef.current = sanitized;
        setSizesState(sanitized);
      }
    }, [itemCount, sizes]);

    const emitResize = useCallback(
      (nextSizes: number[]) => {
        if (!onResize) return;
        onResize(nextSizes.map((value) => roundToTwo(value)));
      },
      [onResize],
    );

    const emitResizeEnd = useCallback(() => {
      if (!onResizeEnd) return;
      const latest = sizesRef.current;
      onResizeEnd(latest.map((value) => roundToTwo(value)));
    }, [onResizeEnd]);

    const applySizes = useCallback(
      (nextSizes: number[], emitEvent = true) => {
        const sanitized = enforceBounds(
          normalizeToTotal(nextSizes, 100),
          itemsMetaRef.current,
          100,
        );
        if (arraysAlmostEqual(sanitized, sizesRef.current)) {
          return sanitized;
        }
        sizesRef.current = sanitized;
        setSizesState(sanitized);
        if (emitEvent) {
          emitResize(sanitized);
        }
        return sanitized;
      },
      [emitResize],
    );

    const pointerListenersRef = useRef<{
      move: (event: PointerEvent) => void;
      up: (event: PointerEvent) => void;
    } | null>(null);
    const previousUserSelectRef = useRef<string>("");

    useEffect(
      () => () => {
        if (pointerListenersRef.current) {
          const { move, up } = pointerListenersRef.current;
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointercancel", up);
          pointerListenersRef.current = null;
        }
        if (previousUserSelectRef.current) {
          document.body.style.userSelect = previousUserSelectRef.current;
          previousUserSelectRef.current = "";
        }
      },
      [],
    );

    const startResize = useCallback(
      (index: number, event: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (event.button !== 0 && event.pointerType !== "touch") return;

        const container = containerRef.current;
        if (!container) return;

        if (pointerListenersRef.current) {
          const { move, up } = pointerListenersRef.current;
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointercancel", up);
          pointerListenersRef.current = null;
        }

        const rect = container.getBoundingClientRect();
        const containerSize =
          direction === "horizontal" ? rect.width : rect.height;
        if (containerSize <= 0) return;

        const currentSizes = sizesRef.current.slice();
        if (index < 0 || index >= currentSizes.length - 1) return;

        const startPos =
          direction === "horizontal" ? event.clientX : event.clientY;
        const sizeA = currentSizes[index];
        const sizeB = currentSizes[index + 1];
        const pairTotal = sizeA + sizeB;
        if (pairTotal <= 0) return;

        const meta = itemsMetaRef.current;
        const minA = meta[index]?.minSize ?? 0;
        const maxA = meta[index]?.maxSize ?? 100;
        const minB = meta[index + 1]?.minSize ?? 0;
        const maxB = meta[index + 1]?.maxSize ?? 100;

        const minAllowedA = Math.max(minA, pairTotal - maxB);
        const maxAllowedA = Math.min(maxA, pairTotal - minB);

        if (minAllowedA >= maxAllowedA) return;

        event.preventDefault();
        event.stopPropagation();

        previousUserSelectRef.current = document.body.style.userSelect;
        document.body.style.userSelect = "none";

        const handleMove = (moveEvent: PointerEvent) => {
          const currentPos =
            direction === "horizontal" ? moveEvent.clientX : moveEvent.clientY;
          const delta = ((currentPos - startPos) / containerSize) * 100;
          const nextA = clamp(sizeA + delta, minAllowedA, maxAllowedA);
          const nextB = pairTotal - nextA;
          const nextSizes = currentSizes.slice();
          nextSizes[index] = nextA;
          nextSizes[index + 1] = nextB;
          applySizes(nextSizes);
        };

        const handleUp = () => {
          window.removeEventListener("pointermove", handleMove);
          window.removeEventListener("pointerup", handleUp);
          window.removeEventListener("pointercancel", handleUp);
          pointerListenersRef.current = null;
          document.body.style.userSelect = previousUserSelectRef.current;
          previousUserSelectRef.current = "";
          emitResizeEnd();
        };

        pointerListenersRef.current = { move: handleMove, up: handleUp };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
        window.addEventListener("pointercancel", handleUp);
      },
      [applySizes, direction, disabled, emitResizeEnd],
    );

    const adjustViaKeyboard = useCallback(
      (index: number, delta: number) => {
        const current = sizesRef.current;
        if (index < 0 || index >= current.length - 1) return;

        const sizeA = current[index];
        const sizeB = current[index + 1];
        const pairTotal = sizeA + sizeB;
        if (pairTotal <= 0) return;

        const meta = itemsMetaRef.current;
        const minA = meta[index]?.minSize ?? 0;
        const maxA = meta[index]?.maxSize ?? 100;
        const minB = meta[index + 1]?.minSize ?? 0;
        const maxB = meta[index + 1]?.maxSize ?? 100;

        const minAllowedA = Math.max(minA, pairTotal - maxB);
        const maxAllowedA = Math.min(maxA, pairTotal - minB);

        const nextA = clamp(sizeA + delta, minAllowedA, maxAllowedA);
        const nextB = pairTotal - nextA;
        if (Math.abs(nextA - sizeA) < 0.001) return;

        const nextSizes = current.slice();
        nextSizes[index] = nextA;
        nextSizes[index + 1] = nextB;
        applySizes(nextSizes);
      },
      [applySizes],
    );

    const resolvedKeyboardStep = Math.max(keyboardStep, 0.1);

    const handleKeyDown = useCallback(
      (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        let delta = 0;
        if (direction === "horizontal") {
          if (event.key === "ArrowLeft") delta = -resolvedKeyboardStep;
          if (event.key === "ArrowRight") delta = resolvedKeyboardStep;
        } else {
          if (event.key === "ArrowUp") delta = -resolvedKeyboardStep;
          if (event.key === "ArrowDown") delta = resolvedKeyboardStep;
        }

        if (!delta) return;
        event.preventDefault();
        adjustViaKeyboard(index, delta);
      },
      [adjustViaKeyboard, disabled, direction, resolvedKeyboardStep],
    );

    const isHorizontal = direction === "horizontal";

    const renderHandleIcon = useCallback(() => {
      if (typeof handleIcon === "function") {
        return handleIcon(direction);
      }
      if (handleIcon) {
        return React.isValidElement(handleIcon)
          ? React.cloneElement(handleIcon)
          : handleIcon;
      }
      return isHorizontal ? (
        <GripVerticalIcon className="size-3.5 shrink-0" />
      ) : (
        <GripHorizontalIcon className="size-3.5 shrink-0" />
      );
    }, [direction, handleIcon, isHorizontal]);

    return (
      <div
        ref={mergeRefs}
        className={cn(
          isHorizontal ? "flex" : "flex flex-col",
          "h-full w-full",
          className,
        )}
        data-orientation={direction}
        {...rest}
      >
        {items.map((child, index) => {
          const sizeValue = sizesState[index] ?? 0;
          const itemKey = child.key ?? index;
          const cloned = React.cloneElement(child, {
            style: {
              flexGrow: sizeValue,
              flexShrink: 1,
              flexBasis: 0,
              ...child.props.style,
            },
          });

          return (
            <React.Fragment key={itemKey}>
              {cloned}
              {index < itemCount - 1 && (
                <div
                  className={cn(
                    "relative flex shrink-0",
                    isHorizontal
                      ? "border-s border-gray-200 dark:border-neutral-700"
                      : "border-t border-gray-200 dark:border-neutral-700",
                    handleClassName,
                  )}
                  style={{
                    touchAction: "none",
                  }}
                  aria-orientation={isHorizontal ? "vertical" : "horizontal"}
                  aria-label="Resize panels"
                >
                  <button
                    className={cn(
                      "absolute start-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-600 dark:hover:bg-neutral-900",
                      "flex items-center justify-center",
                      isHorizontal ? "h-6 w-4" : "h-4 w-6",
                      disabled
                        ? "cursor-default opacity-70"
                        : isHorizontal
                          ? "cursor-col-resize"
                          : "cursor-row-resize",
                    )}
                    aria-hidden="true"
                    type="button"
                    onPointerDown={(event) => startResize(index, event)}
                    onKeyDown={handleKeyDown(index)}
                    disabled={disabled}
                  >
                    {renderHandleIcon()}
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

LayoutSplitterRoot.displayName = "LayoutSplitter";

const LayoutSplitter = Object.assign(LayoutSplitterRoot, {
  Item: LayoutSplitterItem,
});

export default LayoutSplitter;
