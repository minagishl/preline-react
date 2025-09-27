import React, { useState, useCallback, useRef, useEffect } from "react";
import { File, Folder, Minus, Plus } from "lucide-react";
import { cn } from "../utils/classNames";

export interface TreeNode {
  id: string;
  label: string;
  isDir: boolean;
  children?: TreeNode[];
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean;
  icon?: React.ReactNode;
  data?: unknown;
}

export interface TreeViewProps {
  data: TreeNode[];
  selectionMode?: "single" | "multiple" | "checkbox";
  showIcons?: boolean;
  autoSelectChildren?: boolean;
  alwaysOpen?: boolean;
  animationDuration?: number;
  onSelect?: (selectedItems: string[], selectedNodes: TreeNode[]) => void;
  onExpand?: (nodeId: string, expanded: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export interface TreeItemProps {
  node: TreeNode;
  selectionMode: "single" | "multiple" | "checkbox";
  showIcons: boolean;
  disabled: boolean;
  animationDuration: number;
  onToggle: (nodeId: string) => void;
  onSelect: (
    nodeId: string,
    isSelected: boolean,
    ctrlKey?: boolean,
    shiftKey?: boolean,
  ) => void;
  onCheckboxChange: (nodeId: string, checked: boolean) => void;
  isExpanded: (nodeId: string) => boolean;
  isSelected: (nodeId: string) => boolean;
  onHeightChange?: () => void;
}

const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Folder
    className={cn(
      "size-4 shrink-0 text-gray-500 dark:text-neutral-500",
      className,
    )}
    strokeWidth={1.5}
  />
);

const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <File
    className={cn(
      "size-4 shrink-0 text-gray-500 dark:text-neutral-500",
      className,
    )}
    strokeWidth={1.5}
  />
);

const ExpandIcon: React.FC<{ expanded: boolean; className?: string }> = ({
  expanded,
  className,
}) => {
  const Icon = expanded ? Minus : Plus;
  return (
    <Icon
      className={cn("size-4 text-gray-800 dark:text-neutral-200", className)}
      strokeWidth={1.5}
    />
  );
};

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  selectionMode,
  showIcons,
  disabled,
  animationDuration,
  onToggle,
  onSelect,
  onCheckboxChange,
  isExpanded,
  isSelected,
  onHeightChange,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isDisabled = disabled || node.disabled;
  const expanded = isExpanded(node.id);
  const selected = isSelected(node.id);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMeasuredHeightRef = useRef(0);
  const [shouldRenderChildren, setShouldRenderChildren] = useState(expanded);

  const updateHeight = useCallback(() => {
    const el = contentRef.current;
    if (!el || !hasChildren || isAnimatingRef.current) return;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    const cleanupAnimation = (
      handleTransitionEnd: (event?: TransitionEvent) => void,
    ) => {
      el.removeEventListener("transitionend", handleTransitionEnd);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      isAnimatingRef.current = false;
    };

    const startAnimation = (
      startHeight: number,
      targetHeight: number,
      ease: "ease-in" | "ease-out",
      onComplete: () => void,
    ) => {
      if (startHeight === targetHeight) {
        el.style.height = expanded ? "auto" : "0px";
        el.style.transition = "";
        el.style.overflow = "";
        onComplete();
        isAnimatingRef.current = false;
        return;
      }

      isAnimatingRef.current = true;

      el.style.overflow = "hidden";
      el.style.transition = "";
      el.style.height = `${startHeight}px`;

      // Force layout so the start height is applied before transitioning
      void el.offsetHeight;

      el.style.transition = `height ${animationDuration}ms ${ease}`;

      const handleTransitionEnd = (event?: TransitionEvent) => {
        if (event && (event.target !== el || event.propertyName !== "height")) {
          return;
        }
        el.style.transition = "";
        el.style.overflow = "";
        onComplete();
        cleanupAnimation(handleTransitionEnd);
      };

      el.addEventListener("transitionend", handleTransitionEnd);

      transitionTimeoutRef.current = setTimeout(() => {
        handleTransitionEnd();
      }, animationDuration + 50);

      requestAnimationFrame(() => {
        el.style.height = `${targetHeight}px`;
      });
    };

    if (expanded) {
      const targetHeight = el.scrollHeight;
      const startHeight = el.offsetHeight;
      lastMeasuredHeightRef.current = targetHeight;

      startAnimation(startHeight, targetHeight, "ease-out", () => {
        el.style.height = "auto";
        onHeightChange?.();
      });
    } else {
      const startHeight =
        el.offsetHeight || el.scrollHeight || lastMeasuredHeightRef.current;
      lastMeasuredHeightRef.current = startHeight;

      startAnimation(startHeight, 0, "ease-in", () => {
        el.style.height = "0px";
        onHeightChange?.();
        lastMeasuredHeightRef.current = 0;
        setShouldRenderChildren(false);
      });
    }
  }, [
    expanded,
    hasChildren,
    animationDuration,
    onHeightChange,
    setShouldRenderChildren,
  ]);

  useEffect(() => {
    if (!hasChildren) return;

    if (expanded && !shouldRenderChildren) {
      setShouldRenderChildren(true);
      return;
    }

    const el = contentRef.current;
    if (!el) return;

    // Check if this is the initial render
    const isInitialRender = !el.hasAttribute("data-initialized");

    if (isInitialRender) {
      // Set initial state without animation
      el.style.transition = "none";
      el.style.overflow = "";
      if (expanded) {
        el.style.height = "auto";
        lastMeasuredHeightRef.current = el.scrollHeight;
      } else {
        el.style.height = "0px";
        lastMeasuredHeightRef.current = 0;
      }
      el.setAttribute("data-initialized", "true");

      // Force a reflow to apply initial styles
      void el.offsetHeight;
    } else {
      // This is a dynamic change, animate it
      updateHeight();
    }

    // Cleanup function to clear any pending animations
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      isAnimatingRef.current = false;
    };
  }, [expanded, hasChildren, shouldRenderChildren, updateHeight]);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isDisabled && hasChildren && !isAnimatingRef.current) {
        onToggle(node.id);
      }
    },
    [isDisabled, hasChildren, onToggle, node.id],
  );

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      if (isDisabled) return;

      if (selectionMode === "checkbox") return; // Handled by checkbox

      onSelect(node.id, !selected, e.ctrlKey || e.metaKey, e.shiftKey);
    },
    [isDisabled, selectionMode, onSelect, node.id, selected],
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (!isDisabled) {
        onCheckboxChange(node.id, e.target.checked);
      }
    },
    [isDisabled, onCheckboxChange, node.id],
  );

  return (
    <div
      className="hs-accordion"
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
    >
      {/* Tree Item Heading */}
      <div
        className={cn(
          "hs-accordion-heading flex w-full items-center gap-x-0.5 rounded-md py-0.5",
          selected &&
            "hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 bg-gray-100 dark:bg-neutral-700",
          isDisabled && "opacity-50",
        )}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            className="hs-accordion-toggle flex size-6 items-center justify-center rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            aria-expanded={expanded}
            onClick={handleToggle}
            disabled={isDisabled}
            type="button"
          >
            <ExpandIcon expanded={expanded} />
          </button>
        )}

        {/* Content Area */}
        <div
          className={cn(
            "grow cursor-pointer rounded-md px-1.5",
            !isDisabled && "hover:bg-gray-50 dark:hover:bg-neutral-700/50",
            selected && "bg-gray-100 dark:bg-neutral-700",
          )}
          onClick={handleSelect}
        >
          <div
            className={cn(
              "flex items-center gap-x-3",
              selectionMode === "checkbox" && "gap-x-2",
            )}
          >
            {/* Checkbox for checkbox selection mode */}
            {selectionMode === "checkbox" && (
              <input
                type="checkbox"
                id={`checkbox-${node.id}`}
                className="mt-0.5 shrink-0 rounded-sm border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                checked={selected}
                onChange={handleCheckboxChange}
                disabled={isDisabled}
              />
            )}

            {/* Icon */}
            {showIcons &&
              (node.icon ? (
                <span className="shrink-0">{node.icon}</span>
              ) : node.isDir ? (
                <FolderIcon />
              ) : (
                <FileIcon />
              ))}

            {/* Label */}
            <div className="grow">
              <span className="text-sm text-gray-800 dark:text-neutral-200">
                {selectionMode === "checkbox" ? (
                  <label
                    htmlFor={`checkbox-${node.id}`}
                    className="flex cursor-pointer"
                  >
                    <span>{node.label}</span>
                  </label>
                ) : (
                  node.label
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          ref={contentRef}
          className="hs-accordion-content w-full overflow-hidden"
          role="group"
          aria-hidden={!expanded}
          style={{
            height: "0px",
          }}
        >
          <div
            className={cn(
              "hs-accordion-content-children relative before:absolute before:top-0 before:-ms-px before:h-full before:w-0.5 before:bg-gray-100 dark:before:bg-neutral-700",
              selectionMode === "checkbox"
                ? "ps-[1.625rem] before:start-[0.625rem]"
                : "ps-7 before:start-3",
            )}
          >
            {shouldRenderChildren &&
              node.children?.map((child) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  selectionMode={selectionMode}
                  showIcons={showIcons}
                  disabled={disabled}
                  animationDuration={animationDuration}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  onCheckboxChange={onCheckboxChange}
                  isExpanded={isExpanded}
                  isSelected={isSelected}
                  onHeightChange={updateHeight}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  selectionMode = "single",
  showIcons = true,
  autoSelectChildren = false,
  alwaysOpen = false,
  animationDuration = 200,
  onSelect,
  onExpand,
  className,
  disabled = false,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    const expanded = new Set<string>();

    const addExpandedNodes = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        if (node.expanded || alwaysOpen) {
          expanded.add(node.id);
        }
        if (node.children) {
          addExpandedNodes(node.children);
        }
      });
    };

    addExpandedNodes(data);
    return expanded;
  });

  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const lastSelectedRef = useRef<string | null>(null);

  const findNode = useCallback(
    (nodes: TreeNode[], nodeId: string): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.children) {
          const found = findNode(node.children, nodeId);
          if (found) return found;
        }
      }
      return null;
    },
    [],
  );

  const getAllDescendants = useCallback((node: TreeNode): string[] => {
    const descendants: string[] = [];
    if (node.children) {
      node.children.forEach((child) => {
        descendants.push(child.id);
        descendants.push(...getAllDescendants(child));
      });
    }
    return descendants;
  }, []);

  const findAncestorIds = useCallback(
    (
      nodes: TreeNode[],
      nodeId: string,
      ancestors: string[] = [],
    ): string[] | null => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          return ancestors;
        }
        if (node.children) {
          const result = findAncestorIds(node.children, nodeId, [
            ...ancestors,
            node.id,
          ]);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
    [],
  );

  const handleToggle = useCallback(
    (nodeId: string) => {
      setExpandedNodes((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          newSet.add(nodeId);
        }

        const isExpanded = newSet.has(nodeId);
        onExpand?.(nodeId, isExpanded);

        return newSet;
      });
    },
    [onExpand],
  );

  const handleSelect = useCallback(
    (
      nodeId: string,
      isSelected: boolean,
      ctrlKey = false,
      shiftKey = false,
    ) => {
      setSelectedNodes((prev) => {
        const newSet = new Set(prev);

        if (selectionMode === "single") {
          newSet.clear();
          if (isSelected) {
            newSet.add(nodeId);
          }
        } else if (selectionMode === "multiple") {
          if (shiftKey && lastSelectedRef.current) {
            // Range selection - implement if needed
            if (isSelected) {
              newSet.add(nodeId);
            } else {
              newSet.delete(nodeId);
            }
          } else if (ctrlKey) {
            // Toggle selection
            if (newSet.has(nodeId)) {
              newSet.delete(nodeId);
            } else {
              newSet.add(nodeId);
            }
          } else {
            // Single selection without modifiers
            newSet.clear();
            if (isSelected) {
              newSet.add(nodeId);
            }
          }
        }

        lastSelectedRef.current = nodeId;

        const selectedArray = Array.from(newSet);
        const selectedNodeObjects = selectedArray
          .map((id) => findNode(data, id))
          .filter(Boolean) as TreeNode[];
        onSelect?.(selectedArray, selectedNodeObjects);

        return newSet;
      });
    },
    [selectionMode, data, findNode, onSelect],
  );

  const handleCheckboxChange = useCallback(
    (nodeId: string, checked: boolean) => {
      setSelectedNodes((prev) => {
        const newSet = new Set(prev);
        const node = findNode(data, nodeId);

        if (!node) return prev;

        if (checked) {
          newSet.add(nodeId);

          // Auto-select children if enabled
          if (autoSelectChildren) {
            const descendants = getAllDescendants(node);
            descendants.forEach((id) => newSet.add(id));
          }

          const ancestors = findAncestorIds(data, nodeId) ?? [];
          ancestors.forEach((ancestorId) => newSet.add(ancestorId));
        } else {
          newSet.delete(nodeId);

          // Auto-deselect children if enabled
          if (autoSelectChildren) {
            const descendants = getAllDescendants(node);
            descendants.forEach((id) => newSet.delete(id));
          }
        }

        const selectedArray = Array.from(newSet);
        const selectedNodeObjects = selectedArray
          .map((id) => findNode(data, id))
          .filter(Boolean) as TreeNode[];
        onSelect?.(selectedArray, selectedNodeObjects);

        return newSet;
      });
    },
    [
      data,
      findNode,
      getAllDescendants,
      findAncestorIds,
      autoSelectChildren,
      onSelect,
    ],
  );

  return (
    <div
      className={cn("hs-accordion-treeview-root", className)}
      role="tree"
      aria-orientation="vertical"
    >
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          selectionMode={selectionMode}
          showIcons={showIcons}
          disabled={disabled}
          animationDuration={animationDuration}
          onToggle={handleToggle}
          onSelect={handleSelect}
          onCheckboxChange={handleCheckboxChange}
          isExpanded={(nodeId) => expandedNodes.has(nodeId)}
          isSelected={(nodeId) => selectedNodes.has(nodeId)}
        />
      ))}
    </div>
  );
};

export default TreeView;
