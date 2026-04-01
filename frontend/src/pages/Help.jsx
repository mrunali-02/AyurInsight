import { useState } from 'react';
import { Search } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Accordion states
  const [expandedSections, setExpandedSections] = useState({
    supervised: false,
    unsupervised: false,
    association: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const glossaryItems = [
    { term: "Accuracy", definition: "The percentage of total predictions the model got correct. Formula: Correct Predictions / Total Predictions. Higher is better." },
    { term: "Antecedent", definition: "The IF part of a rule. Example: {Skin=Dry, Rough, Mental Activity=Restless}. These are the conditions that trigger the rule." },
    { term: "Apriori", definition: "The most common algorithm for association rule mining. It scans the dataset to find frequent itemsets, then generates rules from them." },
    { term: "Association Rule", definition: "A technique that finds frequent co-occurring patterns in data. Example: patients with dry skin AND restless mind frequently have Dosha=Vata." },
    { term: "Cluster", definition: "A group of data points that are more similar to each other than to points in other groups. Each cluster may represent a natural patient segment." },
    { term: "Confidence (rules)", definition: "How often the rule is correct when the antecedent is true. Confidence=0.79 means 79% of patients with dry skin and restless mind are indeed Vata." },
    { term: "Confusion Matrix", definition: "A grid showing predicted class (columns) vs actual class (rows). Diagonal cells are correct predictions. Off-diagonal cells are errors." },
    { term: "Consequent", definition: "The THEN part of a rule. Example: {Dosha=Vata}. This is what the rule predicts or implies." },
    { term: "Cross-Validation", definition: "The model is trained and tested K times on different splits of the data. The average score shows how well the model generalises to unseen data." },
    { term: "DBSCAN", definition: "Density-Based Spatial Clustering. Groups points that are closely packed together, and marks isolated points as noise/outliers. Does not require specifying K." },
    { term: "Decision Tree", definition: "A tree-shaped model that splits data by asking a series of if-then questions about features. Highly interpretable." },
    { term: "Dosha", definition: "In Ayurveda, a Dosha is a bio-energy type that governs your physical and mental characteristics. The three Doshas are Vata, Pitta, and Kapha." },
    { term: "Elbow Curve", definition: "A line chart of K-Means inertia for different K. The 'elbow' — where the curve bends sharply — suggests the best value of K to use." },
    { term: "Encoding", definition: "Converting categorical text values (like 'Dry, Rough') into numbers that machine learning algorithms can process." },
    { term: "F1-Score", definition: "The harmonic mean of Precision and Recall. Useful when classes are imbalanced. A score of 1.0 is perfect." },
    { term: "Feature", definition: "An input attribute. The dataset contains 25 features covering physical, psychological, and physiological traits." },
    { term: "Feature Importance", definition: "Which input attributes had the most influence on a prediction, computed from the model's internal weights." },
    { term: "Hierarchical Clustering", definition: "Builds a tree of clusters by repeatedly merging the two closest groups. Does not require specifying K in advance." },
    { term: "Inertia", definition: "The total sum of squared distances between each data point and its assigned cluster centre. Lower inertia = tighter clusters." },
    { term: "Kapha", definition: "Governed by earth and water. Associated with stability, heavy build, oily skin, slow metabolism, and long-term memory." },
    { term: "K-Means", definition: "Partitions data into K clusters by minimising the distance between each point and its cluster's centre. Requires specifying K." },
    { term: "KNN", definition: "K-Nearest Neighbours. Classifies a new point by looking at the K closest training examples and taking a majority vote." },
    { term: "LabelEncoder", definition: "A simple encoding method that assigns each unique text string a unique integer (e.g., 'A'=1, 'B'=2)." },
    { term: "Lift", definition: "How much more likely the consequent is given the antecedent, compared to random chance. Lift=1 means no association." },
    { term: "Logistic Regression", definition: "A statistical model that predicts class probability using a logistic function. Assumes linear relationships." },
    { term: "Naive Bayes", definition: "A probabilistic classifier based on Bayes' theorem. Assumes all features are independent of each other." },
    { term: "Noise Point", definition: "Data points that DBSCAN could not assign to any cluster because they were too isolated." },
    { term: "Overfitting", definition: "When a model learns the training data too well, capturing noise instead of the general pattern, resulting in poor predictions." },
    { term: "PCA", definition: "Principal Component Analysis. Reduces many features to fewer dimensions so we can plot them. Dimensions are math combinations of features." },
    { term: "Pitta", definition: "Governed by fire and water. Associated with intensity, sharp digestion, medium build, warm body temperature, and strong hunger." },
    { term: "Precision", definition: "Of all the times the model predicted a class, how often was it actually correct? High precision = fewer false positives." },
    { term: "Recall", definition: "Of all actual instances of a class, how many did the model correctly identify? High recall = fewer false negatives." },
    { term: "Silhouette Score", definition: "Measures how well-separated the clusters are. Ranges from -1 to 1. Higher is better." },
    { term: "StandardScaler", definition: "Centers data to mean=0 and scales to standard deviation=1. Crucial for cluster distance metrics." },
    { term: "Support (rules)", definition: "How often a rule appears in the entire dataset. Used to filter out rare patterns." },
    { term: "SVM", definition: "Support Vector Machine. Finds the best boundary (hyperplane) between classes in high-dimensional space." },
    { term: "Train/Test Split", definition: "Dividing records into a large group to train the model, and a smaller separate group to evaluate it fairly." },
    { term: "Unsupervised Learning", definition: "Finding hidden structure in data WITHOUT being told the correct answers (Doshas)." },
    { term: "Vata", definition: "Governed by air and space. Associated with creativity, quick thinking, light body frame, dry skin, and irregular habits." }
  ];

  const filteredGlossary = glossaryItems.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Accordion = ({ title, isOpen, onToggle, children }) => (
    <div style={{ marginBottom: '1rem', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
      <button 
        onClick={onToggle}
        style={{ 
          width: '100%', 
          padding: '1rem', 
          backgroundColor: isOpen ? 'var(--primary-light)' : 'var(--card-bg)',
          color: isOpen ? 'var(--primary-dark)' : 'var(--text)',
          border: 'none',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontWeight: '600',
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        <span>▶ {title}</span>
        <span style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>❯</span>
      </button>
      <div 
        style={{ 
          maxHeight: isOpen ? '2000px' : '0', 
          overflow: 'hidden', 
          transition: 'max-height 0.4s ease-in-out',
          backgroundColor: 'var(--card-bg)'
        }}
      >
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: '3rem' }}>
      <div className="page-header">
        <h1>❓ Academic Help System</h1>
        <p>A comprehensive guide to Ayurveda attributes and Business Intelligence methodologies</p>
      </div>

      {/* SECTION 1 */}
      <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>What is AyurInsight?</h2>
        <div style={{ lineHeight: '1.6', color: 'var(--text)', marginBottom: '1.5rem' }}>
          <p>AyurInsight is a Business Intelligence platform that applies three classical machine learning paradigms to a dataset of 5,000 patients classified by their Ayurvedic Dosha type.</p>
          <p>The platform was built as a Semester 6 BI Lab project to demonstrate how data science techniques can be applied to traditional wellness knowledge systems.</p>
          <p>The dataset contains 25 attributes per patient — covering physical, psychological, and physiological traits — and a target label of Vata, Pitta, or Kapha.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="badge">5,000 Patients</span>
          <span className="badge">25 Features</span>
          <span className="badge">3 Dosha Classes</span>
        </div>
      </div>

      {/* SECTION 2 */}
      <h2 style={{ color: 'var(--primary)' }}>Understanding Ayurveda & Doshas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>🌬️ Vata (Air + Space)</h3>
          <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"Creative, quick, light. Vata types are energetic and imaginative but prone to anxiety, irregular habits, and restlessness when out of balance."</p>
          <div style={{ color: 'var(--text-muted)' }}>
            <strong>Key traits:</strong> Thin frame &middot; Dry skin &middot; Short-term memory &middot; Irregular hunger &middot; Dreams of the sky
          </div>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>🔥 Pitta (Fire + Water)</h3>
          <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"Focused, intense, sharp. Pitta types are driven and perceptive but prone to irritability and inflammation when overstimulated."</p>
          <div style={{ color: 'var(--text-muted)' }}>
            <strong>Key traits:</strong> Medium build &middot; Warm body temp &middot; Strong hunger &middot; Good memory &middot; Dreams of fire
          </div>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>🌊 Kapha (Earth + Water)</h3>
          <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"Calm, stable, nurturing. Kapha types are patient and loyal but prone to lethargy and resistance to change when imbalanced."</p>
          <div style={{ color: 'var(--text-muted)' }}>
            <strong>Key traits:</strong> Heavy build &middot; Oily skin &middot; Long-term memory &middot; Skips meals &middot; Dreams of water
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <h2 style={{ color: 'var(--primary)' }}>The Three ML Pillars</h2>
      <div style={{ marginBottom: '3rem' }}>
        <Accordion 
          title="Supervised Learning — Dosha Classification" 
          isOpen={expandedSections.supervised} 
          onToggle={() => toggleSection('supervised')}
        >
          <p>Supervised learning trains a model on labelled examples. Here, each patient's 25 attributes are the input (X) and their Dosha type is the label (y) the model learns to predict.</p>
          <p>We test 5 algorithms:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Logistic Regression</strong> — fast statistical baseline</li>
            <li><strong>Decision Tree</strong> — rule-based, highly interpretable</li>
            <li><strong>SVM</strong> — finds optimal class boundaries in high dimensions</li>
            <li><strong>Naive Bayes</strong> — probabilistic, assumes feature independence</li>
            <li><strong>KNN</strong> — classifies by similarity to nearest neighbours</li>
          </ul>
          <p>The dataset is split 80% for training and 20% for testing. Each model is also evaluated with 5-fold cross-validation to confirm it generalises well.</p>
          
          <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>What it measures</th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Accuracy</td><td>Overall correct predictions</td><td>0–100%</td></tr>
                <tr><td>Precision</td><td>Correct among predicted positives</td><td>0–1</td></tr>
                <tr><td>Recall</td><td>Correct among actual positives</td><td>0–1</td></tr>
                <tr><td>F1-Score</td><td>Balance of Precision and Recall</td><td>0–1</td></tr>
                <tr><td>CV Score</td><td>Generalisation across 5 data splits</td><td>0–1</td></tr>
              </tbody>
            </table>
          </div>
        </Accordion>

        <Accordion 
          title="Unsupervised Learning — Patient Clustering" 
          isOpen={expandedSections.unsupervised} 
          onToggle={() => toggleSection('unsupervised')}
        >
          <p>Unsupervised learning finds hidden structure in data WITHOUT using the Dosha labels. The algorithm groups similar patients together based purely on their 25 attribute values.</p>
          <p>We use three algorithms:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>K-Means</strong> — partitions patients into K groups around centroids</li>
            <li><strong>Hierarchical</strong> — builds a tree of nested clusters (Ward linkage)</li>
            <li><strong>DBSCAN</strong> — finds dense regions; marks outliers as noise</li>
          </ul>
          <p>All features are standardised with StandardScaler before clustering, then reduced to 2D with PCA for the scatter plot visualisation.</p>
          
          <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Silhouette Score</td><td>Cluster separation quality (-1 to 1)</td></tr>
                <tr><td>Inertia</td><td>Total within-cluster distance (lower=better)</td></tr>
                <tr><td>Elbow Point</td><td>Best K where inertia stops improving fast</td></tr>
                <tr><td>Noise Points</td><td>Outliers DBSCAN could not cluster</td></tr>
                <tr><td>PCA Components</td><td>2D projection of 25 original features</td></tr>
              </tbody>
            </table>
          </div>
        </Accordion>

        <Accordion 
          title="Association Rule Mining — Attribute Patterns" 
          isOpen={expandedSections.association} 
          onToggle={() => toggleSection('association')}
        >
          <p>Association rule mining discovers which combinations of attributes frequently appear together. These rules take the form:<br/><strong>IF {'{condition}'} THEN {'{outcome}'}</strong></p>
          <p><strong>Example:</strong> IF Skin=Dry,Rough AND Mental Activity=Restless THEN Dosha=Vata (Confidence: 79%, Lift: 2.4)</p>
          <p>The Apriori algorithm scans all 5,000 records to find frequent attribute combinations, then generates rules filtered by minimum Support, Confidence, and Lift thresholds.</p>
          
          <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Formula</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Support</td><td>freq(A∪B) / N</td><td>How often the pattern appears</td></tr>
                <tr><td>Confidence</td><td>freq(A∪B) / freq(A)</td><td>How often the rule is correct</td></tr>
                <tr><td>Lift</td><td>Confidence / Support(B)</td><td>Strength vs random chance</td></tr>
                <tr><td>Conviction</td><td>(1−Supp(B)) / (1−Confidence)</td><td>Rule reliability measure</td></tr>
              </tbody>
            </table>
          </div>
        </Accordion>
      </div>

      {/* SECTION 4 */}
      <h2 style={{ color: 'var(--primary)' }}>How to Use Each Page</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>1</span>
            <h3 style={{ margin: 0 }}>Dashboard</h3>
          </div>
          <p style={{ margin: 0 }}>Start here. See how many patients are in the dataset, how they are distributed across the three Dosha classes, and which feature categories are used. Good for a quick overview.</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>2</span>
            <h3 style={{ margin: 0 }}>Predict Your Dosha</h3>
          </div>
          <p style={{ margin: 0 }}>Select your personal attributes from the dropdowns and click Predict. The best-performing model will classify your Dosha and show a confidence score for each class, along with lifestyle tips personalised to your result.</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>3</span>
            <h3 style={{ margin: 0 }}>Supervised Learning</h3>
          </div>
          <p style={{ margin: 0 }}>Compare all 5 classification algorithms. Use the tab selector to switch between models. Read the confusion matrix to see where each model makes mistakes, and the per-class table for precision and recall by Dosha.</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>4</span>
            <h3 style={{ margin: 0 }}>Clustering</h3>
          </div>
          <p style={{ margin: 0 }}>Explore how the data groups naturally when Dosha labels are ignored. Switch between K-Means, Hierarchical, and DBSCAN tabs. The PCA scatter plot shows patient clusters in 2D.</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>5</span>
            <h3 style={{ margin: 0 }}>Association Rules</h3>
          </div>
          <p style={{ margin: 0 }}>Adjust the three sliders to control which rules are shown. Lower min_support finds rarer patterns. Higher min_lift keeps only the strongest rules. Sort the table by Lift to find the most meaningful attribute combinations.</p>
        </div>
      </div>

      {/* SECTION 5 */}
      <h2 style={{ color: 'var(--primary)' }}>Dataset & Technical Reference</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card" style={{ flex: '1 1 400px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Dataset Summary</h3>
          <table>
            <tbody>
              <tr><td><strong>Source</strong></td><td>Kaggle</td></tr>
              <tr><td><strong>Total Records</strong></td><td>5,000 patients</td></tr>
              <tr><td><strong>Total Columns</strong></td><td>26 (25 features + 1 target)</td></tr>
              <tr><td><strong>Missing Values</strong></td><td>None</td></tr>
              <tr><td><strong>Feature Types</strong></td><td>All categorical (text values)</td></tr>
              <tr><td><strong>Target Classes</strong></td><td>Vata (960), Pitta (1835), Kapha (2205)</td></tr>
              <tr><td><strong>Encoding</strong></td><td>LabelEncoder for ML, get_dummies() for Apriori</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card" style={{ flex: '1 1 300px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Tech Stack</h3>
          <table>
            <tbody>
              <tr><td><strong>Frontend</strong></td><td>React 19, Vite 6, Chart.js, Axios</td></tr>
              <tr><td><strong>Backend</strong></td><td>Python, Flask, Flask-CORS</td></tr>
              <tr><td><strong>ML</strong></td><td>Scikit-learn, MLxtend (Apriori)</td></tr>
              <tr><td><strong>Data</strong></td><td>Pandas, NumPy</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 6 */}
      <h2 style={{ color: 'var(--primary)' }}>Glossary</h2>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', backgroundColor: 'var(--card-bg)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <Search size={20} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
        <input 
          type="text" 
          placeholder="Search glossary terms..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem', color: 'var(--text)' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {filteredGlossary.map((item, idx) => (
          <div key={idx} className="card">
            <h4 style={{ color: 'var(--primary-dark)', marginTop: 0, marginBottom: '0.5rem' }}>{item.term}</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)' }}>{item.definition}</p>
          </div>
        ))}
        {filteredGlossary.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>No terms found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <p style={{ margin: 0 }}>Built for the Business Intelligence Lab — Semester 6</p>
        <p style={{ margin: '0.5rem 0' }}>Dataset: Kaggle Ayurvedic Dosha Dataset (5,000 × 26)</p>
        <p style={{ margin: 0 }}>Algorithms: Scikit-learn &middot; MLxtend &middot; React &middot; Flask</p>
      </div>
    </div>
  );
};

export default Help;
