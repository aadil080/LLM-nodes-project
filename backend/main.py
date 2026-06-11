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
    """
    try:
        # Extract pipeline information
        node_count = len(pipeline.nodes)
        edge_count = len(pipeline.edges)
        
        # Group nodes by type
        node_types = {}
        for node in pipeline.nodes:
            node_type = node.type
            if node_type not in node_types:
                node_types[node_type] = 0
            node_types[node_type] += 1
        
        # Build execution graph (placeholder for actual processing)
        execution_order = []
        for node in pipeline.nodes:
            execution_order.append({
                'id': node.id,
                'type': node.type,
                'data': node.data
            })
        
        return {
            'status': 'success',
            'message': 'Pipeline parsed successfully',
            'summary': {
                'total_nodes': node_count,
                'total_edges': edge_count,
                'node_types': node_types,
            },
            'execution_order': execution_order,
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Failed to parse pipeline: {str(e)}'
        }

@app.post('/pipelines/validate')
def validate_pipeline(pipeline: PipelineData):
    """
    Validate the pipeline configuration
    """
    errors = []
    warnings = []
    
    # Check if pipeline has nodes
    if len(pipeline.nodes) == 0:
        errors.append('Pipeline is empty')
    
    # Check for input nodes
    input_nodes = [n for n in pipeline.nodes if n.type == 'customInput']
    if len(input_nodes) == 0:
        warnings.append('No input nodes found')
    
    # Check for output nodes
    output_nodes = [n for n in pipeline.nodes if n.type == 'customOutput']
    if len(output_nodes) == 0:
        warnings.append('No output nodes found')
    
    is_valid = len(errors) == 0
    
    return {
        'status': 'success',
        'is_valid': is_valid,
        'errors': errors,
        'warnings': warnings,
    }
