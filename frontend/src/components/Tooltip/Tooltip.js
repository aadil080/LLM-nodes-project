// Tooltip.js
// Reusable tooltip component
// --------------------------------------------------

import { useState } from 'react';

export const Tooltip = ({ children, text, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipStyles = {
    wrapper: {
      position: 'relative',
      display: 'inline-block',
    },
    tooltip: {
      position: 'absolute',
      ...(position === 'top' && {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '8px',
      }),
      ...(position === 'bottom' && {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '8px',
      }),
      ...(position === 'left' && {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: '8px',
      }),
      ...(position === 'right' && {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: '8px',
      }),
      background: '#1F2937',
      color: '#F9FAFB',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
      border: '1px solid #374151',
      zIndex: 10001,
      pointerEvents: 'none',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'opacity 0.2s ease, visibility 0.2s ease',
    },
  };

  return (
    <div
      style={tooltipStyles.wrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {text && <div style={tooltipStyles.tooltip}>{text}</div>}
    </div>
  );
};
