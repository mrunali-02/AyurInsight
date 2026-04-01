import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Bar, Line } from 'react-chartjs-2';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import ClusterScatter from '../components/ClusterScatter';
import Tooltip from '../components/Tooltip';

const Clustering = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('kmeans');

  useEffect(() => {
    const fetchClustering = async () => {
      try {
        const response = await axiosClient.post('/clustering', {
          n_clusters: 3,
          eps: 1.5,
          min_samples: 5
        });
        setData(response.data);
      } catch (err) {
        setError('Failed to run clustering models.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClustering();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Running Clustering Algorithms...</p>
        <p style={{ color: 'var(--text-muted)' }}>Applying PCA and detecting patterns in patient data.</p>
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

  const tabs = [
    { id: 'kmeans', label: 'K-Means' },
    { id: 'hierarchical', label: 'Hierarchical' },
    { id: 'dbscan', label: 'DBSCAN' }
  ];

  const renderKMeans = () => {
    const { kmeans } = data;
    
    const elbowData = {
      labels: kmeans.inertia_curve.k,
      datasets: [{
        label: 'Inertia',
        data: kmeans.inertia_curve.inertia,
        borderColor: 'rgba(13, 148, 136, 1)',
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        fill: true,
        tension: 0.3
      }]
    };

    return (
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <StatCard 
            title={<Tooltip term="Silhouette Score" explanation="Measures how well-separated the clusters are. Ranges from -1 to 1. A score above 0.5 is good, above 0.7 is strong. Negative values mean clusters are overlapping badly.">Silhouette Score</Tooltip>} 
            value={Number(kmeans.silhouette_score).toFixed(3)} 
            subtitle="Measure of cluster cohesion and separation"
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          <ChartCard 
            title={<Tooltip term="PCA" explanation="Principal Component Analysis. Reduces the 25 features to just 2 dimensions so we can plot the data on a 2D scatter chart. The axes (PC1, PC2) are mathematical combinations of the original features, not individual features.">PCA Cluster Scatter Plot</Tooltip>} 
            infoTitle="PCA Cluster Scatter Plot"
            infoLines={[
              "Each dot represents one patient, plotted in 2D using PCA.",
              "Dot color = which cluster the algorithm assigned that patient to.",
              "Clusters that are well-separated visually indicate that the algorithm found meaningful groupings.",
              "Overlap between clusters is normal — PCA compresses 25 dimensions into 2, so some information is lost."
            ]}
            style={{ minHeight: '400px' }}
          >
            <ClusterScatter points={kmeans.pca_points} />
          </ChartCard>
          
          <ChartCard 
            title={<><Tooltip term="Elbow Curve" explanation="A line chart of K-Means inertia (total within-cluster distance) for K=2 to 8. The 'elbow' — where the curve bends sharply — suggests the best value of K to use.">Elbow Curve</Tooltip> &middot; <Tooltip term="Inertia" explanation="The total sum of squared distances between each data point and its assigned cluster centre. Lower inertia = tighter clusters, but always decreases as K increases.">Inertia</Tooltip></>} 
            infoTitle="Elbow Curve (K-Means)"
            infoLines={[
              "Shows how total within-cluster distance (inertia) changes as we increase the number of clusters K.",
              "Look for the 'elbow' — the point where adding more clusters stops giving a big improvement.",
              "In this app, K=3 is chosen to match the 3 known Dosha types."
            ]}
            style={{ minHeight: '400px' }}
          >
            <Line 
              data={elbowData} 
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} 
            />
          </ChartCard>
        </div>
      </div>
    );
  };

  const renderHierarchical = () => {
    const { hierarchical } = data;
    
    const sizesData = {
      labels: Object.keys(hierarchical.cluster_sizes).map(k => `Cluster ${k}`),
      datasets: [{
        label: 'Cluster Size',
        data: Object.values(hierarchical.cluster_sizes),
        backgroundColor: [
          'rgba(13, 148, 136, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }]
    };

    return (
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <StatCard 
            title={<Tooltip term="Silhouette Score" explanation="Measures how well-separated the clusters are. Ranges from -1 to 1. A score above 0.5 is good, above 0.7 is strong. Negative values mean clusters are overlapping badly.">Silhouette Score</Tooltip>} 
            value={Number(hierarchical.silhouette_score).toFixed(3)} 
          />
        </div>
        
        <ChartCard title="Cluster Size Distribution" style={{ minHeight: '400px' }}>
          <Bar 
            data={sizesData} 
            options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} 
          />
        </ChartCard>
      </div>
    );
  };

  const renderDBSCAN = () => {
    const { dbscan } = data;

    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <StatCard 
            title="Number of Clusters Found" 
            value={dbscan.n_clusters} 
          />
          <StatCard 
            title={<Tooltip term="Noise Points" explanation="Data points that DBSCAN could not assign to any cluster because they were too isolated. These may represent unusual patient profiles worth investigating.">Noise Points</Tooltip>} 
            value={dbscan.n_noise} 
            subtitle="Points that do not belong to any dense cluster"
          />
        </div>
        
        <ChartCard title="PCA Cluster Scatter (DBSCAN)" style={{ minHeight: '500px' }}>
          <ClusterScatter points={dbscan.pca_points} />
        </ChartCard>
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <h1><Tooltip term="Unsupervised Learning" explanation="A type of ML where the algorithm finds patterns in data WITHOUT being told the correct answers. No Dosha labels are used — the model discovers groupings on its own.">Unsupervised Learning</Tooltip> &middot; <Tooltip term="Cluster" explanation="A group of data points that are more similar to each other than to points in other groups. Each cluster may represent a natural patient segment.">Clustering</Tooltip></h1>
        <p>Discovering natural groupings within Ayurvedic patient profiles</p>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px 8px 0 0',
              border: '1px solid var(--border)',
              borderBottom: activeTab === tab.id ? 'none' : '1px solid var(--border)',
              backgroundColor: activeTab === tab.id ? 'var(--card-bg)' : 'var(--bg)',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeTab === tab.id ? '600' : '400',
              position: 'relative',
              top: '1px'
            }}
          >
              {tab.id === 'kmeans' ? <Tooltip term="K-Means" explanation="Partitions data into K clusters by minimising the distance between each point and its cluster's centre (centroid). Requires you to specify K in advance.">K-Means</Tooltip> : 
               tab.id === 'hierarchical' ? <Tooltip term="Hierarchical Clustering" explanation="Builds a tree of clusters by repeatedly merging the two closest groups. Does not require specifying K in advance. Ward linkage minimises within-cluster variance.">Hierarchical</Tooltip> : 
               <Tooltip term="DBSCAN" explanation="Density-Based Spatial Clustering. Groups points that are closely packed together, and marks isolated points as noise/outliers. Does not require specifying K.">DBSCAN</Tooltip>}
            </button>
        ))}
      </div>

      <div className="card" style={{ borderTopLeftRadius: activeTab === 'kmeans' ? 0 : '12px' }}>
        {activeTab === 'kmeans' && renderKMeans()}
        {activeTab === 'hierarchical' && renderHierarchical()}
        {activeTab === 'dbscan' && renderDBSCAN()}
      </div>
    </div>
  );
};

export default Clustering;
