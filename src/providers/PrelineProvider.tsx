import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ColorMode,
  PrelineContextValue,
  PrelineTheme,
  PrelineThemeContextValue,
} from "../types";
import usePreline from "../hooks/usePreline";

const PrelineContext = createContext<PrelineContextValue | undefined>(
  undefined,
);
const PrelineThemeContext = createContext<PrelineThemeContextValue | undefined>(
  undefined,
);

export const usePrelineContext = () => {
  const context = useContext(PrelineContext);
  if (context === undefined) {
    throw new Error("usePrelineContext must be used within a PrelineProvider");
  }
  return context;
};

export const usePrelineTheme = () => {
  const context = useContext(PrelineThemeContext);
  if (!context)
    throw new Error("usePrelineTheme must be used within a PrelineProvider");
  return context;
};

interface PrelineProviderProps {
  children: React.ReactNode;
  theme?: PrelineTheme;
  mode?: ColorMode;
  tokens?: Record<string, string>;
  storageKey?: string;
}

const PrelineProvider: React.FC<PrelineProviderProps> = ({
  children,
  theme: initialTheme = "theme",
  mode: initialMode = "system",
  tokens: initialTokens = {},
  storageKey = "preline-react",
}) => {
  const prelineState = usePreline();
  const [theme, setTheme] = useState<PrelineTheme>(initialTheme);
  const [mode, setMode] = useState<ColorMode>(initialMode);
  const [tokens, setTokens] = useState(initialTokens);
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        const value = JSON.parse(saved) as {
          theme?: PrelineTheme;
          mode?: ColorMode;
        };
        if (value.theme) setTheme(value.theme);
        if (value.mode) setMode(value.mode);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      setResolvedMode(
        mode === "system" ? (media.matches ? "dark" : "light") : mode,
      );
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", resolvedMode === "dark");
    Object.entries(tokens).forEach(([name, value]) =>
      root.style.setProperty(name.startsWith("--") ? name : `--${name}`, value),
    );
    window.localStorage.setItem(storageKey, JSON.stringify({ theme, mode }));
  }, [theme, mode, resolvedMode, storageKey, tokens]);

  const themeValue = useMemo(
    () => ({ theme, mode, resolvedMode, setTheme, setMode, setTokens }),
    [theme, mode, resolvedMode, tokens],
  );

  return (
    <PrelineContext.Provider value={prelineState}>
      <PrelineThemeContext.Provider value={themeValue}>
        {children}
      </PrelineThemeContext.Provider>
    </PrelineContext.Provider>
  );
};

export default PrelineProvider;
