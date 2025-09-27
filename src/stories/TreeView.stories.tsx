import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  AlignEndHorizontal,
  AlignStartVertical,
  AlignEndVertical,
  AlignStartHorizontal,
  Bold as BoldIcon,
  Highlighter as HighlighterIcon,
  Italic as ItalicIcon,
  Palette as PaletteIcon,
  PenTool,
  PaintRoller,
  Type as TypeIcon,
  Underline as UnderlineIcon,
} from "lucide-react";
import Alert from "../components/Alert";
import KBD from "../components/content/KBD";
import { TreeView, TreeNode } from "../components/TreeView";

const meta: Meta<typeof TreeView> = {
  title: "Components/Tree View",
  component: TreeView,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A hierarchical tree view component for displaying file systems, navigation structures, or any nested data. Supports multiple selection modes, drag & drop, and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selectionMode: {
      control: "select",
      options: ["single", "multiple", "checkbox"],
      description: "The selection mode for tree items",
    },
    showIcons: {
      control: "boolean",
      description: "Whether to show folder and file icons",
    },
    autoSelectChildren: {
      control: "boolean",
      description:
        "Automatically select/deselect children when parent is selected (checkbox mode only)",
    },
    alwaysOpen: {
      control: "boolean",
      description: "Keep all expandable nodes always open",
    },
    disabled: {
      control: "boolean",
      description: "Disable the entire tree view",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data matching the official Preline UI documentation
const basicTreeData: TreeNode[] = [
  {
    id: "assets",
    label: "assets",
    isDir: true,
    expanded: true,
    children: [
      {
        id: "css",
        label: "css",
        isDir: true,
        expanded: true,
        children: [
          {
            id: "main",
            label: "main",
            isDir: true,
            expanded: true,
            children: [
              {
                id: "main.css",
                label: "main.css",
                isDir: false,
              },
              {
                id: "docs.css",
                label: "docs.css",
                isDir: false,
              },
              {
                id: "README.txt",
                label: "README.txt",
                isDir: false,
                disabled: true,
              },
            ],
          },
          {
            id: "tailwind",
            label: "tailwind",
            isDir: true,
            children: [
              {
                id: "input.css",
                label: "input.css",
                isDir: false,
              },
            ],
          },
          {
            id: ".gitignore",
            label: ".gitignore",
            isDir: false,
          },
        ],
      },
      {
        id: "img",
        label: "img",
        isDir: true,
        children: [
          {
            id: "hero.jpg",
            label: "hero.jpg",
            isDir: false,
          },
          {
            id: "tailwind.png",
            label: "tailwind.png",
            isDir: false,
          },
          {
            id: "untitled.png",
            label: "untitled.png",
            isDir: false,
          },
        ],
      },
      {
        id: "js",
        label: "js",
        isDir: true,
        children: [
          {
            id: "preline.jpg",
            label: "preline.jpg",
            isDir: false,
          },
        ],
      },
    ],
  },
  {
    id: "scripts",
    label: "scripts",
    isDir: true,
    children: [
      {
        id: "preline.js",
        label: "preline.js",
        isDir: false,
      },
      {
        id: "tailwind.js",
        label: "tailwind.js",
        isDir: false,
      },
      {
        id: "www.js",
        label: "www.js",
        isDir: false,
      },
    ],
  },
  {
    id: "templates",
    label: "templates",
    isDir: true,
    disabled: true,
    children: [
      {
        id: "index.html",
        label: "index.html",
        isDir: false,
      },
    ],
  },
];

// Custom icons example data
const customIconsTreeData: TreeNode[] = [
  {
    id: "text",
    label: "Text",
    isDir: true,
    expanded: true,
    icon: (
      <TypeIcon
        className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
        strokeWidth={1.5}
      />
    ),
    children: [
      {
        id: "frame",
        label: "Frame",
        isDir: true,
        children: [
          {
            id: "alignment",
            label: "Alignment",
            isDir: true,
            expanded: true,
            children: [
              {
                id: "left",
                label: "Left",
                isDir: false,
                icon: (
                  <AlignStartVertical
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    strokeWidth={1.5}
                  />
                ),
              },
              {
                id: "right",
                label: "Right",
                isDir: false,
                icon: (
                  <AlignEndVertical
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    strokeWidth={1.5}
                  />
                ),
              },
              {
                id: "top",
                label: "Top",
                isDir: false,
                icon: (
                  <AlignStartHorizontal
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    strokeWidth={1.5}
                  />
                ),
              },
              {
                id: "bottom",
                label: "Bottom",
                isDir: false,
                icon: (
                  <AlignEndHorizontal
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    strokeWidth={1.5}
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        id: "font",
        label: "Font",
        isDir: true,
        children: [
          {
            id: "bold",
            label: "Bold",
            isDir: false,
            icon: (
              <BoldIcon
                className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                strokeWidth={1.5}
              />
            ),
          },
          {
            id: "italic",
            label: "Italic",
            isDir: false,
            icon: (
              <ItalicIcon
                className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                strokeWidth={1.5}
              />
            ),
          },
          {
            id: "underline",
            label: "Underline",
            isDir: false,
            icon: (
              <UnderlineIcon
                className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                strokeWidth={1.5}
              />
            ),
          },
        ],
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    isDir: true,
    icon: (
      <PaintRoller
        className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
        strokeWidth={1.5}
      />
    ),
    children: [
      {
        id: "color-picker",
        label: "Color Picker",
        isDir: false,
        icon: (
          <PaletteIcon
            className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
            strokeWidth={1.5}
          />
        ),
      },
      {
        id: "highlighter",
        label: "Highlighter",
        isDir: false,
        icon: (
          <HighlighterIcon
            className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
            strokeWidth={1.5}
          />
        ),
      },
      {
        id: "pen",
        label: "Pen",
        isDir: false,
        icon: (
          <PenTool
            className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
            strokeWidth={1.5}
          />
        ),
      },
    ],
  },
  {
    id: "files",
    label: "Files",
    isDir: true,
    children: [
      {
        id: "design.txt",
        label: "design.txt",
        isDir: false,
      },
      {
        id: "tutorials.txt",
        label: "tutorials.txt",
        isDir: false,
      },
    ],
  },
];

// Interactive story component for testing selection
const InteractiveTreeView = ({
  data,
  ...args
}: { data: TreeNode[] } & Partial<React.ComponentProps<typeof TreeView>>) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <TreeView
        {...args}
        data={data}
        onSelect={(selected) => {
          setSelectedItems(selected);
          console.log("Selected items:", selected);
        }}
        onExpand={(nodeId, expanded) => {
          console.log(`Node ${nodeId} ${expanded ? "expanded" : "collapsed"}`);
        }}
      />

      {selectedItems.length > 0 && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-neutral-800">
          <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-neutral-200">
            Selected Items ({selectedItems.length}):
          </h4>
          <div className="space-y-1">
            {selectedItems.map((item) => (
              <div
                key={item}
                className="text-sm text-gray-600 dark:text-neutral-400"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const BasicUsage: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "single",
    showIcons: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const CloseCurrentlyOpened: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "single",
    showIcons: true,
    alwaysOpen: false,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const CustomizeIcons: Story = {
  args: {
    data: customIconsTreeData,
    selectionMode: "single",
    showIcons: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const MultipleSelection: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "multiple",
    showIcons: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Alert soft variant="info" className="mb-4">
        Hold{" "}
        <KBD variant="light" size="xs">
          Ctrl
        </KBD>{" "}
        or{" "}
        <KBD variant="light" size="xs">
          Cmd
        </KBD>{" "}
        key to select multiple items
      </Alert>
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const CheckboxSelection: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "checkbox",
    showIcons: true,
    autoSelectChildren: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Alert soft variant="success" className="mb-4">
        ✓ Select folders/files by checking the checkboxes. Children are
        automatically selected when parent is selected.
      </Alert>
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const CheckboxWithoutAutoSelect: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "checkbox",
    showIcons: true,
    autoSelectChildren: false,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Alert soft variant="warning" className="mb-4">
        Checkbox selection without auto-selecting children
      </Alert>
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const NoIcons: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "single",
    showIcons: false,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const AlwaysOpen: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "single",
    showIcons: true,
    alwaysOpen: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Alert soft variant="info" className="mb-4">
        All folders remain always open
      </Alert>
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const DisabledTreeView: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "single",
    showIcons: true,
    disabled: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Alert soft variant="danger" className="mb-4">
        Entire tree view is disabled
      </Alert>
      <InteractiveTreeView {...args} />
    </div>
  ),
};

export const LargeDataset: Story = {
  args: {
    data: [
      {
        id: "root",
        label: "Large Project",
        isDir: true,
        expanded: true,
        children: Array.from({ length: 50 }, (_, i) => ({
          id: `folder-${i}`,
          label: `Folder ${i + 1}`,
          isDir: true,
          children: Array.from({ length: 20 }, (_, j) => ({
            id: `file-${i}-${j}`,
            label: `file-${j + 1}.txt`,
            isDir: false,
          })),
        })),
      },
    ],
    selectionMode: "multiple",
    showIcons: true,
  },
  render: (args) => (
    <div className="h-96 w-full max-w-md overflow-auto rounded-lg border border-gray-200 dark:border-neutral-700">
      <div className="p-4">
        <InteractiveTreeView {...args} />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    data: basicTreeData,
    selectionMode: "single",
    showIcons: true,
    autoSelectChildren: false,
    alwaysOpen: false,
    disabled: false,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <InteractiveTreeView {...args} />
    </div>
  ),
};
