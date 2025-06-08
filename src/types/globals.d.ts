declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
      [key: string]: any;
    };
  }
}

export {};
