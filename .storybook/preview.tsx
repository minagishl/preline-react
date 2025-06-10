import type { Preview } from "@storybook/react-vite";
import "../src/styles/globals.css";
import React, { useEffect } from "react";

declare global {
  interface Window {
    HSStaticMethods: {
      autoInit: () => void;
    };
  }
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a1a1a",
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
          html.classList.remove("light", "dark");
          html.classList.add(theme);
        }
      }, [theme]);

      useEffect(() => {
        import("preline/dist/preline.js").then(() => {
          window.HSStaticMethods.autoInit();
        });
      }, []);

      return <Story />;
    },
  ],
  tags: ["autodocs"],
  initialGlobals: {
    backgrounds: { value: "light" },
  },
};

export default preview;
