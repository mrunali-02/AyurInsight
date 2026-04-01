import Tooltip from './Tooltip';

const ModelResultTable = ({ report }) => {
  const classes = ['Vata', 'Pitta', 'Kapha'];

  const getF1Color = (score) => {
    if (score >= 0.9) return 'var(--success)';
    if (score >= 0.7) return 'var(--primary)';
    if (score >= 0.5) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ minWidth: '400px' }}>
        <thead>
          <tr>
            <th>Class</th>
            <th style={{ textAlign: 'right' }}>
              <Tooltip term="Precision" explanation="Of all the times the model predicted a class, how often was it actually correct? High precision = fewer false positives.">Precision</Tooltip>
            </th>
            <th style={{ textAlign: 'right' }}>
              <Tooltip term="Recall" explanation="Of all actual instances of a class, how many did the model correctly identify? High recall = fewer false negatives.">Recall</Tooltip>
            </th>
            <th style={{ textAlign: 'right' }}>
              <Tooltip term="F1-Score" explanation="The harmonic mean of Precision and Recall. Useful when classes are imbalanced. A score of 1.0 is perfect.">F1-Score</Tooltip>
            </th>
            <th style={{ textAlign: 'right' }}>
              <Tooltip term="Support" explanation="The number of actual instances of each class in the test set. Useful for understanding which classes have more evaluation examples.">Support</Tooltip>
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.map(cls => {
            const data = report[cls] || { precision: 0, recall: 0, 'f1-score': 0, support: 0 };
            return (
              <tr key={cls}>
                <td style={{ fontWeight: 'bold' }}>{cls}</td>
                <td style={{ textAlign: 'right' }}>{Number(data.precision).toFixed(3)}</td>
                <td style={{ textAlign: 'right' }}>{Number(data.recall).toFixed(3)}</td>
                <td 
                  style={{ 
                    textAlign: 'right', 
                    color: getF1Color(data['f1-score']),
                    fontWeight: 'bold'
                  }}
                >
                  {Number(data['f1-score']).toFixed(3)}
                </td>
                <td style={{ textAlign: 'right' }}>{data.support}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ModelResultTable;
