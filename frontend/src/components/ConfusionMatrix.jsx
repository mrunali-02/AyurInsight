const ConfusionMatrix = ({ matrix, labels }) => {
  // Find max value for color scaling
  const maxVal = Math.max(...matrix.flat());

  const getBackgroundColor = (value) => {
    // scale opacity based on value
    const opacity = maxVal > 0 ? (value / maxVal) * 0.9 : 0;
    return `rgba(13, 148, 136, ${opacity})`; // Teal color with varying opacity
  };

  const getTextColor = (value) => {
    const opacity = maxVal > 0 ? value / maxVal : 0;
    return opacity > 0.5 ? '#ffffff' : 'var(--text)';
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ minWidth: '400px', border: '1px solid var(--border)' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: 'transparent', borderBottom: 'none' }}></th>
            <th colSpan={labels.length} style={{ textAlign: 'center', backgroundColor: '#f8fafc' }}>
              Predicted
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: '#f8fafc' }}>Actual</th>
            {labels.map((label, i) => (
              <th key={i} style={{ textAlign: 'center' }}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={`row-${i}`}>
              <th style={{ backgroundColor: '#f8fafc', whiteSpace: 'nowrap' }}>{labels[i]}</th>
              {row.map((cell, j) => (
                <td 
                  key={`cell-${i}-${j}`} 
                  style={{ 
                    textAlign: 'center', 
                    backgroundColor: getBackgroundColor(cell),
                    color: getTextColor(cell),
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfusionMatrix;
