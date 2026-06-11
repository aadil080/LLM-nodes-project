// pipelineStore.js
// Zustand store for pipeline state management
// --------------------------------------------------

import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';
import { validateConnection } from '../utils/validation';

export const usePipelineStore = create((set, get) => ({
  // State
  nodes: [],
  edges: [],
  selectedNodes: [],
  selectedEdges: [],
  pipelineName: 'Untitled Pipeline',
  sidebarWidth: 220,
  draggedNodeId: null,
  reactFlowInstance: null,

  // Node ID generation - finds the lowest available number
  getNodeID: (type) => {
    const { nodes } = get();
    
    // Get all existing IDs of this type
    const existingIds = nodes
      .filter((node) => node.id.startsWith(`${type}-`))
      .map((node) => {
        const match = node.id.match(new RegExp(`^${type}-(\\d+)$`));
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((num) => num > 0);

    // Find the lowest available number starting from 1
    let newNumber = 1;
    while (existingIds.includes(newNumber)) {
      newNumber++;
    }

    return `${type}-${newNumber}`;
  },

  // Add node
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  // Node changes (position, selection, deletion)
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Edge changes
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // Connection handler with validation
  onConnect: (connection) => {
    const { nodes, edges } = get();
    const validation = validateConnection(connection, nodes, edges);

    if (!validation.isValid) {
      console.warn('Invalid connection:', validation.message);
      return;
    }

    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          deletable: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: '20px',
            width: '20px',
          },
          style: {
            stroke: '#6B7280',
            strokeWidth: 2,
          },
        },
        edges
      ),
    });
  },

  // Update node field
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },

  // Update node data (bulk update)
  updateNodeData: (nodeId, newData) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, ...newData };
        }
        return node;
      }),
    });
  },

  // Delete selected nodes and connected edges
  deleteSelectedNodes: () => {
    const { nodes, edges } = get();
    
    // Find nodes that are marked as selected by ReactFlow
    const selectedNodeIds = new Set(
      nodes.filter((node) => node.selected).map((node) => node.id)
    );

    set({
      nodes: nodes.filter((node) => !selectedNodeIds.has(node.id)),
      edges: edges.filter(
        (edge) =>
          !selectedNodeIds.has(edge.source) &&
          !selectedNodeIds.has(edge.target)
      ),
    });
  },

  // Delete a single node by ID
  deleteNode: (nodeId) => {
    const { nodes, edges } = get();
    
    console.log('deleteNode called with:', nodeId);
    console.log('Current nodes before delete:', nodes.map(n => n.id));
    
    const filteredNodes = nodes.filter((node) => node.id !== nodeId);
    const filteredEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    
    console.log('Nodes after delete:', filteredNodes.map(n => n.id));

    set({
      nodes: filteredNodes,
      edges: filteredEdges,
    });
  },

  // Delete selected edges
  deleteSelectedEdges: () => {
    const { edges, selectedEdges } = get();
    const selectedEdgeIds = new Set(selectedEdges.map((e) => e.id));

    set({
      edges: edges.filter((edge) => !selectedEdgeIds.has(edge.id)),
      selectedEdges: [],
    });
  },

  // Clear pipeline
  clearPipeline: () => {
    set({
      nodes: [],
      edges: [],
      selectedNodes: [],
      selectedEdges: [],
    });
  },

  // Load pipeline
  loadPipeline: (pipelineData) => {
    if (!pipelineData) return;

    set({
      nodes: pipelineData.nodes || [],
      edges: pipelineData.edges || [],
      selectedNodes: [],
      selectedEdges: [],
    });
  },

  // Set pipeline name
  setPipelineName: (name) => {
    set({ pipelineName: name });
  },

  // Set sidebar width
  setSidebarWidth: (width) => {
    set({ sidebarWidth: width });
  },

  // Selection handlers
  setSelectedNodes: (nodes) => {
    set({ selectedNodes: nodes });
  },

  setSelectedEdges: (edges) => {
    set({ selectedEdges: edges });
  },

  // Track dragged node for delete on drop
  setDraggedNodeId: (nodeId) => {
    set({ draggedNodeId: nodeId });
  },

  // Set ReactFlow instance
  setReactFlowInstance: (instance) => {
    set({ reactFlowInstance: instance });
  },
}));

// Selector hooks for performance optimization
export const useNodes = () => usePipelineStore((state) => state.nodes);
export const useEdges = () => usePipelineStore((state) => state.edges);
export const usePipelineActions = () =>
  usePipelineStore((state) => ({
    addNode: state.addNode,
    getNodeID: state.getNodeID,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    updateNodeField: state.updateNodeField,
    updateNodeData: state.updateNodeData,
    deleteSelectedNodes: state.deleteSelectedNodes,
    deleteSelectedEdges: state.deleteSelectedEdges,
    clearPipeline: state.clearPipeline,
    loadPipeline: state.loadPipeline,
  }));
