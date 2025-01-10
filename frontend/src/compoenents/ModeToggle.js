import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export const ModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

