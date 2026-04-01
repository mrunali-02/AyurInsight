from flask import Blueprint, jsonify
from utils.data_loader import load_data

overview_bp = Blueprint('overview', __name__)

@overview_bp.route('/overview', methods=['GET'])
def get_overview():
    df = load_data()
    
    total_records = len(df)
    total_features = len(df.columns) - 1 # excluding target
    
    dosha_counts = {str(k): int(v) for k, v in df['Dosha'].value_counts().items()}
    
    # Feature categories from prompt
    feature_categories = {
        "physical": [
            "Body Frame", "Type of Hair", "Color of Hair", "Skin", "Complexion",
            "Body Weight", "Nails", "Size and Color of the Teeth"
        ],
        "psychological": [
            "Pace of Performing Work", "Mental Activity", "Memory",
            "Sleep Pattern", "Weather Conditions", "Reaction under Adverse Situations",
            "Mood", "Eating Habit", "Hunger"
        ],
        "physiological": [
            "Body Temperature", "Joints", "Nature", "Body Energy",
            "Quality of Voice", "Dreams", "Social Relations", "Body Odor"
        ]
    }
    
    return jsonify({
        "total_records": total_records,
        "total_features": total_features,
        "dosha_distribution": dosha_counts,
        "feature_categories": feature_categories
    })
