from flask import Blueprint, request, jsonify
import numpy as np
import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder

from utils.data_loader import load_data

predict_bp = Blueprint('predict', __name__)

# GLOBALS
TRAINED_MODELS = {}
FEATURE_ENCODERS = {}
TARGET_ENCODER = None
MODEL_ACCURACIES = {}
BEST_MODEL_NAME = ""

def init_models():
    global TRAINED_MODELS, FEATURE_ENCODERS, TARGET_ENCODER, MODEL_ACCURACIES, BEST_MODEL_NAME
    
    print("Initializing models for predictions. This will run ONCE on startup...")
    df = load_data()
    
    X_full = df.drop('Dosha', axis=1)
    y_full = df['Dosha']
    
    # Label encode features
    X_encoded = X_full.copy()
    for col in X_encoded.columns:
        le = LabelEncoder()
        X_encoded[col] = le.fit_transform(X_encoded[col].astype(str))
        FEATURE_ENCODERS[col] = le
        
    # Label encode target
    TARGET_ENCODER = LabelEncoder()
    y_encoded = TARGET_ENCODER.fit_transform(y_full.astype(str))
    
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Decision Tree": DecisionTreeClassifier(max_depth=10),
        "SVC": SVC(probability=True, kernel='rbf'),
        "GaussianNB": GaussianNB(),
        "KNN": KNeighborsClassifier(n_neighbors=5)
    }
    
    best_score = -1
    best_name = ""
    
    for name, model in models.items():
        # Get mean CV score
        cv_scores = cross_val_score(model, X_encoded, y_encoded, cv=5)
        mean_cv = np.mean(cv_scores)
        MODEL_ACCURACIES[name] = float(mean_cv)
        
        # Fit on full data
        model.fit(X_encoded, y_encoded)
        TRAINED_MODELS[name] = model
        
        if mean_cv > best_score:
            best_score = mean_cv
            best_name = name
            
    BEST_MODEL_NAME = best_name
    print(f"Models initialized. Best Model: {BEST_MODEL_NAME} (CV Score: {best_score:.4f})")

@predict_bp.route('/predict/options', methods=['GET'])
def get_options():
    df = load_data()
    options = {}
    for col in df.columns:
        if col != 'Dosha':
            options[col] = sorted(df[col].dropna().unique().astype(str).tolist())
    return jsonify({"options": options})

@predict_bp.route('/predict/info', methods=['GET'])
def get_info():
    if not BEST_MODEL_NAME:
        return jsonify({"error": "Models not initialized"}), 500
        
    return jsonify({
        "best_model": BEST_MODEL_NAME,
        "best_model_accuracy": MODEL_ACCURACIES[BEST_MODEL_NAME]
    })

@predict_bp.route('/predict', methods=['POST'])
def run_predict():
    data = request.json or {}
    features = data.get('features', {})
    
    if not features:
        return jsonify({"error": "No features provided"}), 400
        
    df = load_data()
    feature_cols = [col for col in df.columns if col != 'Dosha']
    
    encoded_vals = []
    
    for col in feature_cols:
        val = features.get(col)
        if val is None or val == "":
            return jsonify({"error": f"Missing value for feature: {col}"}), 400
            
        le = FEATURE_ENCODERS.get(col)
        if val not in le.classes_:
            return jsonify({"error": f"Invalid value for feature {col}: {val}"}), 400
            
        # Transform single value
        encoded_val = le.transform([val])[0]
        encoded_vals.append(encoded_val)
        
    X_input = np.array(encoded_vals).reshape(1, -1)
    
    best_model = TRAINED_MODELS[BEST_MODEL_NAME]
    pred_idx = best_model.predict(X_input)[0]
    pred_dosha = TARGET_ENCODER.inverse_transform([pred_idx])[0]
    
    probas = best_model.predict_proba(X_input)[0]
    class_names = TARGET_ENCODER.classes_
    
    confidence = {}
    for i, class_name in enumerate(class_names):
        confidence[class_name] = float(probas[i])
        
    feature_importance = None
    
    # Get feature importance if supported
    importances = None
    if isinstance(best_model, DecisionTreeClassifier):
        importances = best_model.feature_importances_
    elif isinstance(best_model, LogisticRegression):
        # average magnitude across classes
        importances = np.mean(np.abs(best_model.coef_), axis=0)
        
    if importances is not None:
        # Create list of dicts, sort by importance descending
        feat_imp_list = [{"feature": col, "importance": float(imp)} for col, imp in zip(feature_cols, importances)]
        feat_imp_list = sorted(feat_imp_list, key=lambda x: x['importance'], reverse=True)
        feature_importance = feat_imp_list[:10]  # top 10
        
    return jsonify({
        "predicted_dosha": pred_dosha,
        "confidence": confidence,
        "model_used": BEST_MODEL_NAME,
        "model_accuracy": MODEL_ACCURACIES[BEST_MODEL_NAME],
        "feature_importance": feature_importance
    })
