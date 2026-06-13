from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="LLM Pipeline API", version="1.0.0")

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class NodeData(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]
    position: Dict[str, float]

class EdgeData(BaseModel):
    source: str
    target: str
    sourceHandle: str
    targetHandle: str

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

@app.get('/')
def read_root():
    return {'status': 'ok', 'message': 'LLM Pipeline API is running'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse and process the pipeline configuration
    Calculate number of nodes, edges, and check if it forms a DAG
    """
    try:
        # Calculate number of nodes and edges
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Check if the pipeline forms a Directed Acyclic Graph (DAG)
        is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Failed to parse pipeline: {str(e)}'
        }


def check_is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG)
    Uses DFS to detect cycles
    """
    # Build adjacency list
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # Track visited nodes and nodes in current recursion stack
    visited = set()
    rec_stack = set()
    
    def has_cycle(node_id: str) -> bool:
        """DFS helper function to detect cycles"""
        visited.add(node_id)
        rec_stack.add(node_id)
        
        # Check all neighbors
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                # Found a back edge (cycle)
                return True
        
        rec_stack.remove(node_id)
        return False
    
    # Check for cycles starting from each unvisited node
    for node in nodes:
        if node.id not in visited:
            if has_cycle(node.id):
                return False  # Has cycle, not a DAG
    
    return True  # No cycles found, is a DAG
