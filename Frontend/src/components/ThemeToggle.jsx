import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-full border cursor-pointer flex items-center justify-center transition-colors duration-200 ${
        isLight
          ? 'bg-white hover:bg-[#fdf6f8] border-[#f0dde3] text-[#d4af7a] shadow-sm'
          : 'bg-[#131826] hover:bg-[#1f1a2e] border-[#232a3d] text-[#e6c894]'
      } ${className}`}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon: Visible in LIGHT mode, clicking switches to dark mode */}
        <Sun
          size={20}
          className={`w-5 h-5 transition-all duration-300 ease-in-out transform ${
            isLight
              ? 'rotate-0 opacity-100 scale-100'
              : 'rotate-90 opacity-0 scale-50 pointer-events-none absolute'
          }`}
          aria-hidden={!isLight}
        />

        {/* Moon Icon: Visible in DARK mode, clicking switches to light mode */}
        <Moon
          size={20}
          className={`w-5 h-5 transition-all duration-300 ease-in-out transform ${
            !isLight
              ? 'rotate-0 opacity-100 scale-100'
              : '-rotate-90 opacity-0 scale-50 pointer-events-none absolute'
          }`}
          aria-hidden={isLight}
        />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
