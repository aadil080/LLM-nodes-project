// PipelineCanvas.js
// Main canvas component for the pipeline editor
// --------------------------------------------------

import { useRef, useCallback, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { usePipelineStore } from '../../store/pipelineStore';
import { shallow } from 'zustand/shallow';
import { InputNode } from '../../nodes/inputNode';
import { LLMNode } from '../../nodes/llmNode';
import { OutputNode } from '../../nodes/outputNode';
import { TextNode } from '../../nodes/textNode';
import { getInitNodeData } from '../../utils/nodeHelpers';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all custom node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

// Zustand selector for optimal re-renders
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = usePipelineStore(selector, shallow);

  /**
   * Handle drop event - Add new node to canvas
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(
          event.dataTransfer.getData('application/reactflow')
        );
        const type = appData?.nodeType;

        // Validate node type
        if (typeof type === 'undefined' || !type) {
          return;
        }

        // Calculate position in canvas coordinates
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Generate unique ID and create node
        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  /**
   * Handle drag over event - Allow drop
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Custom minimap node color based on type
   */
  const minimapNodeColor = (node) => {
    const colorMap = {
      customInput: '#10B981',
      llm: '#8B5CF6',
      customOutput: '#F59E0B',
      text: '#3B82F6',
    };
    return colorMap[node.type] || '#6B7280';
  };

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        marginLeft: '180px',
        width: 'calc(100vw - 180px)',
        height: '100vh',
        background: '#0F172A',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-left"
        deleteKeyCode="Delete"
        elementsSelectable={true}
        edgesUpdatable={true}
        edgesFocusable={true}
        defaultEdgeOptions={{
          deletable: true,
          focusable: true,
          style: { strokeWidth: 2, stroke: '#6B7280' },
        }}
      >
        <Background
          color="#1E293B"
          gap={gridSize}
          style={{ background: '#0F172A' }}
        />
        <Controls
          style={{
            button: {
              background: '#1F2937',
              border: '1px solid #374151',
              color: '#F9FAFB',
            },
          }}
        />
        <MiniMap
          nodeColor={minimapNodeColor}
          style={{
            background: '#1F2937',
            border: '1px solid #374151',
          }}
          maskColor="rgba(15, 23, 42, 0.6)"
        />
      </ReactFlow>
    </div>
  );
};
