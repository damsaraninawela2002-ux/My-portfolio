import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  target,
  rel,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#d88ca3] to-[#c9a7eb] dark:from-[#f0a8bd] dark:to-[#d9bdf5] text-[#241a20] font-semibold shadow-md shadow-[#f0a8bd]/25 hover:shadow-lg hover:shadow-[#f0a8bd]/35 hover:scale-[1.02] border border-[#f0a8bd]/40',
    secondary:
      'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] card-elevation hover:bg-[var(--color-accent-soft)]/50',
    outline:
      'bg-transparent text-[var(--color-accent)] border border-[var(--color-accent)]/60 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]/50',
    glow:
      'bg-gradient-to-r from-[#d88ca3] via-[#f0a8bd] to-[#d9bdf5] text-[#241a20] font-semibold shadow-lg shadow-[#f0a8bd]/30 hover:shadow-xl hover:shadow-[#f0a8bd]/45 hover:scale-[1.02] border border-[#f0a8bd]/40',
    ghost:
      'bg-transparent hover:bg-[var(--color-accent-soft)]/50 text-[var(--color-text)]',
    gold:
      'bg-gradient-to-r from-[#d4af7a] to-[#e6c894] text-[#241a20] font-semibold shadow-md shadow-[#d4af7a]/25 hover:shadow-lg hover:scale-[1.02]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <Link to={to} className={combinedClasses} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <a
          href={href}
          className={combinedClasses}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          {...props}
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
