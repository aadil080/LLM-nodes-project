import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './components/Toolbar/PipelineToolbar';
import { PipelineCanvas } from './components/Canvas/PipelineCanvas';
import { DeleteButton } from './components/DeleteButton/DeleteButton';
import { AlertContainer } from './components/AlertContainer/AlertContainer';
import { usePipelineStore } from './store/pipelineStore';

function App() {
  const alerts = usePipelineStore((state) => state.alerts);
  const removeAlert = usePipelineStore((state) => state.removeAlert);

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
        <AlertContainer alerts={alerts} onClose={removeAlert} />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
