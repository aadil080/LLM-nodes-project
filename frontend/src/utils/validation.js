// validation.js
// Validation utilities for pipeline nodes and connections
// --------------------------------------------------

/**
 * Validates if a node has all required inputs connected
 * @param {Object} node - The node to validate
 * @param {Array} edges - All edges in the pipeline
 * @returns {Object} Validation result
 */
export const validateNodeInputs = (node, edges) => {
  const nodeInputs = getNodeInputRequirements(node.type);
  const connectedInputs = edges
    .filter((edge) => edge.target === node.id)
    .map((edge) => edge.targetHandle.replace(`${node.id}-`, ''));

  const missingInputs = nodeInputs.filter(
    (input) => !connectedInputs.includes(input)
  );

  return {
    isValid: missingInputs.length === 0,
    missingInputs,
    message:
      missingInputs.length > 0
        ? `Missing required inputs: ${missingInputs.join(', ')}`
        : 'All inputs connected',
  };
};

/**
 * Gets the required inputs for a node type
 * @param {string} nodeType - The type of node
 * @returns {Array<string>} Array of required input IDs
 */
const getNodeInputRequirements = (nodeType) => {
  const requirements = {
    llm: ['system', 'prompt'],
    customOutput: ['value'],
    // customInput and text nodes don't require inputs
    customInput: [],
    text: [],
  };

  return requirements[nodeType] || [];
};

/**
 * Validates the entire pipeline
 * @param {Array} nodes - All nodes in the pipeline
 * @param {Array} edges - All edges in the pipeline
 * @returns {Object} Validation result with detailed errors
 */
export const validatePipeline = (nodes, edges) => {
  const errors = [];
  const warnings = [];

  // Check if pipeline has any nodes
  if (nodes.length === 0) {
    errors.push('Pipeline is empty. Add at least one node.');
    return { isValid: false, errors, warnings };
  }

  // Check for input nodes
  const inputNodes = nodes.filter((n) => n.type === 'customInput');
  if (inputNodes.length === 0) {
    warnings.push('No input nodes found. Consider adding an input node.');
  }

  // Check for output nodes
  const outputNodes = nodes.filter((n) => n.type === 'customOutput');
  if (outputNodes.length === 0) {
    warnings.push('No output nodes found. Consider adding an output node.');
  }

  // Validate each node
  nodes.forEach((node) => {
    const validation = validateNodeInputs(node, edges);
    if (!validation.isValid) {
      errors.push(`Node "${node.id}": ${validation.message}`);
    }

    // Check for disconnected nodes (no inputs and no outputs)
    const hasInputs = edges.some((edge) => edge.target === node.id);
    const hasOutputs = edges.some((edge) => edge.source === node.id);

    if (!hasInputs && !hasOutputs && node.type !== 'customInput') {
      warnings.push(
        `Node "${node.id}" is not connected to anything.`
      );
    }
  });

  // Check for cycles (simple detection)
  const hasCycles = detectCycles(nodes, edges);
  if (hasCycles) {
    errors.push('Pipeline contains cycles. Remove circular connections.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Detects if there are cycles in the pipeline
 * @param {Array} nodes - All nodes
 * @param {Array} edges - All edges
 * @returns {boolean} True if cycles detected
 */
const detectCycles = (nodes, edges) => {
  const adjacencyList = {};
  const visited = new Set();
  const recursionStack = new Set();

  // Build adjacency list
  nodes.forEach((node) => {
    adjacencyList[node.id] = [];
  });

  edges.forEach((edge) => {
    adjacencyList[edge.source].push(edge.target);
  });

  // DFS to detect cycle
  const hasCycleDFS = (nodeId) => {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    for (const neighbor of adjacencyList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        if (hasCycleDFS(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  };

  // Check each node
  for (const nodeId in adjacencyList) {
    if (!visited.has(nodeId)) {
      if (hasCycleDFS(nodeId)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Validates if a connection between two nodes is allowed
 * @param {Object} connection - The connection to validate
 * @param {Array} nodes - All nodes
 * @param {Array} edges - Existing edges
 * @returns {Object} Validation result
 */
export const validateConnection = (connection, nodes, edges) => {
  const sourceNode = nodes.find((n) => n.id === connection.source);
  const targetNode = nodes.find((n) => n.id === connection.target);

  if (!sourceNode || !targetNode) {
    return { isValid: false, message: 'Invalid nodes' };
  }

  // Prevent self-connections
  if (connection.source === connection.target) {
    return { isValid: false, message: 'Cannot connect a node to itself' };
  }

  // Check if connection already exists
  const connectionExists = edges.some(
    (edge) =>
      edge.source === connection.source &&
      edge.target === connection.target &&
      edge.sourceHandle === connection.sourceHandle &&
      edge.targetHandle === connection.targetHandle
  );

  if (connectionExists) {
    return { isValid: false, message: 'Connection already exists' };
  }

  return { isValid: true, message: 'Connection is valid' };
};
