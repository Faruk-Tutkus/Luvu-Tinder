import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [colors, setColors] = useState({
    bgColor: "#FFDCCC",
    bColor: "#B7B1F2",
    iColor: "#FDB7EA",
    tColor: '#41444B',
    btColor: '#41444B'
  });
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setColors(JSON.parse(savedTheme));
      }
    };
    loadTheme();
  }, []);

  const updateTheme = (newColors) => {
    setColors(newColors);
    AsyncStorage.setItem("theme", JSON.stringify(newColors));
  };
  return (
    <ThemeContext.Provider value={{ colors, setColors, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
