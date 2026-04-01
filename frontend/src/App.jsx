import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Supervised from './pages/Supervised';
import Predict from './pages/Predict';
import Clustering from './pages/Clustering';
import Association from './pages/Association';
import Help from './pages/Help';
import { useNavigate } from 'react-router-dom';

function FloatingHelpButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => window.scrollTo(0,0) || navigate('/help')}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: '#1e293b',
        color: 'white',
        border: 'none',
        borderRadius: '999px',
        padding: '0.75rem 1.25rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      ❓ Help
    </button>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ padding: '2rem', flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/supervised" element={<Supervised />} />
            <Route path="/clustering" element={<Clustering />} />
            <Route path="/association" element={<Association />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
        <FloatingHelpButton />
      </div>
    </Router>
  );
}

export default App;
