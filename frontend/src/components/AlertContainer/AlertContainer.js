// AlertContainer.js
// Centralized alert container component
// --------------------------------------------------

import { Toast } from '../Toast/Toast';

export const AlertContainer = ({ alerts, onClose }) => {
  // Separate alerts by position
  const centerAlerts = alerts.filter(alert => alert.position === 'center');
  const rightAlerts = alerts.filter(alert => alert.position === 'right');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10000,
      }}
    >
      {/* Center positioned alerts */}
      {centerAlerts.map((alert, index) => (
        <Toast
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => onClose(alert.id)}
          duration={0}
          position="center"
          index={index}
        />
      ))}
      
      {/* Right positioned alerts */}
      {rightAlerts.map((alert, index) => (
        <Toast
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => onClose(alert.id)}
          duration={0}
          position="right"
          index={index}
        />
      ))}
    </div>
  );
};

