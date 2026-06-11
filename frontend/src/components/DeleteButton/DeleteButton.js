// DeleteButton.js
// Floating delete button that appears when nodes are selected
// --------------------------------------------------

import { useState } from 'react';
import { usePipelineStore } from '../../store/pipelineStore';

export const DeleteButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const nodes = usePipelineStore((state) => state.nodes);
  const deleteSelectedNodes = usePipelineStore((state) => state.deleteSelectedNodes);
  const deleteNode = usePipelineStore((state) => state.deleteNode);
  const draggedNodeId = usePipelineStore((state) => state.draggedNodeId);
  const setDraggedNodeId = usePipelineStore((state) => state.setDraggedNodeId);

  // Check if any nodes are selected
  const selectedNodes = nodes.filter((node) => node.selected);
  const hasSelection = selectedNodes.length > 0;
  
  // Show button if nodes are selected OR if a node is being dragged
  const isVisible = hasSelection || draggedNodeId !== null;

  const handleDelete = () => {
    deleteSelectedNodes();
  };

  // Handle drag over - allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Handle drop - delete the dragged node
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Drop event fired!');
    console.log('draggedNodeId:', draggedNodeId);
    console.log('All nodes:', nodes.map(n => n.id));

    setIsDragOver(false);

    // If a node is being dragged from the canvas, delete it
    if (draggedNodeId) {
      console.log('Attempting to delete node:', draggedNodeId);
      deleteNode(draggedNodeId);
      setDraggedNodeId(null);
      console.log('Node deleted successfully');
    } else {
      console.warn('No draggedNodeId found during drop');
    }
  };

  const buttonStyles = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: isDragOver 
      ? 'translateX(-50%) translateY(0) scale(1.15)' 
      : isVisible 
        ? 'translateX(-50%) translateY(0)' 
        : 'translateX(-50%) translateY(-60px)',
    padding: '12px 24px',
    background: isDragOver ? '#991B1B' : isHovering ? '#DC2626' : '#EF4444',
    color: '#FFFFFF',
    border: isDragOver ? '3px dashed #FFFFFF' : '2px solid #1F2937',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: isDragOver 
      ? '0 8px 24px rgba(239,68,68,0.6), 0 0 40px rgba(239,68,68,0.4)' 
      : '0 4px 16px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none',
  };

  const iconStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const countStyles = {
    background: 'rgba(255,255,255,0.2)',
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '12px',
  };

  return (
    <div
      style={buttonStyles}
      onClick={handleDelete}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      title={isDragOver 
        ? 'Drop to delete node' 
        : draggedNodeId
          ? 'Drag here to delete'
          : hasSelection 
            ? `Delete ${selectedNodes.length} selected node${selectedNodes.length > 1 ? 's' : ''}` 
            : 'Drag nodes here to delete'
      }
    >
      <span style={iconStyles}>🗑️</span>
      <span>{isDragOver ? 'Drop Here' : draggedNodeId ? 'Drop to Delete' : 'Delete'}</span>
      {selectedNodes.length > 1 && !isDragOver && (
        <span style={countStyles}>{selectedNodes.length}</span>
      )}
    </div>
  );
};
