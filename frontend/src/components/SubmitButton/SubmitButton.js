// SubmitButton.js
// Submit button component with validation and API integration
// --------------------------------------------------

import { useState } from 'react';
import { usePipelineStore } from '../../store/pipelineStore';
import { validatePipeline } from '../../utils/validation';
import { submitPipeline } from '../../api/pipelineApi';
import { serializePipeline } from '../../utils/nodeHelpers';
import { Toast } from '../Toast/Toast';

export const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const nodes = usePipelineStore((state) => state.nodes);
  const edges = usePipelineStore((state) => state.edges);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleSubmit = async () => {
    // Clear previous toast
    closeToast();

    // Validate pipeline
    const validation = validatePipeline(nodes, edges);

    if (!validation.isValid) {
      const errorMessage = (
        <div>
          <strong>Validation Failed:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
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
        <div>
          <strong>Warnings:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            {validation.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
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
        showToast('Pipeline submitted successfully!', 'success');
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

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
          duration={5000}
        />
      )}
    </>
  );
};
