import { useCallback, useEffect, useState } from "react";
import { HSStaticMethods } from "preline/non-auto";

const usePreline = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    HSStaticMethods.autoInit();
    setInitialized(true);
  }, []);

  const autoInit = useCallback((plugins?: string | string[]) => {
    HSStaticMethods.autoInit(plugins);
    setInitialized(true);
  }, []);

  return { initialized, autoInit };
};

export default usePreline;
