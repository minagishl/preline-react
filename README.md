# Preline React

React component library for Preline UI - Easy integration of Preline UI components in React applications.

[View Storybook Documentation](https://minagishl.github.io/preline-react/) / [View Demo Site](https://preline-react-demo.pages.dev/)

## Features

- Easy integration of Preline UI in React
- Full TypeScript support
- Tailwind CSS based
- Responsive design support
- Accessibility support
- Customizable
- Lucide React icons, matching Preline UI's official icon resource

## Installation

```bash
# npm
npm install preline-react preline

# yarn
yarn add preline-react preline

# pnpm
pnpm add preline-react preline
```

## Setup

### 1. Tailwind CSS Configuration

Make sure Tailwind CSS is installed:

```bash
npm install -D tailwindcss @tailwindcss/forms
```

### 2. CSS File Configuration

Add the following to your CSS file (e.g., `globals.css`):

```css
@import "preline-react/styles/preline.css";
@plugin "@tailwindcss/forms";

/* Preline UI source files */
@source "../node_modules/preline/dist/*.js";

/* Preline React */
@source "../node_modules/preline-react/dist/*.js";

/* Optional Preline UI styles */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

### 3. Provider Setup

Use `PrelineProvider` at the root of your application. It initializes the official
`preline/non-auto` entry after React mounts, and manages Preline v4 themes:

```tsx
import { PrelineProvider } from "preline-react";

function App() {
  return (
    <PrelineProvider theme="theme-ocean" mode="system">
      <div className="App">{/* Your application */}</div>
    </PrelineProvider>
  );
}
```

## Usage

```tsx
import { useState } from "react";
import { Button } from "preline-react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold">Count: {count}</h1>

      <Button variant="solid" onClick={() => setCount(count + 1)}>
        Click
      </Button>
    </div>
  );
}
```

## Available Components

### Layout Components

- `Container` - Container
- `Columns` - Multi-column layout wrapper
- `Grid` - Grid
- `LayoutSplitter` - Layout Splitter component
- `Typography` - Text styling component
- `Link` - Hyperlink component
- `Divider` - Horizontal or vertical line separator
- `KBD` - Keyboard input element
- `Image` - Responsive image primitive
- `CustomScrollbar` - Scrollable content wrapper

### Basic Components

- `Alert` - Alert messages
- `Avatar` - User avatar
- `AvatarGroup` - Group of avatars
- `Badge` - Status badge
- `Blockquote` - Quote block
- `Button` - Button
- `ButtonGroup` - Group of buttons
- `Card` - Card container
- `ChatBubble` - Chat message bubble
- `Collapse` - Collapsible content
- `Device` - Device mockup
- `LegendIndicator` - Legend indicator
- `List` - List component
- `Progress` - Progress bar
- `Ratings` - Star ratings
- `Skeleton` - Loading placeholder
- `Spinner` - Loading spinner
- `StyledIcon` - Styled icon
- `Toast` - Toast notification
- `Timeline` - Timeline component
- `TreeView` - Tree View component
- `Carousel` - Accessible React carousel
- `Marquee` - Motion-safe ticker/marquee
- `Datepicker` / `DatePicker` - Native, accessible date input
- `ListGroup` / `ListGroupItem` - Grouped list primitives
- `FileUpload` / `FileUploadingProgress` - File selection and upload progress UI

### Form Components

- `Input` - Text input
- `InputGroup` - Input with addons
- `InputNumber` - Number input
- `Textarea` - Text area
- `Select` - Select dropdown
- `Checkbox` - Checkbox
- `Radio` - Radio button
- `Switch` - Toggle switch
- `FileInput` - File upload input
- `RangeSlider` - Range slider
- `ColorPicker` - Color picker
- `TimePicker` - Time picker
- `StrongPassword` - Password strength validation input
- `TogglePassword` - Password visibility toggle input
- `PinInput` - Multi-field PIN input
- `AdvancedSelect` - Semantic advanced select fallback
- `ComboBox` - Searchable option input
- `SearchBox` - Search input
- `ToggleCount` - Increment/decrement control
- `CopyMarkup` - Clipboard control

### Overlay Components

- `Modal` - Modal dialog
- `Tooltip` - Tooltip
- `Popover` - Popover
- `Dropdown` - Controlled dropdown menu
- `Offcanvas` - Controlled Preline offcanvas (drawer)
- `ContextMenu` - Right-click context menu

### Navigation Components

- `Accordion` - Accordion/collapsible sections
- `Pagination` - Pagination controls
- `Breadcrumb` - Breadcrumb trail
- `Tabs` - Accessible tab panels
- `Stepper` - Progress stepper
- `Navbar`, `Nav`, `NavLink`, `Sidebar` - Navigation layout primitives
- `MegaMenu` - Dropdown-based mega menu
- `Scrollspy` - Active-section navigation

### Data Components

- `Table` - Responsive table wrapper

### Optional Integration Components

These dependency-free React fallbacks cover Preline's third-party plugin pages. Install
and initialize the corresponding optional dependency when an application needs its full
plugin feature set.

- `AdvancedRangeSlider`, `AdvancedDatepicker`, `Clipboard`, `Datatable` / `DataTable`
- `Chart`, `Datamap`, `Confetti`, `DragAndDrop`, `FileUploader`, `Map`, `WYSIWYGEditor`

## Customization

### Themes and brand colors

The default `primary` and `secondary` variants use semantic CSS tokens, so changing
the theme updates every theme-aware component. Built-in theme values are `theme-default`,
`theme-harvest`, `theme-retro`, `theme-ocean`, `theme-bubblegum`, `theme-autumn`,
`theme-moon`, `theme-cashmere`, and `theme-olive`. `theme` remains a backwards-compatible alias for `theme-default`.

```tsx
const { setTheme, setMode, setTokens } = usePrelineTheme();

setTheme("theme-ocean");
setMode("dark");
setTokens({ primary: "#7c3aed", "primary-hover": "#6d28d9" });
```

`mode` supports `"light"`, `"dark"`, and `"system"`. The provider persists the
selected theme and mode, applies `data-theme` and `.dark` to `<html>`, and leaves
custom token values under your application’s control.

All components accept the `className` property, making it easy to apply custom styles:

```tsx
<Button className="custom-button-style">Custom Button</Button>
```

## Storybook

This project uses Storybook for component development and documentation.

### Starting Storybook

```bash
# Start the development server
pnpm run storybook
```

Open `http://localhost:6006` in your browser to view Storybook.

### Building Storybook

```bash
# Build static Storybook site
pnpm run storybook:build
```

Built files will be output to the `storybook-static` directory.

## Development & Release

### Development

```bash
# Clone the repository
git clone https://github.com/minagishl/preline-react.git
cd preline-react

# Install dependencies
pnpm install

# Start Storybook
pnpm run storybook
```

### Release

This package uses automated releases through GitHub Actions. To release a new version:

1. Create a new GitHub release:
   - Go to the [Releases page](https://github.com/minagishl/preline-react/releases) in the repository
   - Click "Create a new release"
   - Create a new tag with the format `v*.*.*` (e.g., `v1.2.3`)
   - Add a release title and description
   - Click "Publish release"

2. GitHub Actions will automatically:
   - Run tests and linting
   - Automatically update and push package.json version
   - Build the package
   - Publish to npm with public access
   - Upload the package asset to the GitHub release

**Prerequisites for automated publishing:**

- Set up `NPM_TOKEN` in GitHub repository secrets
- Ensure the npm package name is available or you have publishing rights

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please send Issues or Pull Requests for details.

## Support

If you encounter any issues, please report them at [GitHub Issues](https://github.com/minagishl/preline-react/issues).
