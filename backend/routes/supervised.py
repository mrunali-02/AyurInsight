from flask import Blueprint, request, jsonify
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import numpy as np

from utils.data_loader import load_data
from utils.preprocessing import encode_features

supervised_bp = Blueprint('supervised', __name__)

@supervised_bp.route('/supervised', methods=['POST'])
def run_supervised():
    data = request.json or {}
    test_size = data.get('test_size', 0.2)
    random_state = data.get('random_state', 42)
    
    df = load_data()
    X, label_encoders, y = encode_features(df)
    
    dosha_le = label_encoders['Dosha']
    classes = dosha_le.classes_ # Expected to be Kapha, Pitta, Vata
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)
    
    models = [
        ("Logistic Regression", LogisticRegression(max_iter=1000, C=1.0)),
        ("Decision Tree", DecisionTreeClassifier(max_depth=10, criterion='gini')),
        ("SVM", SVC(kernel='rbf', C=1.0)),
        ("Naive Bayes", GaussianNB()),
        ("KNN", KNeighborsClassifier(n_neighbors=5, metric='minkowski'))
    ]
    
    results = []
    
    for name, model in models:
        # Cross val
        cv_scores = cross_val_score(model, X, y, cv=5)
        cv_score = np.mean(cv_scores)
        
        # Train & Evaluate
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)
        
        # We need to ensure we get a full report for all classes
        report_dict = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
        
        # Mapping encoded indices to class labels for the report
        formatted_report = {}
        for class_val, class_name in enumerate(dosha_le.classes_):
            if str(class_val) in report_dict:
                formatted_report[class_name] = report_dict[str(class_val)]
            else:
                formatted_report[class_name] = {"precision": 0, "recall": 0, "f1-score": 0, "support": 0}
                
        results.append({
            "name": name,
            "accuracy": float(acc),
            "cv_score": float(cv_score),
            "confusion_matrix": cm.tolist(),
            "classification_report": formatted_report
        })
        
    return jsonify({"models": results})
