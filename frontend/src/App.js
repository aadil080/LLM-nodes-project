import { PipelineToolbar } from './components/Toolbar/PipelineToolbar';
import { PipelineCanvas } from './components/Canvas/PipelineCanvas';
import { DeleteButton } from './components/DeleteButton/DeleteButton';

function App() {
  return (
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
  );
}

export default App;
