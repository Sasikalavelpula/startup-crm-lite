import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Expose AuthContext
export const AuthContext = createContext(undefined);

/**
 * AuthProvider component managing the user session.
 * Automatically attempts to restore session on mount if a token is present in localStorage.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token'));
  const [isLoading, setIsLoading] = useState(true);

  // On mount: check for token and verify user profile session
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('crm-token');
      if (storedToken) {
        try {
          // Attempt to load the active user profile from backend
          const response = await authService.getProfile();
          if (response.success && response.data) {
            setUser(response.data);
            setToken(storedToken);
          } else {
            // If API response indicates failure, purge stale local session
            handleSessionPurge();
          }
        } catch (error) {
          console.error('Failed to restore auth session:', error);
          handleSessionPurge();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Helper to reset local state and localStorage keys on invalid/expired sessions
   */
  const handleSessionPurge = () => {
    localStorage.removeItem('crm-token');
    setUser(null);
    setToken(null);
  };

  /**
   * Performs user login, sets localStorage crm-token, and updates user/token states.
   * @param {string} email 
   * @param {string} password 
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.data) {
        const { token: receivedToken, user: receivedUser } = response.data;
        localStorage.setItem('crm-token', receivedToken);
        setToken(receivedToken);
        setUser(receivedUser);
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Performs user registration, sets localStorage crm-token, and updates user/token states.
   * @param {string} name 
   * @param {string} email 
   * @param {string} password 
   */
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.register(name, email, password);
      if (response.success && response.data) {
        const { token: receivedToken, user: receivedUser } = response.data;
        localStorage.setItem('crm-token', receivedToken);
        setToken(receivedToken);
        setUser(receivedUser);
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cleans the session token from client state, deletes crm-token from localStorage,
   * and redirects user to the login screen.
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    // Use window.location redirect to force a clean re-initialization of all React state variables
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom React hook to consume AuthContext values safely.
 * Throws an error if used outside an AuthProvider wrapper.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
