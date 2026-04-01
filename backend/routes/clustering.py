from flask import Blueprint, request, jsonify
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.metrics import silhouette_score
import numpy as np
import pandas as pd

from utils.data_loader import load_data
from utils.preprocessing import encode_features, scale_features, apply_pca

clustering_bp = Blueprint('clustering', __name__)

@clustering_bp.route('/clustering', methods=['POST'])
def run_clustering():
    data = request.json or {}
    n_clusters = data.get('n_clusters', 3)
    eps = data.get('eps', 1.5)
    min_samples = data.get('min_samples', 5)
    
    df = load_data()
    X, label_encoders, _ = encode_features(df)
    
    X_scaled = scale_features(X)
    X_pca = apply_pca(X_scaled, n_components=2)
    
    # K-Means
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    kmeans_labels = kmeans.fit_predict(X_scaled)
    kmeans_sil = silhouette_score(X_scaled, kmeans_labels)
    
    # Inertia curve for K-Means (K=2 to 8)
    inertia_k = []
    inertia_values = []
    for k in range(2, 9):
        km = KMeans(n_clusters=k, random_state=42)
        km.fit(X_scaled)
        inertia_k.append(k)
        inertia_values.append(km.inertia_)
        
    inertia_curve = {
        "k": inertia_k,
        "inertia": inertia_values
    }
    
    # Max 500 pca points for frontend performance
    df_pca = pd.DataFrame(X_pca, columns=['x', 'y'])
    df_pca['kmeans_cluster'] = kmeans_labels
    
    kmeans_sample = df_pca.sample(min(500, len(df_pca)), random_state=42)
    kmeans_points = [
        {"x": float(row['x']), "y": float(row['y']), "cluster": int(row['kmeans_cluster'])} 
        for _, row in kmeans_sample.iterrows()
    ]
    
    # Hierarchical
    agglo = AgglomerativeClustering(n_clusters=n_clusters, linkage='ward')
    agglo_labels = agglo.fit_predict(X_scaled)
    agglo_sil = silhouette_score(X_scaled, agglo_labels)
    
    cluster_sizes = {}
    for label in np.unique(agglo_labels):
        cluster_sizes[str(label)] = int(np.sum(agglo_labels == label))
        
    # DBSCAN
    dbscan = DBSCAN(eps=eps, min_samples=min_samples)
    dbscan_labels = dbscan.fit_predict(X_scaled)
    
    # count clusters (excluding -1)
    unique_labels = set(dbscan_labels)
    n_noise = list(dbscan_labels).count(-1)
    if -1 in unique_labels:
        unique_labels.remove(-1)
    dbscan_n_clusters = len(unique_labels)
    
    df_pca['dbscan_cluster'] = dbscan_labels
    dbscan_sample = df_pca.sample(min(500, len(df_pca)), random_state=42)
    dbscan_points = [
        {"x": float(row['x']), "y": float(row['y']), "cluster": int(row['dbscan_cluster'])} 
        for _, row in dbscan_sample.iterrows()
    ]
    
    return jsonify({
        "kmeans": {
            "silhouette_score": float(kmeans_sil),
            "inertia_curve": inertia_curve,
            "pca_points": kmeans_points
        },
        "hierarchical": {
            "silhouette_score": float(agglo_sil),
            "cluster_sizes": cluster_sizes
        },
        "dbscan": {
            "n_clusters": dbscan_n_clusters,
            "n_noise": n_noise,
            "pca_points": dbscan_points
        }
    })
