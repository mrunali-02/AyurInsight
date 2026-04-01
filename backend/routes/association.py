from flask import Blueprint, request, jsonify
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

from utils.data_loader import load_data

association_bp = Blueprint('association', __name__)

@association_bp.route('/association', methods=['POST'])
def run_association():
    data = request.json or {}
    min_support = data.get('min_support', 0.15)
    min_confidence = data.get('min_confidence', 0.60)
    min_lift = data.get('min_lift', 1.2)
    
    df = load_data()
    
    # One-hot encode all columns
    df_encoded = pd.get_dummies(df)
    
    # In pandas 2.x, apriori expects boolean dataframe
    df_bool = df_encoded.astype(bool)
    
    frq_items = apriori(df_bool, min_support=min_support, use_colnames=True)
    
    if frq_items.empty:
        return jsonify({
            "total_itemsets": 0,
            "total_rules": 0,
            "rules": []
        })
    
    total_itemsets = len(frq_items)
    
    try:
        rules = association_rules(frq_items, metric="confidence", min_threshold=min_confidence)
    except ValueError:
        return jsonify({
            "total_itemsets": total_itemsets,
            "total_rules": 0,
            "rules": []
        })
        
    if rules.empty:
        return jsonify({
            "total_itemsets": total_itemsets,
            "total_rules": 0,
            "rules": []
        })
    
    # Filter by lift
    rules = rules[rules['lift'] >= min_lift]
    
    # Sort top rules by lift descending
    rules = rules.sort_values(by="lift", ascending=False).head(100)
    total_rules = len(rules)
    
    rules_list = []
    
    for _, row in rules.iterrows():
        rules_list.append({
            "antecedents": list(row['antecedents']),
            "consequents": list(row['consequents']),
            "support": float(row['support']),
            "confidence": float(row['confidence']),
            "lift": float(row['lift']),
            "conviction": float(row['conviction']) if pd.notnull(row['conviction']) and row['conviction'] != float('inf') else None
        })
        
    return jsonify({
        "total_itemsets": total_itemsets,
        "total_rules": total_rules,
        "rules": rules_list
    })
