# Changelog

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
