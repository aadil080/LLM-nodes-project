// nodeHelpers.js
// Helper utilities for node operations
// --------------------------------------------------

/**
 * Generates initial node data based on node type
 * @param {string} nodeID - The unique node ID
 * @param {string} type - The node type
 * @returns {Object} Initial node data
 */
export const getInitNodeData = (nodeID, type) => {
  const baseData = {
    id: nodeID,
    nodeType: type,
  };

  // Add type-specific default data
  switch (type) {
    case 'customInput':
      return {
        ...baseData,
        inputName: nodeID.replace('customInput-', 'input_'),
        inputType: 'Text',
      };

    case 'customOutput':
      return {
        ...baseData,
        outputName: nodeID.replace('customOutput-', 'output_'),
        outputType: 'Text',
      };

    case 'text':
      return {
        ...baseData,
        text: '{{input}}',
      };

    case 'llm':
      return {
        ...baseData,
        model: 'gpt-3.5-turbo',
      };

    case 'api':
      return {
        ...baseData,
        method: 'GET',
        url: '',
      };

    case 'conditional':
      return {
        ...baseData,
        operator: '==',
        compareTo: '',
      };

    case 'note':
      return {
        ...baseData,
        note: '',
      };

    case 'transform':
      return {
        ...baseData,
        operation: 'JSON.parse',
      };

    case 'merge':
      return {
        ...baseData,
        mode: 'concatenate',
        separator: ' ',
      };

    default:
      return baseData;
  }
};

/**
 * Serializes the pipeline for backend submission
 * @param {Array} nodes - All nodes
 * @param {Array} edges - All edges
 * @returns {Object} Serialized pipeline data
 */
export const serializePipeline = (nodes, edges) => {
  return {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
      position: node.position,
    })),
    edges: edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    })),
  };
};
