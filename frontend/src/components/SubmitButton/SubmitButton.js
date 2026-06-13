// SubmitButton.js
// Submit button component with validation and API integration
// --------------------------------------------------

import { useState } from 'react';
import { usePipelineStore } from '../../store/pipelineStore';
import { validatePipeline } from '../../utils/validation';
import { submitPipeline } from '../../api/pipelineApi';
import { serializePipeline } from '../../utils/nodeHelpers';

export const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nodes = usePipelineStore((state) => state.nodes);
  const edges = usePipelineStore((state) => state.edges);
  const reactFlowInstance = usePipelineStore((state) => state.reactFlowInstance);
  const addAlert = usePipelineStore((state) => state.addAlert);

  const showToast = (message, type, position = 'right') => {
    addAlert(message, type, position);
  };

  // Navigate to a specific node
  const navigateToNode = (nodeId) => {
    if (!nodeId || !reactFlowInstance) return;
    
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    // Center the view on the node with animation
    reactFlowInstance.setCenter(node.position.x + 50, node.position.y + 50, {
      zoom: 1.5,
      duration: 800,
    });

    // Flash the node to highlight it
    const nodeElement = document.querySelector(`[data-id="${nodeId}"]`);
    if (nodeElement) {
      nodeElement.style.animation = 'pulse 0.5s ease-in-out 3';
    }
  };

  const handleSubmit = async () => {
    // No need to clear previous toasts - they accumulate
    
    // Validate pipeline
    const validation = validatePipeline(nodes, edges);

    if (!validation.isValid) {
      const errorMessage = (
        <div style={{ width: '100%', boxSizing: 'border-box' }}>
          <strong>Validation Failed:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px', wordWrap: 'break-word' }}>
            {validation.errors.map((error, index) => (
              <li 
                key={index}
                onClick={() => navigateToNode(error.nodeId)}
                style={{
                  cursor: error.nodeId ? 'pointer' : 'default',
                  color: error.nodeId ? '#1E40AF' : 'inherit',
                  textDecoration: error.nodeId ? 'underline' : 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (error.nodeId) e.target.style.color = '#1E3A8A';
                }}
                onMouseLeave={(e) => {
                  if (error.nodeId) e.target.style.color = '#1E40AF';
                }}
              >
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      );
      showToast(errorMessage, 'error');
      return;
    }

    // Show warnings if any
    if (validation.warnings.length > 0) {
      const warningMessage = (
        <div style={{ width: '100%', boxSizing: 'border-box' }}>
          <strong>Warnings:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px', wordWrap: 'break-word' }}>
            {validation.warnings.map((warning, index) => (
              <li 
                key={index}
                onClick={() => navigateToNode(warning.nodeId)}
                style={{
                  cursor: warning.nodeId ? 'pointer' : 'default',
                  color: warning.nodeId ? '#92400E' : 'inherit',
                  textDecoration: warning.nodeId ? 'underline' : 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (warning.nodeId) e.target.style.color = '#78350F';
                }}
                onMouseLeave={(e) => {
                  if (warning.nodeId) e.target.style.color = '#92400E';
                }}
              >
                {warning.message}
              </li>
            ))}
          </ul>
        </div>
      );
      showToast(warningMessage, 'warning');
      
      // Continue with submission despite warnings
    }

    // Serialize and submit
    setIsSubmitting(true);
    const pipelineData = serializePipeline(nodes, edges);

    try {
      const result = await submitPipeline(pipelineData);

      if (result.success) {
        // Extract the DAG information from the response
        const { num_nodes, num_edges, is_dag } = result.data;
        
        // Create modern styled toast message with 3 key metrics
        const dagMessage = (
          <div style={{ fontSize: '13px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              width: '100%'
            }}>
              <div>
                <p style={{
                  fontSize: '16px'
                }} >
                  Pipeline submitted successfully!
                </p>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '18px' }}>📊</span>
                <span style={{ fontWeight: 500 }}>Nodes:</span>
                <span style={{ 
                  marginLeft: 'auto', 
                  fontWeight: 600,
                  color: '#1E40AF',
                  fontSize: '15px'
                }}>
                  {num_nodes}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}>
                <span style={{ fontSize: '18px' }}>🔗</span>
                <span style={{ fontWeight: 500 }}>Edges:</span>
                <span style={{ 
                  marginLeft: 'auto', 
                  fontWeight: 600,
                  color: '#1E40AF',
                  fontSize: '15px'
                }}>
                  {num_edges}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 12px',
                background: is_dag ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                borderRadius: '6px',
                boxSizing: 'border-box',
                border: `1.5px solid ${is_dag ? '#10B981' : '#EF4444'}`
              }}>
                <span style={{ fontSize: '18px' }}>
                  {is_dag ? '✅' : '⚠️'}
                </span>
                <span style={{ fontWeight: 500 }}>DAG Cycle:</span>
                <span style={{ 
                  marginLeft: 'auto', 
                  fontWeight: 600,
                  color: is_dag ? '#065F46' : '#991B1B',
                  fontSize: '15px'
                }}>
                  {is_dag ? 'Not Present' : 'Present'}
                </span>
              </div>
            </div>
          </div>
        );
        
        // Show toast with no timeout (stays until manually dismissed)
        showToast(dagMessage, is_dag ? 'success' : 'warning', 'center');
        
        console.log('Pipeline result:', result.data);
      } else {
        showToast(`Submission failed: ${result.error}`, 'error');
      }
    } catch (error) {
      showToast(`Unexpected error: ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonStyles = {
    button: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 600,
      color: '#FFFFFF',
      background: isSubmitting
        ? '#6B7280'
        : 'linear-gradient(135deg, #3B82F6, #2563EB)',
      border: 'none',
      borderRadius: '10px',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.2s ease',
      width: '100%',
    },
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={buttonStyles.button}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow =
              '0 6px 16px rgba(59, 130, 246, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow =
            '0 4px 12px rgba(59, 130, 246, 0.3)';
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
      </button>
    </>
  );
};
