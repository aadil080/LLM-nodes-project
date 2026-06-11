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

/**
 * Deserializes pipeline data from backend or storage
 * @param {Object} pipelineData - Serialized pipeline data
 * @returns {Object} Pipeline with nodes and edges
 */
export const deserializePipeline = (pipelineData) => {
  if (!pipelineData || !pipelineData.nodes || !pipelineData.edges) {
    return { nodes: [], edges: [] };
  }

  return {
    nodes: pipelineData.nodes,
    edges: pipelineData.edges.map((edge) => ({
      ...edge,
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: 'arrow', height: '20px', width: '20px' },
    })),
  };
};

/**
 * Saves pipeline to localStorage
 * @param {Array} nodes - All nodes
 * @param {Array} edges - All edges
 * @param {string} name - Pipeline name
 */
export const savePipelineToLocal = (nodes, edges, name = 'pipeline') => {
  try {
    const data = serializePipeline(nodes, edges);
    const savedPipelines = JSON.parse(
      localStorage.getItem('pipelines') || '{}'
    );
    savedPipelines[name] = {
      ...data,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('pipelines', JSON.stringify(savedPipelines));
    return { success: true };
  } catch (error) {
    console.error('Error saving pipeline:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Loads pipeline from localStorage
 * @param {string} name - Pipeline name
 * @returns {Object} Pipeline data or null
 */
export const loadPipelineFromLocal = (name = 'pipeline') => {
  try {
    const savedPipelines = JSON.parse(
      localStorage.getItem('pipelines') || '{}'
    );
    return savedPipelines[name] || null;
  } catch (error) {
    console.error('Error loading pipeline:', error);
    return null;
  }
};

/**
 * Gets all saved pipeline names
 * @returns {Array<string>} List of pipeline names
 */
export const getSavedPipelineNames = () => {
  try {
    const savedPipelines = JSON.parse(
      localStorage.getItem('pipelines') || '{}'
    );
    return Object.keys(savedPipelines);
  } catch (error) {
    console.error('Error getting pipeline names:', error);
    return [];
  }
};
