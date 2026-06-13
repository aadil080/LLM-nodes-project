// pipelineApi.js
// API layer for backend communication
// --------------------------------------------------

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Submits the pipeline configuration to the backend for parsing
 * @param {Object} pipelineData - The pipeline data containing nodes and edges
 * @returns {Promise<Object>} The response from the backend
 */
export const submitPipeline = async (pipelineData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipelineData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting pipeline:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit pipeline',
    };
  }
};

/**
 * Health check for the backend API
 * @returns {Promise<boolean>} True if API is available
 */
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
