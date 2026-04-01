import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

const Tooltip = ({ term, explanation, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState('top');
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);

  const checkPosition = () => {
    if (targetRef.current && isVisible) {
      const rect = targetRef.current.getBoundingClientRect();
      if (rect.top < 100) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
  };

  useEffect(() => {
    checkPosition();
    window.addEventListener('scroll', checkPosition);
    return () => window.removeEventListener('scroll', checkPosition);
  }, [isVisible]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) setIsVisible(false);
  };

  return (
    <span 
      ref={targetRef}
      style={{ 
        position: 'relative', 
        display: 'inline-flex', 
        alignItems: 'center', 
        cursor: 'help' 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (window.innerWidth < 768) {
          e.preventDefault();
          e.stopPropagation();
          handleToggle();
        }
      }}
    >
      <span style={{ borderBottom: '1.5px dotted #0d9488' }}>
        {children || term}
      </span>
      <Info size={14} style={{ marginLeft: '4px', color: '#0d9488' }} />

      {isVisible && (
        <div 
          ref={tooltipRef}
          style={{
            position: 'absolute',
            [position === 'top' ? 'bottom' : 'top']: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: position === 'bottom' ? '8px' : '0',
            marginBottom: position === 'top' ? '8px' : '0',
            backgroundColor: '#1e293b',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            width: 'max-content',
            maxWidth: '280px',
            zIndex: 1000,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            animation: 'fadeIn 150ms ease-in-out',
            textAlign: 'left',
            lineHeight: '1.4'
          }}
        >
          {explanation}
          <div style={{
            position: 'absolute',
            left: '50%',
            [position === 'top' ? 'bottom' : 'top']: '-4px',
            transform: `translateX(-50%) rotate(${position === 'top' ? '45deg' : '225deg'})`,
            width: '8px',
            height: '8px',
            backgroundColor: '#1e293b',
          }} />
        </div>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </span>
  );
};

export default Tooltip;
