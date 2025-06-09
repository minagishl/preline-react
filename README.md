# Preline React

React component library for Preline UI - Easy integration of Preline UI components in React applications.

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
@import "preline/variants.css";

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
import { Button, Card, Alert, Badge, Avatar } from "preline-react";

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
    </Card>
  );
}
```

### Form Components

```tsx
import { Input, Textarea, Select, Checkbox, Switch } from "preline-react";

function ContactForm() {
  return (
    <form>
      <Input type="text" placeholder="Enter your name" label="Name" />

      <Textarea placeholder="Enter your message" rows={4} />

      <Select>
        <option value="">Select category</option>
        <option value="inquiry">Inquiry</option>
        <option value="support">Support</option>
      </Select>

      <Checkbox>I agree to the terms and conditions</Checkbox>

      <Switch>Receive email notifications</Switch>
    </form>
  );
}
```

### Navigation Components

```tsx
import { Navbar, Sidebar, Breadcrumb, Tabs } from "preline-react";

function NavigationExample() {
  return (
    <div>
      <Navbar>
        <div>Logo</div>
        <div>Menu</div>
      </Navbar>

      <Breadcrumb>
        <li>Home</li>
        <li>Products</li>
        <li>Details</li>
      </Breadcrumb>

      <Tabs>
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </Tabs>
    </div>
  );
}
```

## Available Components

> **Note:** Currently, only the basic components have been implemented.

### Basic Components

- `Button` - Button
- `Card` - Card
- `Alert` - Alert
- `Badge` - Badge
- `Avatar` - Avatar
- `Toast` - Toast
- `Progress` - Progress bar

### Form Components

- `Input` - Text input
- `Textarea` - Text area
- `Select` - Select
- `Checkbox` - Checkbox
- `Radio` - Radio button
- `Switch` - Switch

### Navigation Components

- `Navbar` - Navigation bar
- `Sidebar` - Sidebar
- `Breadcrumb` - Breadcrumb
- `Pagination` - Pagination
- `Tabs` - Tabs

### Layout Components

- `Container` - Container
- `Grid` - Grid

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
