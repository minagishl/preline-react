declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: (plugins?: string | string[]) => void;
      cleanCollection?: (plugins?: string | string[]) => void;
      [key: string]: unknown;
    };
  }
}

export {};
