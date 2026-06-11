# LLM Pipeline Project - Production Ready Structure

## 📋 Project Overview
A visual workflow builder for creating and managing LLM pipelines with drag-and-drop interface.

**Stack:**
- **Frontend**: React 18 + ReactFlow + Zustand
- **Backend**: FastAPI (Python)
- **State Management**: Zustand
- **UI Framework**: ReactFlow for node-based editor

---

## 📁 Project Structure

### Frontend (`/frontend/src/`)
```
src/
├── api/                          # Backend API integration
│   └── pipelineApi.js           # API calls for pipeline operations
│
├── components/                   # React components
│   ├── Canvas/                  # Canvas/ReactFlow components
│   │   └── PipelineCanvas.js   # Main canvas component
│   ├── SubmitButton/            # Submit functionality
│   │   └── SubmitButton.js     # Submit button with validation
│   └── Toolbar/                 # Toolbar components
│       ├── PipelineToolbar.js  # Main toolbar
│       ├── ToolbarCard.js      # Draggable node cards
│       └── toolbarConfig.js    # Toolbar configuration
│
├── config/                       # Configuration files
│   └── nodeTypes.js            # Node type definitions
│
├── constants/                    # Constants
│   └── colors.js               # Color palette
│
├── nodes/                        # Node implementations
│   ├── Base/                    # Base node components
│   │   ├── BaseNode.js         # Generic node base
│   │   └── FormNode.js         # Form-based node base
│   ├── inputNode.js            # Input node
│   ├── llmNode.js              # LLM processing node
│   ├── outputNode.js           # Output node
│   └── textNode.js             # Text/template node
│
├── store/                        # State management
│   └── pipelineStore.js        # Zustand store
│
├── styles/                       # Styling
│   ├── nodes/                   # Node styles
│   │   └── nodeStyles.js
│   └── toolbar/                 # Toolbar styles
│       ├── cardStyles.js
│       └── toolbarStyles.js
│
├── utils/                        # Utilities
│   ├── nodeHelpers.js          # Node helper functions
│   └── validation.js           # Validation logic
│
├── App.js                        # Main app component
├── index.js                      # Entry point
└── index.css                     # Global styles
```

### Backend (`/backend/`)
```
backend/
└── main.py                       # FastAPI application
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- npm or yarn

### Installation

#### 1. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

#### 2. Backend Setup
```bash
cd backend
pip install fastapi uvicorn pydantic
```

### Running the Application

#### Start Backend (Terminal 1)
```bash
cd backend
uvicorn main:app --reload --port 8000
```

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 🏗️ Architecture

### State Management (Zustand)
The application uses Zustand for centralized state management:
- **Nodes**: All workflow nodes
- **Edges**: Connections between nodes
- **Actions**: Add, update, delete nodes and edges

### Node System
All nodes extend from base components:
- **BaseNode**: Generic node with inputs/outputs
- **FormNode**: Form-based node with name/type fields

### API Integration
- **Validation**: Client-side validation before submission
- **Submission**: POST to `/pipelines/parse`
- **Error Handling**: Comprehensive error messages

### Validation
- Connection validation (no cycles, valid connections)
- Node input validation
- Pipeline structure validation

---

## 🎨 Available Node Types

| Node | Purpose | Inputs | Outputs |
|------|---------|--------|---------|
| **Input** 📥 | Data entry point | - | value |
| **LLM** 🤖 | AI processing | system, prompt | response |
| **Output** 📤 | Result output | value | - |
| **Text** 📝 | Static text/template | - | output |

---

## 🔧 Configuration

### Adding New Node Types

1. **Define in config** (`config/nodeTypes.js`):
```javascript
newNodeType: {
  label: 'New Node',
  icon: '🆕',
  gradient: 'linear-gradient(...)',
  inputs: ['input1'],
  outputs: ['output1'],
}
```

2. **Create node component** (`nodes/newNode.js`):
```javascript
export const NewNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="New Node"
      nodeType="newNodeType"
      selected={selected}
    >
      {/* Custom content */}
    </BaseNode>
  );
};
```

3. **Register in PipelineCanvas** (`components/Canvas/PipelineCanvas.js`):
```javascript
const nodeTypes = {
  // ... existing
  newNodeType: NewNode,
};
```

---

## 🧪 API Endpoints

### `GET /`
Health check endpoint
```json
{
  "status": "ok",
  "message": "LLM Pipeline API is running"
}
```

### `POST /pipelines/parse`
Submit pipeline for processing
```json
{
  "nodes": [...],
  "edges": [...]
}
```

Response:
```json
{
  "status": "success",
  "summary": {
    "total_nodes": 4,
    "total_edges": 3,
    "node_types": {...}
  }
}
```

### `POST /pipelines/validate`
Validate pipeline configuration
```json
{
  "nodes": [...],
  "edges": [...]
}
```

---

## 🎯 Features

✅ **Drag & Drop Interface**: Intuitive node placement  
✅ **Real-time Validation**: Immediate feedback on errors  
✅ **Modern UI**: Dark theme with gradients and animations  
✅ **Type Safety**: Proper data structures and validation  
✅ **Backend Integration**: Full API communication  
✅ **State Persistence**: LocalStorage support (via utils)  
✅ **Extensible Architecture**: Easy to add new nodes  
✅ **Error Handling**: Comprehensive error messages  

---

## 🔮 Future Enhancements

- [ ] Save/Load pipelines
- [ ] Export pipeline as JSON
- [ ] Undo/Redo functionality
- [ ] Node grouping
- [ ] Pipeline execution
- [ ] Real-time collaboration
- [ ] Node templates library
- [ ] Advanced validation rules
- [ ] Pipeline testing framework
- [ ] Performance monitoring

---

## 📝 Development Guidelines

### Code Organization
- One component per file
- Separate concerns (logic, styling, config)
- Use descriptive names
- Add JSDoc comments

### Styling
- Use inline styles for component-specific styling
- Centralize theme colors in `constants/colors.js`
- Keep styles consistent with design system

### State Management
- Use Zustand selectors for performance
- Keep actions in store
- Avoid prop drilling

### Testing (To Be Added)
- Unit tests for utilities
- Integration tests for API
- E2E tests for workflows

---

## 🤝 Contributing

1. Follow existing code structure
2. Add proper comments
3. Test before committing
4. Update documentation

---

## 📄 License

MIT License

---

## 👥 Team

Developed with ❤️ for LLM workflow automation
