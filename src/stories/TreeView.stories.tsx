import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeView, TreeNode } from "../components/TreeView";
import KBD from "../components/content/KBD";
import Alert from "../components/Alert";
import { useState } from "react";

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
      <svg
        className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 7 4 4 20 4 20 7"></polyline>
        <line x1="9" x2="15" y1="20" y2="20"></line>
        <line x1="12" x2="12" y1="4" y2="20"></line>
      </svg>
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
                  <svg
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="9" height="6" x="6" y="14" rx="2"></rect>
                    <rect width="16" height="6" x="6" y="4" rx="2"></rect>
                    <path d="M2 2v20"></path>
                  </svg>
                ),
              },
              {
                id: "right",
                label: "Right",
                isDir: false,
                icon: (
                  <svg
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="16" height="6" x="2" y="4" rx="2"></rect>
                    <rect width="9" height="6" x="9" y="14" rx="2"></rect>
                    <path d="M22 22V2"></path>
                  </svg>
                ),
              },
              {
                id: "top",
                label: "Top",
                isDir: false,
                icon: (
                  <svg
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="6" height="16" x="4" y="6" rx="2"></rect>
                    <rect width="6" height="9" x="14" y="6" rx="2"></rect>
                    <path d="M22 2H2"></path>
                  </svg>
                ),
              },
              {
                id: "bottom",
                label: "Bottom",
                isDir: false,
                icon: (
                  <svg
                    className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="6" height="16" x="4" y="2" rx="2"></rect>
                    <rect width="6" height="9" x="14" y="9" rx="2"></rect>
                    <path d="M22 22H2"></path>
                  </svg>
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
              <svg
                className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path>
              </svg>
            ),
          },
          {
            id: "italic",
            label: "Italic",
            isDir: false,
            icon: (
              <svg
                className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" x2="10" y1="4" y2="4"></line>
                <line x1="14" x2="5" y1="20" y2="20"></line>
                <line x1="15" x2="9" y1="4" y2="20"></line>
              </svg>
            ),
          },
          {
            id: "underline",
            label: "Underline",
            isDir: false,
            icon: (
              <svg
                className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
                <line x1="4" x2="20" y1="20" y2="20"></line>
              </svg>
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
      <svg
        className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="16" height="6" x="2" y="2" rx="2"></rect>
        <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
        <rect width="4" height="6" x="8" y="16" rx="1"></rect>
      </svg>
    ),
    children: [
      {
        id: "color-picker",
        label: "Color Picker",
        isDir: false,
        icon: (
          <svg
            className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
          </svg>
        ),
      },
      {
        id: "highlighter",
        label: "Highlighter",
        isDir: false,
        icon: (
          <svg
            className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 11-6 6v3h9l3-3"></path>
            <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path>
          </svg>
        ),
      },
      {
        id: "pen",
        label: "Pen",
        isDir: false,
        icon: (
          <svg
            className="size-4 shrink-0 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
            <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
            <path d="m2.3 2.3 7.286 7.286"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
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
