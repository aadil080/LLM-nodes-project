// Toast.js
// Toast notification component with auto-dismiss
// --------------------------------------------------

import { useEffect } from 'react';

export const Toast = ({ message, type = 'info', onClose, duration = 5000, position = 'right', index = 0 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
    // If duration is 0, toast stays until manually closed
  }, [duration, onClose]);

  // Calculate vertical offset based on index

  const toastStyles = {
    container: {
      position: 'fixed',
      top: '20px',
      ...(position === 'center' ? {
        left: '50%',
        transform: 'translateX(-50%)',
      } : {
        right: '20px',
      }),
      zIndex: 9999,
      width: 'auto',
      maxWidth: '420px',
      minWidth: '320px',
      boxSizing: 'border-box',
      background: getBackground(type),
      color: getColor(type),
      border: `1px solid ${getBorder(type)}`,
      borderRadius: '12px',
      padding: '14px 18px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      animation: position === 'center' ? 'slideDown 0.3s ease-out' : 'slideIn 0.3s ease-out',
      transition: 'top 0.3s ease-out',
      pointerEvents: 'auto',
    },
    icon: {
      fontSize: '20px',
      flexShrink: 0,
    },
    content: {
      flex: 1,
      wordWrap: 'break-word',
      overflow: 'hidden',
      fontSize: '13px',
      lineHeight: '1.5',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '0',
      opacity: 0.7,
      transition: 'opacity 0.2s',
      flexShrink: 0,
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from {
              transform: translateX(-50%) translateY(-100px);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div style={toastStyles.container}>
        <span style={toastStyles.icon}>{getIcon(type)}</span>
        <div style={toastStyles.content}>{message}</div>
        <button
          style={toastStyles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => (e.target.style.opacity = '1')}
          onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
        >
          ✕
        </button>
      </div>
    </>
  );
};

// Helper functions for styling
const getBackground = (type) => {
  const backgrounds = {
    success: '#D1FAE5',
    error: '#FEE2E2',
    warning: '#FEF3C7',
    info: '#DBEAFE',
  };
  return backgrounds[type] || backgrounds.info;
};

const getColor = (type) => {
  const colors = {
    success: '#065F46',
    error: '#991B1B',
    warning: '#92400E',
    info: '#1E40AF',
  };
  return colors[type] || colors.info;
};

const getBorder = (type) => {
  const borders = {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  };
  return borders[type] || borders.info;
};

const getIcon = (type) => {
  const icons = {
    error: '⚠',
    warning: '⚠',
    info: 'ℹ',
  };
  return icons[type];
};
