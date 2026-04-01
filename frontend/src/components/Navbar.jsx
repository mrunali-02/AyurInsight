import { NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const linkStyle = ({ isActive }) => {
    return {
      textDecoration: 'none',
      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
      fontWeight: isActive ? '600' : '400',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      transition: 'all 0.2s',
      borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent'
    };
  };

  return (
    <header style={{
      backgroundColor: 'var(--card-bg)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <Leaf size={24} />
          <span>AyurInsight</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <NavLink to="/" style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/predict" style={linkStyle}>🔮 Predict</NavLink>
          <NavLink to="/supervised" style={linkStyle}>Supervised Learning</NavLink>
          <NavLink to="/clustering" style={linkStyle}>Clustering</NavLink>
          <NavLink to="/association" style={linkStyle}>Association Rules</NavLink>
          <NavLink to="/help" style={linkStyle}>❓ Help</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
