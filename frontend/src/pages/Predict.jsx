import { useState, useEffect, useRef } from 'react';
import axiosClient from '../api/axiosClient';
import DoshaResultCard from '../components/DoshaResultCard';
import Tooltip from '../components/Tooltip';

const Predict = () => {
  const [options, setOptions] = useState(null);
  const [info, setInfo] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [result, setResult] = useState(null);
  
  const formTopRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [optRes, infoRes] = await Promise.all([
          axiosClient.get('/predict/options'),
          axiosClient.get('/predict/info')
        ]);
        setOptions(optRes.data.options);
        setInfo(infoRes.data);
      } catch (err) {
        setFetchError('Failed to load prediction form options. Models might still be building.');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const featureGroups = {
    physical: [
      "Body Frame", "Type of Hair", "Color of Hair", "Skin",
      "Complexion", "Body Weight", "Nails", "Size and Color of the Teeth"
    ],
    psychological: [
      "Pace of Performing Work", "Mental Activity", "Memory", "Sleep Pattern",
      "Weather Conditions", "Reaction under Adverse Situations", "Mood", 
      "Eating Habit", "Hunger"
    ],
    physiological: [
      "Body Temperature", "Joints", "Nature", "Body Energy",
      "Quality of Voice", "Dreams", "Social Relations", "Body Odor"
    ]
  };

  const handleChange = (feature, value) => {
    setFormData(prev => ({ ...prev, [feature]: value }));
    if (errors[feature]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[feature];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all 25 fields
    const newErrors = {};
    const allFeatures = [...featureGroups.physical, ...featureGroups.psychological, ...featureGroups.physiological];
    
    let firstErrorField = null;
    
    for (const feat of allFeatures) {
      if (!formData[feat]) {
        newErrors[feat] = true;
        if (!firstErrorField) firstErrorField = feat;
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const el = document.getElementById(`field-${firstErrorField}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setLoading(true);
    setFetchError(null);
    
    try {
      const response = await axiosClient.post('/predict', { features: formData });
      setResult(response.data);
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setFetchError(err.response?.data?.error || 'Failed to generate prediction.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setFormData({});
    setErrors({});
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!options && !fetchError) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading Predictor Models...</p>
      </div>
    );
  }

  const renderDropdowns = (featuresList) => {
    return featuresList.map(feature => (
      <div key={feature} id={`field-${feature}`} style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text)' }}>
          {feature}
        </label>
        <select
          value={formData[feature] || ''}
          onChange={(e) => handleChange(feature, e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '6px',
            border: errors[feature] ? '2px solid var(--danger)' : '1px solid var(--border)',
            backgroundColor: 'var(--bg)',
            color: formData[feature] ? 'var(--text)' : 'var(--text-muted)'
          }}
        >
          <option value="" disabled>-- Select --</option>
          {options[feature]?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors[feature] && (
          <div style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem' }}>This field is required</div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <div className="page-header" ref={formTopRef}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>🔮 Predict Your Dosha</h1>
            <p>Fill in your physical, psychological and physiological attributes to discover your Ayurvedic body type.</p>
          </div>
          {info && (
            <span className="badge" style={{ backgroundColor: 'var(--primary-light)', padding: '0.5rem 1rem' }}>
              <Tooltip term="Best Model" explanation="The model with the highest 5-fold cross-validation score across all 5 algorithms. It was selected automatically and trained on the full dataset of 5,000 patients.">Powered by {info.best_model}</Tooltip> &middot; Accuracy: {(info.best_model_accuracy * 100).toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {fetchError && (
        <div className="card" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', marginBottom: '1.5rem' }}>
          <p>{fetchError}</p>
        </div>
      )}

      {!result && options && (
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            
            <h3 style={{ marginTop: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              🏃 Physical Attributes
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {renderDropdowns(featureGroups.physical)}
            </div>

            <h3 style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              🧠 Psychological & Behavioral
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {renderDropdowns(featureGroups.psychological)}
            </div>

            <h3 style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              🌡️ Physiological Characteristics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {renderDropdowns(featureGroups.physiological)}
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ width: '100%', fontSize: '1.125rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading ? (
                <>
                  <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Predicting...
                </>
              ) : '✨ Predict My Dosha'}
            </button>
          </form>
        </div>
      )}

      <div ref={resultRef}>
        {result && (
          <DoshaResultCard result={result} onTryAgain={handleTryAgain} />
        )}
      </div>
    </div>
  );
};

export default Predict;
