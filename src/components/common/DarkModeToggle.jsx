import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * DarkModeToggle - Displays a sliding pill toggle switch along with Sun/Moon icons
 * and explicit visual labels showing Light/Dark theme states. Uses CSS transform animations.
 *
 * @component
 * @returns {React.ReactElement} The rendered DarkModeToggle component
 */
export const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer shadow-sm text-text-gray hover:text-text-dark dark:hover:text-white"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle dark mode theme"
    >
      {/* Sliding Pill Switch Track */}
      <div className="relative w-8 h-4.5 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-200 flex items-center">
        <span
          className={`absolute left-0.5 w-3.5 h-3.5 bg-white dark:bg-slate-200 rounded-full shadow-sm transition-transform duration-200 flex items-center justify-center ${
            isDarkMode ? 'translate-x-3.5' : 'translate-x-0'
          }`}
        />
      </div>

      {/* Mode Text & Icon */}
      <div className="flex items-center gap-1.5 select-none">
        {isDarkMode ? (
          <>
            <Moon className="w-3.5 h-3.5 text-blue-400 fill-blue-400/10" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Light</span>
          </>
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
