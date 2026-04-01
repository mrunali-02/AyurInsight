import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import Tooltip from '../components/Tooltip';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Database, ListFilter, Activity } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/overview');
        setData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const doughnutData = {
    labels: Object.keys(data.dosha_distribution || {}),
    datasets: [{
      data: Object.values(data.dosha_distribution || {}),
      backgroundColor: [
        'rgba(13, 148, 136, 0.8)', // teal (Kapha)
        'rgba(245, 158, 11, 0.8)', // orange (Pitta)
        'rgba(139, 92, 246, 0.8)'  // purple (Vata)
      ],
      borderWidth: 1,
    }]
  };

  const featureCategoryData = {
    labels: ['Physical', 'Psychological', 'Physiological'],
    datasets: [{
      label: 'Feature Count',
      data: [
        data.feature_categories?.physical?.length || 0,
        data.feature_categories?.psychological?.length || 0,
        data.feature_categories?.physiological?.length || 0
      ],
      backgroundColor: 'rgba(13, 148, 136, 0.8)',
    }]
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>AyurInsight Dashboard</h1>
        <p>Ayurvedic Dosha Intelligence Platform Overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard 
          title="Total Records" 
          value={data.total_records?.toLocaleString() || 0} 
          icon={Database} 
        />
        <StatCard 
          title={<Tooltip term="25 Features" explanation="The dataset contains 25 input attributes per patient, covering physical traits (like skin type), psychological traits (like mood), and physiological traits (like body temperature).">Total Features</Tooltip>} 
          value={data.total_features || 0} 
          icon={ListFilter} 
        />
        <StatCard 
          title={<Tooltip term="Dosha" explanation="In Ayurveda, a Dosha is a bio-energy type that governs your physical and mental characteristics. The three Doshas are Vata, Pitta, and Kapha.">Dosha Classes</Tooltip>} 
          value={Object.keys(data.dosha_distribution || {}).length || 0} 
          icon={Activity} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <ChartCard 
          title="Dosha Distribution" 
          infoTitle="Dosha Distribution"
          infoLines={[
            "This doughnut chart shows how many patients belong to each Dosha class.",
            "Kapha is the largest class (2,205), Pitta is medium (1,835), and Vata is the smallest (960).",
            "Class imbalance like this can affect model performance — smaller classes like Vata may have lower recall scores."
          ]}
          style={{ minHeight: '350px' }}
        >
          <Doughnut 
            data={doughnutData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { legend: { position: 'right' } }
            }} 
          />
        </ChartCard>
        
        <ChartCard 
          title="Feature Categories" 
          infoTitle="Feature Categories"
          infoLines={[
            "The 25 features are grouped into 3 categories: Physical (8 features), Psychological (9 features), and Physiological (8 features).",
            "All features are categorical — they contain text values like 'Dry, Rough' or 'Restless', not numbers.",
            "These were encoded into numbers using LabelEncoder before being fed into the ML models."
          ]}
          style={{ minHeight: '350px' }}
        >
          <Bar data={featureCategoryData} options={barOptions} />
        </ChartCard>
      </div>

      <h2 style={{ marginBottom: '1rem', color: 'var(--text)' }}>Features Details</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {Object.entries(data.feature_categories || {}).map(([category, features]) => (
          <div key={category} className="card">
            <h3 style={{ textTransform: 'capitalize', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              {category} ({features.length})
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {features.map((feature, idx) => (
                <li key={idx} style={{ padding: '0.5rem 0', borderBottom: idx < features.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '0.875rem' }}>
                  • {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
