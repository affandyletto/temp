// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { apiGet } from '@/api/client';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    setLoading(true)
    const token = Cookies.get('authToken');

    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setOrganizations([]);
      setSelectedOrganization(null);
      setLoading(false);
      return;
    }

    try {
      // Get user and organizations
      const [userData, orgsData] = await Promise.all([
        apiGet('/User/api/me'),
        apiGet('/Organization/api/organizations')
      ]);
      var orgsArray=orgsData.results

      setUser(userData);
      setOrganizations(orgsArray);
      setIsLoggedIn(true);

      // Set selected organization
      const lastOrgId = Cookies.get('selectedOrgId');
      const selectedOrg = lastOrgId 
        ? orgsArray.find(org => org.id.toString() === lastOrgId.toString())
        : orgsArray[0];
      
      setSelectedOrganization(selectedOrg);

    } catch (error) {
      Cookies.remove('authToken');
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Check auth on app start/refresh
  useEffect(() => {
    checkAuth();
  }, []);

  const selectOrganization = (org) => {
    setSelectedOrganization(org);
    Cookies.set('selectedOrgId', org.id);
  };

  const value = { 
    user,
    setUser,
    organizations, 
    setOrganizations, 
    selectedOrganization, 
    setSelectedOrganization,
    selectOrganization,
    loading,
    isLoggedIn,
    checkAuth
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);