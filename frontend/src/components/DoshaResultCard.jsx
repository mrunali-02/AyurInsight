import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Tooltip from './Tooltip';

const DoshaResultCard = ({ result, onTryAgain }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Trigger progress animation
    const timer = setTimeout(() => setShowProgress(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getDoshaConfig = (dosha) => {
    switch (dosha) {
      case 'Vata':
        return {
          emoji: '🌬️',
          bg: '#ede9fe',
          text: '#6d28d9',
          description: "Vata is governed by air and space. Vata types are creative, quick-thinking, and energetic, but prone to anxiety, irregular habits, and restlessness when out of balance.",
          diet: "Favour warm, cooked, and lightly oiled foods like soups, stews, and rice. Avoid cold, raw, dry, or leftover foods. Eat at regular times.",
          lifestyle: "Maintain a consistent daily routine. Avoid over-stimulation and excessive travel. Practice grounding yoga, oil massage, and meditation."
        };
      case 'Pitta':
        return {
          emoji: '🔥',
          bg: '#fff7ed',
          text: '#c2410c',
          description: "Pitta is governed by fire and water. Pitta types are focused, ambitious, and sharp-minded, but prone to irritability, inflammation, and burnout when overstimulated.",
          diet: "Favour cool, sweet, and bitter foods like salads, dairy, and grains. Avoid spicy, sour, salty, and fried foods. Do not skip meals.",
          lifestyle: "Avoid excessive heat, competition, and stress. Practice cooling pranayama and spend time in nature. Prioritise leisure and creative outlets."
        };
      case 'Kapha':
        return {
          emoji: '🌊',
          bg: '#eff6ff',
          text: '#1d4ed8',
          description: "Kapha is governed by earth and water. Kapha types are calm, nurturing, and stable, but prone to lethargy, weight gain, and resistance to change when imbalanced.",
          diet: "Favour light, dry, warm, and spiced foods. Avoid heavy, oily, sweet, and cold foods. Eat smaller portions and avoid snacking.",
          lifestyle: "Exercise vigorously and regularly. Seek new experiences and stimulation. Wake up early, avoid daytime naps, and maintain social activity."
        };
      default:
        return {};
    }
  };

  const config = getDoshaConfig(result.predicted_dosha);
  
  // Section 4 Chart Data
  let chartData = null;
  if (result.feature_importance && result.feature_importance.length > 0) {
    chartData = {
      labels: result.feature_importance.map(f => f.feature),
      datasets: [
        {
          label: 'Importance',
          data: result.feature_importance.map(f => f.importance),
          backgroundColor: '#0d9488',
        }
      ]
    };
  }

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  return (
    <div style={{ animation: 'fadeSlideUp 0.6s ease-out forwards' }}>
      <style>
        {`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .progress-bar {
            height: 100%;
            border-radius: 999px;
            transition: width 0.8s ease-in-out;
          }
        `}
      </style>

      {/* SEC 1: PREDICTED DOSHA BANNER */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '1.5rem', backgroundColor: config.bg, color: config.text, borderColor: config.bg }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
          {config.emoji} <span style={{ fontWeight: 'bold' }}>{result.predicted_dosha}</span>
        </div>
        <div style={{ gap: '0.5rem', display: 'flex', justifyContent: 'center' }}>
          <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.5)', color: config.text }}>
            <Tooltip term="Best Model" explanation="The model with the highest 5-fold cross-validation score across all 5 algorithms. It was selected automatically and trained on the full dataset of 5,000 patients.">Model</Tooltip>: {result.model_used}
          </span>
          <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.5)', color: config.text }}>
            Accuracy: {(result.model_accuracy * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* SEC 2: CONFIDENCE BREAKDOWN */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Prediction <Tooltip term="Confidence %" explanation="The model's predicted probability for each Dosha class. These three values always add up to 100%. The highest value is the predicted Dosha.">Confidence %</Tooltip></h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(result.confidence).map(([dosha, conf]) => {
            const isPredicted = dosha === result.predicted_dosha;
            const widthPct = `${(conf * 100).toFixed(1)}%`;
            return (
              <div key={dosha} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '60px', fontWeight: isPredicted ? 'bold' : 'normal', color: isPredicted ? 'var(--text)' : 'var(--text-muted)' }}>
                  {dosha}
                </span>
                <div style={{ flex: 1, height: '12px', backgroundColor: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: showProgress ? widthPct : '0%', 
                      backgroundColor: isPredicted ? '#0d9488' : '#cbd5e1'
                    }} 
                  />
                </div>
                <span style={{ width: '45px', textAlign: 'right', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  {widthPct}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEC 3: DOSHA DESCRIPTION & LIFESTYLE */}
      <div className="card" style={{ marginBottom: chartData ? '1.5rem' : '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          {['description', 'diet', 'lifestyle'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === tab ? '600' : '400',
                textTransform: 'capitalize',
                marginBottom: '-1px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ lineHeight: '1.6', color: 'var(--text)' }}>
          {config[activeTab]}
        </div>
      </div>

      {/* SEC 4: FEATURE IMPORTANCE CHART */}
      {chartData && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}><Tooltip term="Feature Importance" explanation="Which input attributes had the most influence on this prediction. Computed from the model's internal weights. Only available for Decision Tree and Logistic Regression.">Feature Importance</Tooltip></h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', marginTop: 0 }}>Top 10 features by absolute influence</p>
          <div style={{ height: '300px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* TRY AGAIN */}
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={onTryAgain}
          style={{
            backgroundColor: 'transparent',
            border: '2px solid var(--primary)',
            color: 'var(--primary)',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
};

export default DoshaResultCard;
