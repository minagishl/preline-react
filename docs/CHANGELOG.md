# Changelog

## v2.0.0 (2026-07-12)

### Added

- **Private reference sync**: Added `pnpm sync:preline-docs`, which snapshots all public `/docs/` pages and their required CSS/JavaScript into an ignored local cache for visual comparison.
- **Independent component modules**: Added dedicated public modules for the Preline v4 additions, replacing grouped public exports with component-specific import paths.
- **Coverage audit**: Added `docs/COMPONENT_COVERAGE.md`, which maps every component in Preline UI's official v4.2 Components index to this package's public API.
- **Preline v4.2 compatibility**: Updated the package target for Preline UI v4.2, including its current React lifecycle model.
- **Themes**: Added semantic token styles and all built-in Preline theme selectors: default, Harvest, Retro, Ocean, Bubblegum, Autumn, Moon, Cashmere, and Olive.
- **Theme API**: `PrelineProvider` now supports theme, color mode, persisted preferences, and runtime CSS token overrides through `usePrelineTheme`.
- **Components**: Added React implementations for Breadcrumb, Tabs, Pagination, Stepper, Dropdown, Offcanvas, Table, Carousel, and Marquee.
- **Official component coverage**: Added Image, CustomScrollbar, Datepicker, ListGroup, FileUploadingProgress, FileUpload, Navbar, Nav, NavLink, Sidebar, MegaMenu, Scrollspy, ContextMenu, Offcanvas, AdvancedSelect, ComboBox, SearchBox, ToggleCount, CopyMarkup, and PinInput exports.
- **Optional integration coverage**: Added dependency-free React fallbacks for AdvancedRangeSlider, AdvancedDatepicker, Clipboard, Datatable, Chart, Datamap, Confetti, DragAndDrop, FileUploader, Map, and WYSIWYGEditor. Apps may replace these with the corresponding optional third-party packages when they need their full feature set.

### Changed

- **Preline design tokens**: Aligned the public theme stylesheet with the Preline v4.2 semantic token schema, official `theme-default` name, color scales, interaction tokens, dark mode values, and built-in theme palettes.
- **Button**: Matched primary button variants to the official v4.2 border, hover, focus, soft, and link token usage.
- **Icons**: Replaced inline SVG icons in library components with `lucide-react` components. Lucide is the icon library listed in Preline UI's official resources, so icons now have stable names, shared sizing props, and a single upgrade path.
- **Initialization**: Replaced the browser-only `/node_modules` script injection with the official `preline/non-auto` import and explicit `HSStaticMethods.autoInit()` call.
- **Button**: Added semantic `primary` and `secondary` colors; `primary` is now the default and follows the selected Preline theme.
- **Styles**: Added the public `preline-react/styles/preline.css` entry point for Tailwind, Preline variants, dark mode, and theme tokens.

### Compatibility notes

- Preline UI is DOM-driven rather than a native React component package. For conditionally mounted plugin markup, call `autoInit()` after rendering or use the provider context.
- Existing fixed Tailwind button colors (`blue`, `teal`, `red`, and others) remain supported for backwards compatibility.

---

## v1.1.1 (2025-09-29)

### Added

- **Grid**: New grid component for flexible layout arrangement
- **Container**: New container component for consistent content wrapping
- **Columns**: New columns component for multi-column layouts
- **LayoutSplitter**: New layout splitter component for resizable panes

### Changed

- **Layout**: Merged layout and content components for better organization
- **Stories**: Updated to use render props pattern for improved flexibility
- **Styles**: Updated components to use padding instead of margin for better consistency

### Fixed

- **TypeScript**: Resolved typecheck errors across components
- **Imports**: Removed unnecessary JavaScript imports for cleaner code
- **Documentation**: Removed non-existent component references

---

## v1.1.0 (2025-09-27)

### Added

- **TreeView**: New tree view component for hierarchical data display
- **Skeleton**: New skeleton loading component for better UX

### Changed

- **KBD**: Added color variants support for keyboard key display component
- **Icons**: Replaced SVG icons with Lucide icons for better consistency

### Fixed

- **KBD**: Updated component variants for improved styling

---

## v1.0.0 (2025-06-11)

Preline React is the first stable release of a component library that makes it easy to use Preline UI in React applications. Fully compatible with TypeScript and based on Tailwind CSS, it supports responsive design and accessibility, and is customizable to suit different use cases.

## Main Components

For more details, please refer to the [Storybook](https://minagishl.github.io/preline-react/)

<details>
<summary><strong>Content</strong></summary>

- Typography
- Link
- Divider
- KBD

</details>

<details>
<summary><strong>Basic</strong></summary>

- Alert
- Avatar
- AvatarGroup
- Badge
- Blockquote
- Button
- ButtonGroup
- Card
- ChatBubble
- Collapse
- Device
- LegendIndicator
- List
- Progress
- Ratings
- Spinner
- StyledIcon
- Timeline
- Toast

</details>

<details>
<summary><strong>Forms</strong></summary>

- Input
- InputGroup
- InputNumber
- Textarea
- Select
- Checkbox
- Radio
- Switch
- FileInput
- RangeSlider
- ColorPicker
- TimePicker
- StrongPassword
- TogglePassword

</details>

<details>
<summary><strong>Overlay</strong></summary>

- Modal
- Tooltip
- Popover

</details>

<details>
<summary><strong>Navigation</strong></summary>

- Accordion
- Pagination

</details>

A Storybook documentation is also included, allowing you to preview usage examples for each component.

## Other

An automated release workflow using GitHub Actions is in place. Simply pushing a tag after version updates triggers testing, building, and publishing to both npm and GitHub.

This concludes the main features of version v1.0.0. We look forward to your feedback.
