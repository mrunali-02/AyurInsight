import InfoButton from './InfoButton';

const ChartCard = ({ title, children, style = {}, infoTitle, infoLines }) => {
  return (
    <div className="card" style={{ 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        backgroundColor: 'var(--primary)'
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: 'var(--text)' }}>
          {title}
        </h3>
        {infoLines && <InfoButton title={infoTitle || title} lines={infoLines} />}
      </div>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
