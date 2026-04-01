import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Bar } from 'react-chartjs-2';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import ConfusionMatrix from '../components/ConfusionMatrix';
import ModelResultTable from '../components/ModelResultTable';
import Tooltip from '../components/Tooltip';
import InfoButton from '../components/InfoButton';

const Supervised = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axiosClient.post('/supervised', {
          test_size: 0.2,
          random_state: 42
        });
        
        // Find best model
        let bestAcc = 0;
        let bestIdx = 0;
        response.data.models.forEach((model, idx) => {
          if (model.accuracy > bestAcc) {
            bestAcc = model.accuracy;
            bestIdx = idx;
          }
        });
        
        // Add isBest flag
        const models = response.data.models.map((m, idx) => ({
          ...m,
          isBest: idx === bestIdx
        }));
        
        setData({ models });
        setSelectedModelIdx(bestIdx);
      } catch (err) {
        setError('Failed to run supervised models. This may take longer than usual.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Training models, please wait...</p>
        <p style={{ color: 'var(--text-muted)' }}>This evaluates 5 distinct algorithms using cross-validation.</p>
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

  if (!data || !data.models) return null;

  const models = data.models;
  const selectedModel = models[selectedModelIdx];
  const doshaLabels = ['Vata', 'Pitta', 'Kapha']; // Or get from actual data context if possible
  // Ensure the labels match our report keys nicely

  const comparisonData = {
    labels: models.map(m => m.name),
    datasets: [
      {
        label: 'Accuracy',
        data: models.map(m => m.accuracy),
        backgroundColor: models.map(m => m.isBest ? 'rgba(13, 148, 136, 0.8)' : 'rgba(203, 213, 225, 0.8)'),
      }
    ]
  };

  const compOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { min: 0, max: 1 }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Supervised Learning</h1>
        <p>Classification models to predict Dosha using all 25 features</p>
      </div>

      <ChartCard 
        title="Model Comparison (Accuracy)" 
        infoTitle="Model Accuracy Comparison"
        infoLines={[
          "Side-by-side accuracy scores for all 5 classification algorithms tested on the same 20% test split.",
          "All models are trained on the same 80% training data and evaluated on the same 20% test data — a fair comparison.",
          "Higher bar = better overall performance. But also check F1-scores per class, as accuracy can be misleading with imbalanced classes."
        ]}
        style={{ minHeight: '300px', marginBottom: '2rem' }}
      >
        <Bar data={comparisonData} options={compOptions} />
      </ChartCard>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {models.map((model, idx) => (
          <button
            key={model.name}
            onClick={() => setSelectedModelIdx(idx)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px 8px 0 0',
              border: '1px solid var(--border)',
              borderBottom: selectedModelIdx === idx ? 'none' : '1px solid var(--border)',
              backgroundColor: selectedModelIdx === idx ? 'var(--card-bg)' : 'var(--bg)',
              color: selectedModelIdx === idx ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: selectedModelIdx === idx ? '600' : '400',
              position: 'relative',
              top: '1px' // Cover the border below
            }}
          >
            <Tooltip term={model.name} explanation={
              model.name === 'Logistic Regression' ? "A statistical model that predicts class probability using a logistic function. Fast and interpretable but assumes linear relationships between features." :
              model.name === 'Decision Tree' ? "A tree-shaped model that splits data by asking a series of if-then questions about features. Highly interpretable and works well with categorical data." :
              model.name === 'SVM' ? "Support Vector Machine. Finds the best boundary (hyperplane) between classes in high-dimensional space. Effective but slower to train." :
              model.name === 'Naive Bayes' ? "A probabilistic classifier based on Bayes' theorem. Assumes all features are independent of each other — fast but this assumption may not always hold." :
              "K-Nearest Neighbours. Classifies a new point by looking at the K closest training examples and taking a majority vote. Simple but computationally expensive at prediction time."
            }>
              {model.name}
            </Tooltip>
            {model.isBest && <span className="badge" style={{ marginLeft: '0.5rem' }}>Best</span>}
          </button>
        ))}
      </div>

      <div className="card" style={{ borderTopLeftRadius: selectedModelIdx === 0 ? 0 : '12px' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {selectedModel.name} Results
          {selectedModel.isBest && <span className="badge" style={{ backgroundColor: 'var(--success)', color: 'white' }}>Highest Accuracy</span>}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <StatCard 
            title={<Tooltip term="Accuracy" explanation="The percentage of total predictions the model got correct. Formula: Correct Predictions / Total Predictions. Higher is better.">Accuracy</Tooltip>} 
            value={`${(selectedModel.accuracy * 100).toFixed(1)}%`}
          />
          <StatCard 
            title={<Tooltip term="CV Score" explanation="Cross-Validation Score. The model is trained and tested 5 times on different splits of the data. The average score shows how well the model generalises to unseen data.">CV Score (5-fold)</Tooltip>} 
            value={`${(selectedModel.cv_score * 100).toFixed(1)}%`}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Class Metrics</h3>
            <ModelResultTable report={selectedModel.classification_report} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>Confusion Matrix</h3>
              <InfoButton 
                title="Confusion Matrix" 
                lines={[
                  "A 3×3 grid showing predicted class (columns) vs actual class (rows).",
                  "Diagonal cells (top-left to bottom-right) are CORRECT predictions — darker teal = more correct.",
                  "Off-diagonal cells are ERRORS — e.g. the model predicted Pitta but the patient was actually Vata.",
                  "A perfect model would have all values on the diagonal and zeros everywhere else."
                ]} 
              />
            </div>
            <ConfusionMatrix 
              matrix={selectedModel.confusion_matrix} 
              labels={doshaLabels}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supervised;
