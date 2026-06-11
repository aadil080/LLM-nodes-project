import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './components/Toolbar/PipelineToolbar';
import { PipelineCanvas } from './components/Canvas/PipelineCanvas';
import { DeleteButton } from './components/DeleteButton/DeleteButton';

function App() {
  return (
    <ReactFlowProvider>
      <div style={{ 
        display: 'flex',
        background: '#0F172A', 
        minHeight: '100vh',
        overflow: 'hidden'
      }}>
        <PipelineToolbar />
        <PipelineCanvas />
        <DeleteButton />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
