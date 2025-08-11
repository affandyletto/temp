import api from './client';
import Cookies from 'js-cookie';

export const login = async (credentials) => {
  const response = await api.post('/User/api/token', {
    username: credentials.username,
    password: credentials.password,
    userAgent: credentials.userAgent || navigator.userAgent,
    initialLogin: credentials.initialLogin,
    start_time: new Date().toISOString()
  });
  
  // Store tokens after successful login
  if (response.access) {
    Cookies.set('authToken', response.access, { expires: 7 });
    Cookies.set('refreshToken', response.refresh, { expires: 30 });
  }
  
  return response;
};

export const logout = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      await api.post('/User/api/logout', { 
        refresh: refreshToken,
        userAgent: navigator.userAgent,
        end_time: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Continue with cleanup even if API call fails
  } finally {
    // Clear tokens
    Cookies.remove('authToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    
    // Clear any cached data
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login
    window.location.href = '/login';
  }
};

export const isAuthenticated = () => {
  return !!Cookies.get('authToken');
};