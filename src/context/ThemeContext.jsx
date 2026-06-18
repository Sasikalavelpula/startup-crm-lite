import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * Context object for managing theme mode.
 */
export const ThemeContext = createContext(undefined);

/**
 * ThemeProvider component that manages the theme state.
 * Syncs the theme selection state with the 'dark' CSS class on document.documentElement.
 * Persists theme preferences in localStorage.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {React.ReactElement} The Context Provider wrapping child elements
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    'startup-crm-theme',
    false
  );

  // Effect to add or remove 'dark' class from the document root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggles the active theme mode between light and dark.
   *
   * @returns {void}
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom React hook to access theme state and toggle handler.
 * Throws an error if used outside a ThemeProvider wrapper.
 *
 * @throws {Error} If context is undefined (hook used outside ThemeProvider)
 * @returns {{ isDarkMode: boolean, toggleTheme: Function }} Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
