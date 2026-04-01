const StatCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text)', margin: '0' }}>{value}</p>
        {subtitle && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginbottom: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
      {Icon && (
        <div style={{ 
          backgroundColor: 'var(--primary-light)', 
          color: 'var(--primary)', 
          padding: '0.75rem', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
