import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [colors, setColors] = useState({
    bgColor: "#FFDCCC",
    bColor: "B7B1F2",
    iColor: "FDB7EA",
    tColor: '#41444B'
  });

  return (
    <ThemeContext.Provider value={{ colors, setColors }}>
      {children}
    </ThemeContext.Provider>
  );
}
