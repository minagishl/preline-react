# Preline React

React component library for Preline UI - Easy integration of Preline UI components in React applications.

[View Storybook Documentation](https://minagishl.github.io/preline-react/)

## Features

- Easy integration of Preline UI in React
- Full TypeScript support
- Tailwind CSS based
- Responsive design support
- Accessibility support
- Customizable

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
@import "tailwindcss";
@plugin "@tailwindcss/forms";

/* Preline UI */
@import "preline/variants.css";
@source "../node_modules/preline/dist/*.js";

/* Optional Preline UI styles */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

### 3. Provider Setup

Use `PrelineProvider` at the root of your application:

```tsx
import { PrelineProvider } from "preline-react";

function App() {
  return (
    <PrelineProvider>
      <div className="App">{/* Your application */}</div>
    </PrelineProvider>
  );
}
```

## Usage

### Basic Components

```tsx
import {
  Button,
  Card,
  Alert,
  Badge,
  Avatar,
  AvatarGroup,
  Progress,
  Spinner,
  Toast,
} from "preline-react";

function MyComponent() {
  return (
    <Card>
      <h2>Hello Preline React!</h2>

      <Button
        variant="solid"
        color="primary"
        onClick={() => alert("Button clicked!")}
      >
        Click me
      </Button>

      <Alert variant="success" dismissible>
        Operation completed successfully!
      </Alert>

      <Badge color="primary" variant="soft">
        New Feature
      </Badge>

      <Avatar src="/path/to/avatar.jpg" alt="User avatar" size="md" />

      <AvatarGroup>
        <Avatar src="/avatar1.jpg" alt="User 1" />
        <Avatar src="/avatar2.jpg" alt="User 2" />
        <Avatar src="/avatar3.jpg" alt="User 3" />
      </AvatarGroup>

      <Progress value={75} max={100} />

      <Spinner size="md" />

      <Toast variant="success">Task completed successfully!</Toast>
    </Card>
  );
}
```

### Form Components

```tsx
import {
  Input,
  InputGroup,
  Textarea,
  Select,
  Checkbox,
  Switch,
  FileInput,
  RangeSlider,
  ColorPicker,
  TimePicker,
} from "preline-react";

function ContactForm() {
  return (
    <form>
      <Input type="text" placeholder="Enter your name" label="Name" />

      <InputGroup>
        <Input type="email" placeholder="Enter email" />
      </InputGroup>

      <Textarea placeholder="Enter your message" rows={4} />

      <Select>
        <option value="">Select category</option>
        <option value="inquiry">Inquiry</option>
        <option value="support">Support</option>
      </Select>

      <FileInput accept="image/*" />

      <RangeSlider min={0} max={100} value={50} />

      <ColorPicker />

      <TimePicker />

      <Checkbox>I agree to the terms and conditions</Checkbox>

      <Switch>Receive email notifications</Switch>
    </form>
  );
}
```

### Overlay & Interactive Components

```tsx
import {
  Modal,
  Tooltip,
  Accordion,
  Collapse,
  Timeline,
  Blockquote,
} from "preline-react";

function InteractiveExample() {
  return (
    <div>
      <Modal>
        <h2>Modal Title</h2>
        <p>Modal content goes here.</p>
      </Modal>

      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>

      <Accordion>
        <div>Accordion Item 1</div>
        <div>Accordion Item 2</div>
      </Accordion>

      <Collapse>
        <summary>Click to expand</summary>
        <p>Collapsible content</p>
      </Collapse>

      <Timeline>
        <div>Timeline item 1</div>
        <div>Timeline item 2</div>
      </Timeline>

      <Blockquote>"This is an inspirational quote."</Blockquote>
    </div>
  );
}
```

## Available Components

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
- `Spinner` - Loading spinner
- `StyledIcon` - Styled icon
- `Timeline` - Timeline component
- `Toast` - Toast notification

### Form Components

- `Input` - Text input
- `InputGroup` - Input with addons
- `Textarea` - Text area
- `Select` - Select dropdown
- `Checkbox` - Checkbox
- `Radio` - Radio button
- `Switch` - Toggle switch
- `FileInput` - File upload input
- `RangeSlider` - Range slider
- `ColorPicker` - Color picker
- `TimePicker` - Time picker

### Layout Components

- `Container` - Container
- `Grid` - Grid

### Overlay Components

- `Modal` - Modal dialog
- `Tooltip` - Tooltip
- `Popover` - Popover

### Navigation Components

- `Accordion` - Accordion/collapsible sections
- `Pagination` - Pagination controls

## Customization

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

1. Update the version in `package.json` (if not using automated versioning)
2. Create and push a git tag with the format `v*.*.*`:

```bash
# Example for version 1.2.3
git tag v1.2.3
git push origin v1.2.3
```

3. GitHub Actions will automatically:
   - Run tests and linting
   - Build the package
   - Publish to npm with public access
   - Create a GitHub release

**Prerequisites for automated publishing:**

- Set up `NPM_TOKEN` in GitHub repository secrets
- Ensure the npm package name is available or you have publishing rights

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please send Issues or Pull Requests for details.

## Support

If you encounter any issues, please report them at [GitHub Issues](https://github.com/minagishl/preline-react/issues).
