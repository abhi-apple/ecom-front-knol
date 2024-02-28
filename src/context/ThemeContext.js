import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isDarkTheme, setisDarkTheme] = useState(false);

  const toggleTheme = () => {
    setisDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
