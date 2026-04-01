import os
import pandas as pd

_cached_df = None

def load_data():
    global _cached_df
    if _cached_df is None:
        file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'ayurvedic_dosha_dataset.csv')
        _cached_df = pd.read_csv(file_path)
    return _cached_df
