# LLM Pipeline Builder 🚀

A production-ready visual workflow builder for creating and managing LLM pipelines with an intuitive drag-and-drop interface.

![Project Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-green)

## 📸 Preview

Visual node-based editor for creating LLM workflows with support for:
- 📥 **Input Nodes** - Data entry points for your pipeline
- 🤖 **LLM Nodes** - Integrate with large language models
- 📤 **Output Nodes** - Display or capture final results
- 📝 **Text Nodes** - Manipulate and format text
- 🔄 **Transform Nodes** - Apply data transformations
- 🔀 **Merge Nodes** - Combine multiple data streams
- ❓ **Conditional Nodes** - Route data based on conditions
- 🌐 **API Nodes** - Make external API calls
- 🗒️ **Note Nodes** - Add comments and annotations

---

## ✨ Features

✅ **Drag & Drop Interface** - Intuitive visual workflow creation  
✅ **Real-time Validation** - Instant feedback on pipeline errors  
✅ **Modern Dark UI** - Beautiful gradients and smooth animations  
✅ **Backend Integration** - Full REST API communication  
✅ **Extensible Architecture** - Easy to add custom node types  
✅ **State Management** - Efficient Zustand-based state handling  
✅ **Type Safety** - Proper data structures and validation  
✅ **Production Ready** - Clean code structure and best practices  

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 + ReactFlow
- Zustand (State Management)
- Modern JavaScript (ES6+)

**Backend:**
- FastAPI (Python)
- Pydantic (Validation)
- CORS enabled for development

**Structure:**
```
LLM-nodes-project/
├── frontend/          # React application
│   └── src/
│       ├── api/       # API integration
│       ├── components/# React components
│       ├── config/    # Configuration
│       ├── nodes/     # Node implementations
│       ├── store/     # State management
│       ├── styles/    # Styling
│       └── utils/     # Utilities
│
├── backend/           # FastAPI application
│   ├── main.py       # API endpoints
│   └── requirements.txt
│
└── PROJECT_STRUCTURE.md  # Detailed documentation
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ 
- **Python** 3.8+
- **npm** or **yarn**

### 1. Clone Repository
```bash
git clone <repository-url>
cd LLM-nodes-project
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend will run at http://localhost:8000

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Frontend will run at http://localhost:3000

---

## 📖 Documentation

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Complete architecture guide
- **[frontend/README.md](frontend/README.md)** - Frontend documentation
- **API Docs** - http://localhost:8000/docs (when backend is running)

---

## 🎯 Usage

### Creating a Pipeline

1. **Drag nodes** from the toolbar to the canvas
2. **Connect nodes** by dragging from output handles to input handles
3. **Configure nodes** by filling in their parameters
4. **Submit pipeline** - Validates and sends to backend

### Example Pipeline
```
Input → Text → LLM → Output
```

---

## 🔧 Configuration

### Frontend Environment Variables
Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:8000
```

### Backend Configuration
Edit `backend/main.py` to customize:
- CORS origins
- API endpoints
- Processing logic

---

## 🆕 Adding Custom Nodes

### 1. Define Node Type
In `frontend/src/config/nodeTypes.js`:
```javascript
myNode: {
  label: 'My Node',
  icon: '⚡',
  gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A6F)',
  inputs: ['input1'],
  outputs: ['output1'],
}
```

### 2. Create Component
In `frontend/src/nodes/myNode.js`:
```javascript
export const MyNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="My Node"
      nodeType="myNode"
      selected={selected}
    >
      {/* Custom content */}
    </BaseNode>
  );
};
```

### 3. Register Node
In `frontend/src/components/Canvas/PipelineCanvas.js`:
```javascript
const nodeTypes = {
  // ...existing
  myNode: MyNode,
};
```

---

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
pytest  # (tests to be implemented)
```

---

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
```

Optimized build in `frontend/build/`

### Backend Deployment
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🔮 Roadmap

- [ ] Save/Load pipelines to database
- [ ] Export pipeline as JSON/YAML
- [ ] Undo/Redo functionality
- [ ] Node grouping and templates
- [ ] Real-time pipeline execution
- [ ] Collaborative editing
- [ ] Advanced node types (loops, conditions)
- [ ] Performance monitoring dashboard
- [ ] Pipeline versioning
- [ ] Testing framework

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

**Guidelines:**
- Follow existing code structure
- Add proper documentation
- Write clean, readable code
- Test before submitting

---

## 📝 Project Status

**Current Version:** 1.0.0 (Production Ready)

**Recent Updates:**
- ✅ Complete refactoring to production-ready structure
- ✅ Separated concerns with proper file organization
- ✅ Implemented backend integration
- ✅ Added comprehensive validation
- ✅ Modern UI with dark theme
- ✅ Full documentation

---

## 🐛 Known Issues

- None currently reported

**Report issues:** [Create an issue](../../issues)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Authors

Developed with ❤️ for LLM workflow automation

---

## 🙏 Acknowledgments

- [ReactFlow](https://reactflow.dev/) - Amazing node-based editor
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python API framework
- [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management

---

## 📞 Support

- 📧 Email: support@example.com
- 💬 Discord: [Join our community](#)
- 📖 Docs: See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

**Star ⭐ this repository if you find it helpful!**
