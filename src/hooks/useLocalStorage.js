import { useState } from 'react';

/**
 * Custom hook that synchronizes a React state with window.localStorage.
 * Behaves identically to useState, supporting direct values and functional state updates.
 * Gracefully handles JSON serialization/deserialization exceptions and restricted/private browsing modes.
 *
 * @template T
 * @param {string} key - The key name under which the state is saved in localStorage
 * @param {T} initialValue - The fallback value if key doesn't exist or is invalid
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A stateful value and a function to update it
 */
export const useLocalStorage = (key, initialValue) => {
  // Read value from local storage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      try {
        return JSON.parse(item);
      } catch (parseError) {
        console.error(`Error parsing JSON for localStorage key "${key}":`, parseError);
        return initialValue;
      }
    } catch (error) {
      // Handles security exceptions when access to localStorage is denied (e.g. private mode, cookies disabled)
      console.warn(`localStorage is disabled or inaccessible for key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Updates state value and persists it to localStorage.
   *
   * @param {T | ((val: T) => T)} value - The new state value or a functional state updater
   * @returns {void}
   */
  const setValue = (value) => {
    try {
      // Allow value to be a callback function to mirror useState API
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update state
      setStoredValue(valueToStore);
      
      // Save to local storage
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (storageError) {
        console.warn(`Failed to set item in localStorage for key "${key}":`, storageError);
      }
    } catch (error) {
      console.error(`Error in useLocalStorage setValue for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
