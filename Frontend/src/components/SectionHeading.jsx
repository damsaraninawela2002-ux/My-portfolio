import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignmentClass} ${className}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/30 mb-3 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          {badge}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-tight"
      >
        {title}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d88ca3] via-[#c9a7eb] to-[#d4af7a] dark:from-[#f0a8bd] dark:via-[#d9bdf5] dark:to-[#e6c894]">
            {highlight}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-[var(--color-muted)] max-w-2xl font-body"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Thin gold-toned divider flourish */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`flex items-center gap-2 mt-4 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        <div className="h-[1.5px] w-12 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-gold)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
        <div className="h-[1.5px] w-12 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-accent-2)]" />
      </motion.div>
    </div>
  );
};

export default SectionHeading;
