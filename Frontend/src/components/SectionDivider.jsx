import React from 'react';

const SectionDivider = ({ variant = 'wave', className = '' }) => {
  if (variant === 'floral') {
    return (
      <div className={`relative flex items-center justify-center my-12 max-w-5xl mx-auto px-4 ${className}`}>
        {/* Left thin gold line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-[var(--color-gold)]/80" />

        {/* Center Floral Flourish Motif */}
        <div className="mx-4 flex items-center gap-1.5 text-[var(--color-gold)] opacity-80">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C12 7 7 12 2 12C7 12 12 17 12 22C12 17 17 12 22 12C17 12 12 7 12 2Z" fill="currentColor" fillOpacity="0.2" />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C12 7 7 12 2 12C7 12 12 17 12 22C12 17 17 12 22 12C17 12 12 7 12 2Z" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </div>

        {/* Right thin gold line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[var(--color-gold)]/50 to-[var(--color-gold)]/80" />
      </div>
    );
  }

  // Subtle wave divider
  return (
    <div className={`relative w-full overflow-hidden leading-none opacity-40 my-6 ${className}`}>
      <svg
        className="relative block w-full h-4 text-[var(--color-border)]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.52,130.83,121.31,192,106.32c45.41-11.12,88.46-30.63,129.39-49.88Z" />
      </svg>
    </div>
  );
};

export default SectionDivider;
