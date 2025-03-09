import { createContext, useContext, useState } from "react";
import Hello from '../app/(meeting)/hello'
const MesajContext = createContext();

export const MesajProvider  = ({ children }) => {
  const [mesaj, setMesaj] = useState("Merhaba Dünya!");

  return (
    <MesajContext.Provider value={{ mesaj, setMesaj }}>
      <Hello />
    </MesajContext.Provider>
  );
};

export const useMesaj = () => useContext(MesajContext);
