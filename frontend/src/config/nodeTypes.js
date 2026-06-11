// nodeTypes.js
// Configuration for all node types in the pipeline
// --------------------------------------------------

/**
 * Node type metadata and configuration
 */
export const NODE_TYPE_CONFIG = {
  customInput: {
    label: 'Input',
    icon: '📥',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#10B981',
    description: 'Entry point for data into the pipeline',
    category: 'input',
    inputs: [],
    outputs: ['value'],
  },
  llm: {
    label: 'LLM',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    color: '#8B5CF6',
    description: 'Large Language Model processing node',
    category: 'processing',
    inputs: ['system', 'prompt'],
    outputs: ['response'],
  },
  customOutput: {
    label: 'Output',
    icon: '📤',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    color: '#F59E0B',
    description: 'Output point for pipeline results',
    category: 'output',
    inputs: ['value'],
    outputs: [],
  },
  text: {
    label: 'Text',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    color: '#3B82F6',
    description: 'Static text or template node',
    category: 'data',
    inputs: [],
    outputs: ['output'],
  },
  api: {
    label: 'API Request',
    icon: '🌐',
    gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    color: '#06B6D4',
    description: 'Make HTTP requests to external APIs',
    category: 'integration',
    inputs: ['url', 'body'],
    outputs: ['response', 'status'],
  },
  conditional: {
    label: 'Condition',
    icon: '🔀',
    gradient: 'linear-gradient(135deg, #EC4899, #DB2777)',
    color: '#EC4899',
    description: 'Branch flow based on conditions',
    category: 'logic',
    inputs: ['value'],
    outputs: ['true', 'false'],
  },
  note: {
    label: 'Note',
    icon: '📌',
    gradient: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
    color: '#FCD34D',
    description: 'Add documentation and annotations',
    category: 'utility',
    inputs: [],
    outputs: [],
  },
  transform: {
    label: 'Transform',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #F97316, #EA580C)',
    color: '#F97316',
    description: 'Transform data with operations',
    category: 'processing',
    inputs: ['data'],
    outputs: ['result'],
  },
  merge: {
    label: 'Merge',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #14B8A6, #0D9488)',
    color: '#14B8A6',
    description: 'Combine multiple inputs into one',
    category: 'processing',
    inputs: ['a', 'b', 'c'],
    outputs: ['merged'],
  },
};

/**
 * Get node configuration by type
 * @param {string} nodeType - The type of node
 * @returns {Object} Node configuration
 */
export const getNodeConfig = (nodeType) => {
  return NODE_TYPE_CONFIG[nodeType] || null;
};

/**
 * Get all available node types
 * @returns {Array<string>} List of node type IDs
 */
export const getAvailableNodeTypes = () => {
  return Object.keys(NODE_TYPE_CONFIG);
};

/**
 * Get nodes by category
 * @param {string} category - Category name
 * @returns {Array<Object>} List of node configs in category
 */
export const getNodesByCategory = (category) => {
  return Object.entries(NODE_TYPE_CONFIG)
    .filter(([, config]) => config.category === category)
    .map(([type, config]) => ({ type, ...config }));
};
