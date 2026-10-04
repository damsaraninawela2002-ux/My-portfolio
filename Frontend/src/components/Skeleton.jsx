import React from 'react';

export const Skeleton = ({
  variant = 'line',
  width = '100%',
  height = '14px',
  borderRadius = 'var(--radius-pill)',
  style = {},
  className = '',
}) => {
  if (variant === 'card') {
    return (
      <div className={`skeleton-card ${className}`} style={style} aria-hidden="true">
        <div className="skeleton-media" />
        <div className="skeleton-body">
          <div className="skeleton-line" style={{ width: '68%', height: '22px' }} />
          <div className="skeleton-line" style={{ width: '92%' }} />
          <div className="skeleton-line" style={{ width: '78%' }} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <div className="skeleton-line" style={{ width: '60px', height: '22px' }} />
            <div className="skeleton-line" style={{ width: '60px', height: '22px' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`skeleton-line ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
