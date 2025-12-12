import { createContext, useCallback, useContext, useMemo } from "react";
import { ThemeContextTypes } from "./types";
import { usePersistedState } from "./hooks/usePersistedState";

export const ThemeContext = createContext<ThemeContextTypes>({
  primaryColors: "primary_light_mode_colors",
  secondaryColors: "secondary_light_mode_colors",
  accentColors: "accent_light_mode_colors",
  iconColors: "icon_light_mode_colors",
  containersColors: "containers_light_colors",
  isDarkMode: false,
  implementDarkMode: () => {},
});

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = usePersistedState("isDarkMode", false);
  const primaryColors = `${
    isDarkMode ? "primary_dark_mode_colors" : "primary_light_mode_colors"
  }`;
  const secondaryColors = `${
    isDarkMode ? "secondary_dark_mode_colors" : "secondary_light_mode_colors"
  }`;
  const accentColors = `${
    isDarkMode ? "accent_dark_mode_colors" : "accent_light_mode_colors"
  }`;
  const iconColors = `${
    isDarkMode ? "icon_dark_mode_colors" : "icon_light_mode_colors"
  }`;
  const containersColors = `${
    isDarkMode ? "containers_dark_colors" : "containers_light_colors"
  }`;
  const implementDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  const contextValue = useMemo(
    () => ({
      primaryColors,
      secondaryColors,
      accentColors,
      iconColors,
      containersColors,
      isDarkMode,
      implementDarkMode,
    }),
    [
      primaryColors,
      secondaryColors,
      accentColors,
      iconColors,
      containersColors,
      isDarkMode,
      implementDarkMode,
    ]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
