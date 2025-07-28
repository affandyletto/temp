// src/context/TabContext.js

import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export function TabProvider({ children }) {
  const [tabValue, setTabValue] = useState("surveys");
  const [miniTab, setMiniTab] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [selectBGColor, setSelectBGColor] = useState("");

  return (
    <TabContext.Provider value={{ tabValue, setTabValue, selectColor, setSelectColor, selectBGColor, setSelectBGColor, miniTab, setMiniTab }}>
      {children}
    </TabContext.Provider>
  );
}

const OneSnapTabContext = createContext();

export function OneSnapTabProvider({ children }) {
  const [tabValue, setTabValue] = useState("gallery");

  return (
    <OneSnapTabContext.Provider value={{ tabValue, setTabValue }}>
      {children}
    </OneSnapTabContext.Provider>
  );
}


export const useTab = () => useContext(TabContext);
export const useOneSnapTab = () => useContext(OneSnapTabContext);
