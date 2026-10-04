import React from 'react';

const Badge = ({ children, variant = 'rose', className = '', size = 'sm' }) => {
  const variantStyles = {
    rose: 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30',
    lavender: 'bg-[#c9a7eb]/15 dark:bg-[#d9bdf5]/15 text-[#9d6ed4] dark:text-[#d9bdf5] border-[#c9a7eb]/30',
    gold: 'bg-[#d4af7a]/15 dark:bg-[#e6c894]/15 text-[#b0874e] dark:text-[#e6c894] border-[#d4af7a]/30',
    plum: 'bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)]',
    cyan: 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30',
    blue: 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30',
  };

  const sizeStyles = {
    xs: 'text-[11px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors ${
        variantStyles[variant] || variantStyles.rose
      } ${sizeStyles[size] || sizeStyles.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
