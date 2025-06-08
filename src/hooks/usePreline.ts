import { useEffect, useState } from "react";

const usePreline = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initPreline = async () => {
      try {
        // Dynamically load preline UI
        if (typeof window !== "undefined") {
          const script = document.createElement("script");
          script.src = "/node_modules/preline/dist/preline.js";
          script.onload = () => {
            if (window.HSStaticMethods) {
              window.HSStaticMethods.autoInit();
              setInitialized(true);
            }
          };
          document.head.appendChild(script);
        }
      } catch (error) {
        console.warn("Failed to initialize Preline UI:", error);
      }
    };

    initPreline();
  }, []);

  const autoInit = () => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  };

  return { initialized, autoInit };
};

export default usePreline;
