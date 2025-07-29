// src/context/DropdownContext.jsx

import { createContext, useContext, useState } from "react";
import { dropdownProgress } from "@/data/dropdown";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser]=useState(null)
  const [organizations, setOrganizations] = useState([])
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  const value = { organizations, setOrganizations, selectedOrganization, setSelectedOrganization };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
