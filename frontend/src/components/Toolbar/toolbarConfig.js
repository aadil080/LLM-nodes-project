import { NODE_TYPE_CONFIG } from '../../config/nodeTypes';

/**
 * Convert node type config to toolbar items
 * This ensures consistency between toolbar and node configurations
 */
export const toolbarItems = Object.entries(NODE_TYPE_CONFIG).map(
  ([type, config]) => ({
    type,
    label: config.label,
    icon: config.icon,
    gradient: config.gradient,
  })
);