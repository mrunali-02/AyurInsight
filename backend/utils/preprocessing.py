import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.decomposition import PCA

def encode_features(df):
    encoded_df = df.copy()
    label_encoders = {}
    for col in encoded_df.columns:
        le = LabelEncoder()
        encoded_df[col] = le.fit_transform(encoded_df[col].astype(str))
        label_encoders[col] = le
        
    encoded_target = encoded_df['Dosha'].values
    encoded_features = encoded_df.drop('Dosha', axis=1)
    
    return encoded_features, label_encoders, encoded_target

def scale_features(X):
    scaler = StandardScaler()
    scaled_X = scaler.fit_transform(X)
    return scaled_X

def apply_pca(X_scaled, n_components=2):
    pca = PCA(n_components=n_components)
    return pca.fit_transform(X_scaled)
