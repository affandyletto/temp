// src/context/TabContext.js

import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export function TabProvider({ children }) {
  const [tabValue, setTabValue] = useState("surveys");

  return (
    <TabContext.Provider value={{ tabValue, setTabValue }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTab = () => useContext(TabContext);
