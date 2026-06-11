import { PipelineToolbar } from './components/Toolbar/PipelineToolbar';
import { PipelineCanvas } from './components/Canvas/PipelineCanvas';

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
    </div>
  );
}

export default App;
