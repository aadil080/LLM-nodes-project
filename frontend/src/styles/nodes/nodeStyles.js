// nodeStyles.js
// Styling configurations for pipeline nodes
// --------------------------------------------------

/**
 * Base styles for all nodes
 */
export const baseNodeStyles = {
  container: {
    minWidth: '112px',
    minHeight: '48px',
    borderRadius: '6px',
    background: '#1F2937',
    border: '1px solid #374151',
    boxShadow: '0 3px 8px rgba(0,0,0,0.25)',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
  },

  containerSelected: {
    border: '2px solid #3B82F6',
    boxShadow: '0 5px 12px rgba(59,130,246,0.3)',
  },

  header: (gradient) => ({
    height: '24px',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 6px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  }),

  title: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: '9px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  icon: {
    fontSize: '10px',
  },

  body: {
    padding: '8px',
    color: '#F9FAFB',
    fontSize: '8px',
  },

  label: {
    display: 'block',
    marginBottom: '4px',
    color: '#D1D5DB',
    fontSize: '7px',
    fontWeight: 500,
  },

  input: {
    width: 'calc(100% - 2px)',
    padding: '5px 6px',
    marginTop: '2px',
    borderRadius: '4px',
    border: '1px solid #374151',
    background: '#111827',
    color: '#F9FAFB',
    fontSize: '9px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    lineHeight: '1.4',
  },

  inputFocus: {
    border: '1px solid #3B82F6',
    boxShadow: '0 0 0 3px rgba(59,130,246,0.1)',
  },

  select: {
    width: 'calc(100% - 2px)',
    padding: '5px 6px',
    marginTop: '2px',
    borderRadius: '4px',
    border: '1px solid #374151',
    background: '#111827',
    color: '#F9FAFB',
    fontSize: '9px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    lineHeight: '1.4',
  },

  textarea: {
    width: 'calc(100% - 2px)',
    padding: '5px 6px',
    marginTop: '2px',
    borderRadius: '4px',
    border: '1px solid #374151',
    background: '#111827',
    color: '#F9FAFB',
    fontSize: '9px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '36px',
    fontFamily: 'monospace',
    boxSizing: 'border-box',
    lineHeight: '1.4',
  },

  handle: {
    width: '6px',
    height: '6px',
    background: '#374151',
    border: '2px solid #1F2937',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  },

  handleConnected: {
    background: '#3B82F6',
    border: '2px solid #1F2937',
  },
};

/**
 * Generate styles for a specific node type
 * @param {string} gradient - Gradient color
 * @param {boolean} selected - Whether node is selected
 * @returns {Object} Node-specific styles
 */
export const getNodeStyles = (gradient, selected = false) => ({
  container: {
    ...baseNodeStyles.container,
    ...(selected ? baseNodeStyles.containerSelected : {}),
  },
  header: baseNodeStyles.header(gradient),
  title: baseNodeStyles.title,
  icon: baseNodeStyles.icon,
  body: baseNodeStyles.body,
  label: baseNodeStyles.label,
  input: baseNodeStyles.input,
  select: baseNodeStyles.select,
  textarea: baseNodeStyles.textarea,
  handle: baseNodeStyles.handle,
  handleConnected: baseNodeStyles.handleConnected,
});
