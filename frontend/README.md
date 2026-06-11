# Frontend - LLM Pipeline Builder

A modern, production-ready React application for building LLM workflows with drag-and-drop interface.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Configure the backend API URL:
```env
REACT_APP_API_URL=http://localhost:8000
```

### Development Server
```bash
npm start
```

Runs the app at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```

Creates optimized production build in `build/` folder.

---

## 📦 Dependencies

### Core
- **React 18.2.0** - UI framework
- **ReactFlow 11.8.3** - Node-based editor
- **Zustand** - State management

### Development
- **react-scripts 5.0.1** - Build tooling

---

## 🏗️ Architecture

### State Management
The app uses Zustand for centralized state management.

### Component Structure
```
src/
├── api/              # Backend integration
├── components/       # React components
├── config/          # Configuration files
├── nodes/           # Node implementations
├── store/           # Zustand store
├── styles/          # Styling
└── utils/           # Helper functions
```

---

## 🎨 Available Scripts

### `npm start`
Development mode with hot reload

### `npm test`
Run test suite (to be implemented)

### `npm run build`
Production build

### `npm run eject`
⚠️ **One-way operation** - Ejects from Create React App

---

## 🔧 Customization

See [PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md) for detailed instructions on adding new node types.

---

## 🌐 API Integration

The frontend communicates with the backend via REST API. Configure API URL in `.env` file.

---

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [ReactFlow Documentation](https://reactflow.dev/)
- [Create React App Documentation](https://create-react-app.dev/)

---

Built with ❤️ using React and ReactFlow

