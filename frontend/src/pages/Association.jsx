import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import RulesTable from '../components/RulesTable';
import Tooltip from '../components/Tooltip';
import { Bar } from 'react-chartjs-2';

const Association = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Parameters
  const [minSupport, setMinSupport] = useState(0.15);
  const [minConfidence, setMinConfidence] = useState(0.60);
  const [minLift, setMinLift] = useState(1.2);

  const fetchRules = useCallback(async (support, confidence, lift) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post('/association', {
        min_support: support,
        min_confidence: confidence,
        min_lift: lift
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to generate association rules.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load auto-run
  useEffect(() => {
    fetchRules(0.15, 0.60, 1.2);
  }, [fetchRules]);

  const handleRunAnalysis = (e) => {
    e.preventDefault();
    fetchRules(minSupport, minConfidence, minLift);
  };

  const renderTopRulesChart = () => {
    if (!data || data.rules.length === 0) return null;
    
    const topRules = data.rules.slice(0, 10);
    const labels = topRules.map(r => {
      const ant = r.antecedents.join(', ');
      const con = r.consequents.join(', ');
      return `${ant} → ${con}`.substring(0, 50) + '...';
    });

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Lift',
          data: topRules.map(r => r.lift),
          backgroundColor: 'rgba(13, 148, 136, 0.8)'
        }
      ]
    };

    const options = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    };

    return (
      <ChartCard 
        title="Top 10 Rules by Lift" 
        infoTitle="Top 10 Rules by Lift"
        infoLines={[
          "The 10 association rules with the highest Lift scores.",
          "Lift measures how much stronger the rule is compared to random chance.",
          "A rule with Lift=2.4 means the consequent is 2.4× more likely given the antecedent than it would be by coincidence.",
          "Rules pointing to Dosha types are the most actionable for Ayurvedic practitioners."
        ]}
        style={{ minHeight: '400px', marginBottom: '2rem' }}
      >
        <Bar data={chartData} options={options} />
      </ChartCard>
    );
  };

  return (
    <div>
      <div className="page-header">
        <h1><Tooltip term="Association Rule Mining" explanation="A technique that finds frequent co-occurring patterns in data. Example: patients with dry skin AND restless mind frequently have Dosha=Vata.">Association Rule Mining</Tooltip> (<Tooltip term="Apriori Algorithm" explanation="The most common algorithm for association rule mining. It scans the dataset to find frequent itemsets, then generates rules from them.">Apriori</Tooltip>)</h1>
        <p>Discovering frequent itemsets and causal relationships between symptoms and Dosha</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Analysis Parameters</h3>
        <form onSubmit={handleRunAnalysis} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-end' }}>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              <Tooltip term="min_support" explanation="The minimum frequency threshold. Only patterns that appear in at least this fraction of the dataset are considered. Lower values find more (but weaker) rules.">Min Support</Tooltip> ({minSupport})
            </label>
            <input 
              type="range" 
              min="0.05" max="0.5" step="0.05"
              value={minSupport}
              onChange={(e) => setMinSupport(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              <Tooltip term="min_confidence" explanation="The minimum correctness threshold. Only rules that are correct at least this often are kept.">Min Confidence</Tooltip> ({minConfidence})
            </label>
            <input 
              type="range" 
              min="0.3" max="1.0" step="0.05"
              value={minConfidence}
              onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              <Tooltip term="min_lift" explanation="The minimum strength threshold. Filters out rules that are only weakly better than random chance.">Min Lift</Tooltip> ({minLift})
            </label>
            <input 
              type="range" 
              min="1.0" max="3.0" step="0.1"
              value={minLift}
              onChange={(e) => setMinLift(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ height: '40px' }}>
            {loading ? 'Running...' : 'Run Analysis'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="spinner-container" style={{ minHeight: '30vh' }}>
          <div className="spinner"></div>
          <p>Generating rules...</p>
        </div>
      ) : error ? (
        <div className="card" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          <p>{error}</p>
        </div>
      ) : data ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <StatCard 
              title="Total Frequent Itemsets" 
              value={data.total_itemsets} 
            />
            <StatCard 
              title="Rules Found" 
              value={data.total_rules} 
              subtitle="Meeting specified thresholds"
            />
          </div>

          {renderTopRulesChart()}

          <div className="card">
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>All Rules</h3>
            <RulesTable rules={data.rules || []} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Association;
