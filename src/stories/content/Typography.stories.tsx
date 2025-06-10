import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography, {
  TypographyProps,
} from "../../components/content/Typography";

const meta: Meta<TypographyProps> = {
  title: "Content/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    as: {
      control: "text",
    },
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "small",
        "mark",
        "del",
        "s",
        "ins",
        "u",
        "strong",
        "em",
        "gradient",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<TypographyProps>;

export const Default: Story = {
  args: {
    children: "Typography",
    variant: "p",
    as: "p",
  },
};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1" as="h1">
        h1. Preline heading
      </Typography>
      <Typography variant="h2" as="h2">
        h2. Preline heading
      </Typography>
      <Typography variant="h3" as="h3">
        h3. Preline heading
      </Typography>
      <Typography variant="h4" as="h4">
        h4. Preline heading
      </Typography>
      <Typography variant="h5" as="h5">
        h5. Preline heading
      </Typography>
      <Typography variant="h6" as="h6">
        h6. Preline heading
      </Typography>
    </div>
  ),
};

export const InlineElements: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography as="p">
        You can use the mark tag to{" "}
        <Typography as="mark" variant="mark">
          highlight
        </Typography>{" "}
        text.
      </Typography>
      <Typography as="p">
        <Typography as="del" variant="del">
          This line of text is meant to be treated as deleted text.
        </Typography>
      </Typography>
      <Typography as="p">
        <Typography as="s" variant="s">
          This line of text is meant to be treated as no longer accurate.
        </Typography>
      </Typography>
      <Typography as="p">
        <Typography as="ins" variant="ins">
          This line of text is meant to be treated as an addition to the
          document.
        </Typography>
      </Typography>
      <Typography as="p">
        <Typography as="u" variant="u">
          This line of text will render as underlined.
        </Typography>
      </Typography>
      <Typography as="p">
        <Typography as="small" variant="small">
          This line of text is meant to be treated as fine print.
        </Typography>
      </Typography>
      <Typography as="p">
        <Typography as="strong" variant="strong">
          This line rendered as bold text.
        </Typography>
      </Typography>
      <Typography as="p">
        <Typography as="em" variant="em">
          This line rendered as italicized text.
        </Typography>
      </Typography>
    </div>
  ),
};

export const Gradient: Story = {
  args: {
    children: "This is a gradient text",
    variant: "gradient",
  },
};

export const Polymorphic: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1" as="div">
        This is an h1 style in a div
      </Typography>
      <Typography variant="p" as="span">
        This is a p style in a span
      </Typography>
      <Typography variant="gradient" as="h2">
        This is a gradient h2
      </Typography>
    </div>
  ),
};
