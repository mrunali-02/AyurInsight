import { useState, useMemo } from 'react';
import Tooltip from './Tooltip';

const RulesTable = ({ rules }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'lift', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const rulesPerPage = 10;

  const sortedRules = useMemo(() => {
    let sortableRules = [...rules];
    if (sortConfig !== null) {
      sortableRules.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        
        // Handle array lengths for antecedents/consequents sorting if needed
        if (Array.isArray(valA)) valA = valA.length;
        if (Array.isArray(valB)) valB = valB.length;

        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRules;
  }, [rules, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page
  };

  const getClassForLift = (lift) => {
    if (lift > 2.0) return 'var(--success)';
    if (lift >= 1.5) return 'var(--warning)';
    return 'var(--text)';
  };

  // Pagination
  const indexOfLastRule = currentPage * rulesPerPage;
  const indexOfFirstRule = indexOfLastRule - rulesPerPage;
  const currentRules = sortedRules.slice(indexOfFirstRule, indexOfLastRule);
  const totalPages = Math.ceil(rules.length / rulesPerPage);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toFixed(3);
  };

  if (rules.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
        No valid rules found with the current thresholds.
      </div>
    );
  }

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '800px' }}>
          <thead>
            <tr>
              <th onClick={() => requestSort('antecedents')} style={{ cursor: 'pointer', width: '35%' }}>
                <Tooltip term="Antecedent" explanation="The IF part of a rule. Example: {Skin=Dry, Rough, Mental Activity=Restless}. These are the conditions that trigger the rule.">Antecedents</Tooltip>
              </th>
              <th onClick={() => requestSort('consequents')} style={{ cursor: 'pointer', width: '15%' }}>
                <Tooltip term="Consequent" explanation="The THEN part of a rule. Example: {Dosha=Vata}. This is what the rule predicts or implies.">Consequents</Tooltip>
              </th>
              <th onClick={() => requestSort('support')} style={{ cursor: 'pointer' }}>
                <Tooltip term="Support" explanation="How often this rule appears in the entire dataset. Support=0.18 means 18% of all 5,000 patients matched this pattern.">Support</Tooltip>
              </th>
              <th onClick={() => requestSort('confidence')} style={{ cursor: 'pointer' }}>
                <Tooltip term="Confidence" explanation="How often the rule is correct when the antecedent is true. Confidence=0.79 means 79% of patients with dry skin and restless mind are indeed Vata.">Confidence</Tooltip>
              </th>
              <th onClick={() => requestSort('lift')} style={{ cursor: 'pointer' }}>
                <Tooltip term="Lift" explanation="How much more likely the consequent is given the antecedent, compared to random chance. Lift=1 means no association. Lift=2.4 means 2.4× more likely than chance — a strong rule.">Lift</Tooltip>
              </th>
              <th onClick={() => requestSort('conviction')} style={{ cursor: 'pointer' }}>
                <Tooltip term="Conviction" explanation="Measures how much the rule would be wrong if the antecedent and consequent were independent. Higher conviction = the rule is more reliable.">Conviction</Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRules.map((rule, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {rule.antecedents.map(ant => (
                      <span key={ant} className="badge">{ant}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {rule.consequents.map(cons => (
                      <span key={cons} className="badge" style={{ backgroundColor: 'var(--primary-dark)', color: 'white' }}>{cons}</span>
                    ))}
                  </div>
                </td>
                <td>{formatNumber(rule.support)}</td>
                <td>{formatNumber(rule.confidence)}</td>
                <td style={{ color: getClassForLift(rule.lift), fontWeight: 'bold' }}>
                  {formatNumber(rule.lift)}
                </td>
                <td>{formatNumber(rule.conviction)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn-primary"
            style={{ opacity: currentPage === 1 ? 0.5 : 1, padding: '0.25rem 0.75rem' }}
          >
            Prev
          </button>
          <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn-primary"
            style={{ opacity: currentPage === totalPages ? 0.5 : 1, padding: '0.25rem 0.75rem' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RulesTable;
