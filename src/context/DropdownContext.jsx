// src/context/DropdownContext.jsx

import { createContext, useContext, useState } from "react";
import { dropdownProgress } from "@/data/dropdown";

const DropdownContext = createContext();

export function DropdownProvider({ children }) {
  const [selected, setSelected] = useState(dropdownProgress[0]);
  const [options] = useState(dropdownProgress);

  const value = { selected, setSelected, options };
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
}

export const useDropdown = () => useContext(DropdownContext);
