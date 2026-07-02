# 🌿 AyurInsight — Ayurvedic Dosha Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.3-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4%2B-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2.2%2B-150458?style=for-the-badge&logo=pandas&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**AyurInsight** is a full-stack, machine learning–powered web application that predicts an individual's Ayurvedic body type (Dosha) — Vata, Pitta, or Kapha — based on 25 physical, psychological, and physiological attributes. It bridges traditional Ayurvedic wisdom with modern data science by applying five classical supervised classification algorithms, unsupervised clustering techniques, and Apriori association rule mining on a curated dataset of 5,000 patient records. AyurInsight is designed for data science students, Ayurveda practitioners, healthcare researchers, and educators who want an interactive, analytically rich platform for exploring Dosha classification.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Design](#-database-design)
- [Authentication Flow](#-authentication-flow)
- [Security Features](#-security-features)
- [Project Workflow](#-project-workflow)
- [Screenshots](#-screenshots)
- [Deployment Guide](#-deployment-guide)
- [Performance Optimizations](#-performance-optimizations)
- [Testing](#-testing)
- [Future Enhancements](#-future-enhancements)
- [Challenges Faced](#-challenges-faced)
- [Learning Outcomes](#-learning-outcomes)
- [Resume Highlights](#-resume-highlights)
- [GitHub Statistics](#-github-statistics)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)

---

## 🔍 Project Overview

### Purpose

AyurInsight applies modern machine learning to Ayurvedic medicine — a 5,000-year-old Indian health system — with the goal of automating Dosha classification. The platform gives users an interactive, data-driven way to understand their Ayurvedic constitution and provides educators and researchers with a full suite of analytical tools including supervised learning benchmarks, unsupervised clustering, and association rule discovery.

### Problem Statement

Ayurvedic Dosha classification traditionally relies on in-person consultation with an Ayurvedic practitioner, making it inaccessible, inconsistent, and time-consuming. There is no open, reproducible, data-driven system that allows individuals to receive a Dosha prediction, or researchers to benchmark machine learning algorithms on Ayurvedic datasets.

### Solution

AyurInsight solves this by:
- Providing an interactive **Dosha prediction form** backed by five trained ML classifiers, automatically selecting the best model via 5-fold cross-validation.
- Offering a **supervised learning benchmarks page** where users can configure train/test splits and instantly compare model accuracy, F1 scores, precision, recall, and confusion matrices.
- Including a **clustering analysis page** using K-Means, Agglomerative Hierarchical, and DBSCAN with PCA scatter plots and silhouette scoring.
- Delivering an **association rule mining page** powered by the Apriori algorithm with configurable support, confidence, and lift thresholds.
- Presenting a **live dashboard** with Dosha distribution charts and feature category breakdowns.

### Target Users

| User Type | Use Case |
|-----------|----------|
| Students & Data Science Learners | Learn ML algorithms in an applied, domain-specific context |
| Ayurveda Practitioners & Researchers | Explore patterns and validate traditional assessments with data |
| Healthcare Educators | Use as a teaching tool for AI in healthcare |
| General Public | Receive a personalized Dosha prediction with diet and lifestyle advice |
| Open Source Contributors | Extend the platform with new models, features, or datasets |

### Business Value

- **Educational Impact**: Bridges the gap between Ayurvedic medicine and modern data science curricula.
- **Healthcare Accessibility**: Democratizes Dosha assessment to anyone with a browser, globally.
- **Research Enablement**: Provides a reproducible benchmark environment for ML research on health datasets.
- **Scalability**: Modular Flask Blueprint architecture allows new ML modules to be added without affecting existing services.

---

## ✨ Features

### 🖥️ Frontend Features

- **Interactive Dosha Prediction Form** — A 25-field, grouped dropdown form (Physical, Psychological, Physiological) with real-time client-side validation and auto-scroll to the first error field.
- **Animated Dosha Result Card** — Prediction results appear with a `fadeSlideUp` CSS animation, showing the predicted Dosha with color-coded branding (purple for Vata, orange for Pitta, blue for Kapha).
- **Animated Confidence Progress Bars** — CSS-transitioned progress bars show probability distributions across all three Dosha classes with a 0.8-second ease-in animation.
- **Tabbed Result Detail Panels** — Result card includes tabbed panels for Dosha Description, Diet Recommendations, and Lifestyle Advice.
- **Supervised Learning Comparison Dashboard** — Side-by-side model comparison table with accuracy, CV scores, precision, recall, and F1 scores for all five classifiers.
- **Interactive Confusion Matrix Visualizer** — Colour-coded confusion matrix rendered per model for Kapha, Pitta, and Vata classes.
- **K-Means PCA Scatter Plot** — Interactive 2D scatter plot using PCA-reduced feature space for cluster visualization.
- **Elbow Curve Chart** — K-Means inertia curve (K=2 to 8) to help determine the optimal number of clusters.
- **Association Rules Table** — Filterable and sortable rules table displaying antecedents, consequents, support, confidence, lift, and conviction metrics.
- **Contextual Tooltip System** — Inline educational tooltips for technical terms like "Dosha," "Best Model," "Confidence %," and "Feature Importance."
- **Floating Help Button** — Persistent global help button (bottom-left) navigates to the comprehensive Help & Documentation page.
- **Dosha Distribution Doughnut Chart** — Live dashboard chart showing class distribution across 5,000 records.
- **Feature Categories Bar Chart** — Horizontal bar chart breaking down 25 features into Physical (8), Psychological (9), and Physiological (8) categories.
- **Loading Spinners & Error States** — All pages include loading skeletons and graceful error messages for API failures.
- **Client-Side SPA Routing** — Seamless navigation with `react-router-dom` v7 supporting six routes with no page reloads.

### 🔧 Backend Features

- **Blueprint-Based Modular Flask API** — Five separate Flask Blueprints (`overview`, `supervised`, `clustering`, `association`, `predict`) registered under `/api/*` for clean separation of concerns.
- **Background Model Initialization** — ML models are trained on a background thread at startup using Python's `threading.Thread(daemon=True)`, preventing blocking of the main Flask thread.
- **Automatic Best Model Selection** — The `/api/predict/info` endpoint dynamically reports the model with the highest mean 5-fold cross-validation score, selected at initialization time.
- **In-Memory Dataset Caching** — `data_loader.py` uses a module-level `_cached_df` variable to load the CSV only once across all requests, reducing I/O overhead.
- **Multi-Algorithm Supervised Pipeline** — A single `/api/supervised` endpoint trains and evaluates Logistic Regression, Decision Tree (max_depth=10), SVM (RBF kernel), Naive Bayes, and KNN (k=5) with configurable test size and random state.
- **Apriori Association Rule Mining** — `/api/association` uses `mlxtend` to generate frequent itemsets and association rules with configurable support, confidence, and lift thresholds, returning the top 100 rules by lift.
- **Multi-Algorithm Clustering Service** — `/api/clustering` runs K-Means, Agglomerative Hierarchical (Ward linkage), and DBSCAN simultaneously, returning PCA scatter plot coordinates, silhouette scores, and inertia curves.
- **Feature Importance Extraction** — For Decision Tree and Logistic Regression, the `/api/predict` endpoint extracts and returns the top 10 features by absolute importance.
- **CORS-Scoped Cross-Origin Policy** — CORS is configured to accept requests only from `http://localhost:5173`, preventing unauthorized cross-origin access.

### 🤖 AI / ML Features

- **Five-Model Ensemble Benchmark** — Logistic Regression, Decision Tree, SVM, Gaussian Naive Bayes, and K-Nearest Neighbors trained and evaluated in a single pipeline.
- **5-Fold Cross-Validation** — Every model is evaluated with `cross_val_score` (cv=5) to produce a generalized performance metric beyond simple train/test split.
- **Label Encoding Pipeline** — All categorical features are encoded using `sklearn.preprocessing.LabelEncoder`; encoders are persisted per column for consistent inference.
- **StandardScaler + PCA Preprocessing** — Clustering pipeline applies `StandardScaler` before `PCA(n_components=2)` to ensure scale-independent dimensionality reduction.
- **Probability Calibration** — SVM is initialized with `probability=True` (Platt Scaling) to enable `predict_proba()` for confidence scores.
- **DBSCAN Noise Detection** — DBSCAN identifies noise points (cluster label `-1`) separately, reporting both `n_clusters` and `n_noise` for accurate density-based analysis.
- **Classification Report Generation** — The supervised endpoint uses `sklearn.metrics.classification_report` with `output_dict=True` to return per-class precision, recall, F1, and support.

### 📊 Data & Dataset Features

- **5,000-Record Ayurvedic Dataset** — A curated CSV dataset (~1.2 MB) with 25 categorical input features and one multi-class target (`Dosha`: Vata, Pitta, Kapha).
- **25-Feature Coverage** — Physical traits (Body Frame, Skin, Hair Type/Color, Nails, Teeth), psychological traits (Memory, Mood, Mental Activity, Sleep), and physiological traits (Body Temperature, Joints, Body Energy, Voice Quality).
- **Class-Imbalanced Dataset** — Kapha (~2,205), Pitta (~1,835), Vata (~960) — documented in the dashboard for model evaluation context.

---

## 🏗️ System Architecture

AyurInsight follows a two-tier client-server architecture with a stateless REST API backend and a single-page React frontend.

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React 19 SPA (Vite dev server :5173)       │   │
│  │  Dashboard | Predict | Supervised | Clustering |        │   │
│  │  Association | Help                                     │   │
│  │             Axios HTTP Client (timeout: 120s)           │   │
│  └──────────────────────────┬──────────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────────┘
                              │  HTTP REST / JSON
                              │  CORS: localhost:5173 only
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Flask Backend (Port 5000)                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  CORS Middleware → Blueprint Router → Response Formatter   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  /api/overview  /api/supervised  /api/clustering                 │
│  /api/association  /api/predict  /api/predict/options            │
│  /api/predict/info                                               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              ML Engine (scikit-learn + mlxtend)            │ │
│  │  data_loader.py (cached CSV)                               │ │
│  │  preprocessing.py (LabelEncoder, StandardScaler, PCA)     │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         File System: backend/data/*.csv (~1.2 MB)          │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Architecture Component Summary

| Component | Description |
|-----------|-------------|
| **Client** | Browser-based React 19 SPA served on `localhost:5173` via Vite |
| **Frontend** | React functional components with hooks, `react-router-dom` v7 SPA routing, `react-chartjs-2` for charts |
| **API Layer** | Axios instance with 120-second timeout, base URL `http://localhost:5000/api`, JSON content type |
| **Backend** | Flask 3.0.3 with five registered Blueprints under `/api/*` prefix |
| **ML Engine** | scikit-learn 1.4+ for supervised/clustering, mlxtend 0.23+ for Apriori, NumPy 2.0+ |
| **Background Threading** | Model initialization runs on a daemon thread at startup to avoid blocking Flask |
| **Authentication** | None (open educational tool — all endpoints publicly accessible) |
| **Data Storage** | Static CSV loaded once into memory and cached globally via `_cached_df` |
| **Deployment** | Dev: Vite + Flask debug. Production: Gunicorn + Nginx / Vercel + Render |

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI framework, component-based SPA | 19.2.4 |
| Vite | Frontend build tool & dev server | 8.0.1 |
| react-router-dom | Client-side SPA routing (6 routes) | 7.13.2 |
| Axios | HTTP client for Flask REST API | 1.14.0 |
| Chart.js | Canvas-based chart rendering | 4.5.1 |
| react-chartjs-2 | React wrapper for Chart.js | 5.3.1 |
| lucide-react | Icon library | 1.7.0 |
| ESLint | Code linting | 9.39.4 |
| Vanilla CSS | Global design system with CSS custom properties | — |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| Python | Server-side scripting language | 3.10+ |
| Flask | Micro web framework | 3.0.3 |
| flask-cors | CORS middleware | 4.0.1 |
| scikit-learn | ML algorithms and utilities | ≥1.4.2 |
| pandas | Dataset loading and manipulation | ≥2.2.3 |
| NumPy | Array operations | ≥2.0.0 |
| mlxtend | Apriori algorithm and association rules | ≥0.23.1 |

### Machine Learning Algorithms

| Algorithm | Type | Configuration |
|-----------|------|---------------|
| Logistic Regression | Supervised Classification | max_iter=1000, C=1.0 |
| Decision Tree Classifier | Supervised Classification | max_depth=10, criterion='gini' |
| Support Vector Machine (SVC) | Supervised Classification | kernel='rbf', C=1.0, probability=True |
| Gaussian Naive Bayes | Supervised Classification | Default parameters |
| K-Nearest Neighbors | Supervised Classification | n_neighbors=5, metric='minkowski' |
| K-Means | Unsupervised Clustering | n_clusters=3, random_state=42 |
| Agglomerative Hierarchical | Unsupervised Clustering | linkage='ward' |
| DBSCAN | Density-Based Clustering | eps=1.5, min_samples=5 |
| Apriori | Association Rule Mining | mlxtend implementation |
| PCA | Dimensionality Reduction | n_components=2 |

---

## 📁 Folder Structure

```
AYURINSIGHT/                              ← Project root
├── .git/                                 ← Git repository metadata
├── .venv/                                ← Root-level Python virtual environment
├── README.md                             ← This file
├── ayurvedic_dosha_dataset (1).csv       ← Raw dataset backup (root copy)
│
├── backend/                              ← Flask REST API server
│   ├── app.py                            ← App factory: CORS, Blueprint registration, daemon thread
│   ├── requirements.txt                  ← Python dependencies (6 packages)
│   ├── venv/                             ← Backend virtual environment (active)
│   │
│   ├── data/                             ← Dataset directory
│   │   └── ayurvedic_dosha_dataset.csv   ← Primary dataset (5,000 records, 26 columns, ~1.2 MB)
│   │
│   ├── routes/                           ← Flask Blueprint modules
│   │   ├── __init__.py
│   │   ├── overview.py                   ← GET /api/overview
│   │   ├── supervised.py                 ← POST /api/supervised
│   │   ├── clustering.py                 ← POST /api/clustering
│   │   ├── association.py                ← POST /api/association
│   │   └── predict.py                    ← GET/POST /api/predict/*
│   │
│   └── utils/                            ← Shared utility modules
│       ├── __init__.py
│       ├── data_loader.py                ← Singleton CSV loader with module-level cache
│       └── preprocessing.py              ← encode_features(), scale_features(), apply_pca()
│
└── frontend/                             ← React + Vite SPA
    ├── index.html                        ← HTML shell with root div
    ├── package.json                      ← npm manifest
    ├── vite.config.js                    ← Vite build configuration
    ├── eslint.config.js                  ← ESLint flat config
    ├── .gitignore
    ├── public/                           ← Static assets
    │
    └── src/
        ├── main.jsx                      ← ReactDOM.createRoot entry point
        ├── App.jsx                       ← Root: Router, Navbar, Routes, Floating Help button
        ├── App.css
        ├── index.css                     ← Global CSS design system (variables, card, badge, spinner)
        │
        ├── api/
        │   └── axiosClient.js            ← Axios: baseURL, 120s timeout, JSON headers
        │
        ├── assets/                       ← Images and SVG assets
        │
        ├── components/                   ← Reusable UI components
        │   ├── Navbar.jsx                ← Top navigation bar
        │   ├── StatCard.jsx              ← KPI metric card (icon + title + value)
        │   ├── ChartCard.jsx             ← Card wrapper with info button for charts
        │   ├── DoshaResultCard.jsx       ← Prediction result (banner, confidence, tabs, chart)
        │   ├── ClusterScatter.jsx        ← PCA scatter plot component
        │   ├── ConfusionMatrix.jsx       ← Confusion matrix grid renderer
        │   ├── ModelResultTable.jsx      ← Classification report table per model
        │   ├── RulesTable.jsx            ← Association rules sortable table
        │   ├── InfoButton.jsx            ← Info icon with tooltip pop-up
        │   └── Tooltip.jsx               ← Inline educational tooltip
        │
        └── pages/                        ← Route-level page components
            ├── Dashboard.jsx             ← / → dataset overview, distribution charts
            ├── Predict.jsx               ← /predict → 25-field form + animated result
            ├── Supervised.jsx            ← /supervised → 5-model benchmark
            ├── Clustering.jsx            ← /clustering → K-Means, Hierarchical, DBSCAN
            ├── Association.jsx           ← /association → Apriori rule mining
            └── Help.jsx                  ← /help → full documentation page
```

---

## 🚀 Installation Guide

### Prerequisites

| Requirement | Minimum Version | Download |
|-------------|-----------------|----------|
| Python | 3.10+ | [python.org](https://www.python.org/downloads/) |
| Node.js | 18+ LTS | [nodejs.org](https://nodejs.org/) |
| npm | 9+ | Bundled with Node.js |
| Git | 2.x | [git-scm.com](https://git-scm.com/) |

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/AyurInsight.git
cd AyurInsight
```

### Step 2 — Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3 — Frontend Setup

```bash
cd frontend
npm install
```

### Step 4 — Dataset Verification

Ensure the dataset exists at:

```
backend/data/ayurvedic_dosha_dataset.csv
```

> The file is referenced by a path relative to `utils/data_loader.py`. Do **not** rename or move it without updating `data_loader.py`.

### Step 5 — Run the Backend

```bash
# From backend/ with venv activated
python app.py
```

Expected startup output:
```
Starting to initialize model for predict in background...
 * Running on http://127.0.0.1:5000
 * Debug mode: on
Initializing models for predictions. This will run ONCE on startup...
Models initialized. Best Model: Decision Tree (CV Score: 0.9415)
```

> **Note:** ML model initialization runs on a daemon thread. The `/predict` endpoint returns a `500` error with `"Models not initialized"` until training completes (~30–90 seconds depending on hardware). All other endpoints (`/overview`, `/supervised`, `/clustering`, `/association`) are available immediately.

### Step 6 — Run the Frontend

```bash
# From frontend/
npm run dev
```

Expected output:
```
  VITE v8.x.x  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

### Step 7 — Open the Application

Navigate to **http://localhost:5173** in your browser.

---

## 🔐 Environment Variables

AyurInsight is a local-first educational tool. No environment variables are required for development. The following are recommended for production deployment.

### Backend — `backend/.env`

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_APP=app.py
PORT=5000

# CORS — set to your frontend's production URL in deployment
CORS_ORIGIN=http://localhost:5173

# Dataset path override (optional — auto-resolved relative to utils/ by default)
DATASET_PATH=./data/ayurvedic_dosha_dataset.csv

# Secret key (required for session management in planned auth features)
# Generate with: python -c "import secrets; print(secrets.token_hex(32))"
SECRET_KEY=your_super_secret_key_here
```

### Frontend — `frontend/.env`

```env
# Backend API base URL — change for production deployment
VITE_API_BASE_URL=http://localhost:5000/api

# Axios timeout in milliseconds (120s needed for slow ML computations)
VITE_API_TIMEOUT=120000

VITE_APP_NAME=AyurInsight
VITE_APP_VERSION=1.0.0
```

### Variable Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FLASK_ENV` | Flask run environment | `development` | Recommended |
| `FLASK_DEBUG` | Enable Flask debugger | `True` | Dev only |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` | Production |
| `SECRET_KEY` | Flask session secret | None | Production |
| `VITE_API_BASE_URL` | Frontend API base URL | `http://localhost:5000/api` | Production |
| `VITE_API_TIMEOUT` | Axios timeout (ms) | `120000` | Optional |

---

## 📡 API Documentation

All endpoints are mounted under `/api`. Backend runs on `http://localhost:5000` in development.

### Overview

| Method | Endpoint | Description | Auth | Request Body | Response Keys |
|--------|----------|-------------|------|--------------|---------------|
| `GET` | `/api/overview` | Dataset stats, Dosha distribution, feature categories | No | None | `total_records`, `total_features`, `dosha_distribution`, `feature_categories` |

**Sample Response:**
```json
{
  "total_records": 5000,
  "total_features": 25,
  "dosha_distribution": { "Kapha": 2205, "Pitta": 1835, "Vata": 960 },
  "feature_categories": {
    "physical": ["Body Frame", "Type of Hair", "..."],
    "psychological": ["Pace of Performing Work", "..."],
    "physiological": ["Body Temperature", "..."]
  }
}
```

### Supervised Learning

| Method | Endpoint | Description | Auth | Request Body | Response Keys |
|--------|----------|-------------|------|--------------|---------------|
| `POST` | `/api/supervised` | Train & evaluate 5 ML models | No | `{ test_size, random_state }` | `models[]` with accuracy, cv_score, confusion_matrix, classification_report |

**Request:**
```json
{ "test_size": 0.2, "random_state": 42 }
```

### Clustering

| Method | Endpoint | Description | Auth | Request Body | Response Keys |
|--------|----------|-------------|------|--------------|---------------|
| `POST` | `/api/clustering` | K-Means + Hierarchical + DBSCAN with PCA | No | `{ n_clusters, eps, min_samples }` | `kmeans`, `hierarchical`, `dbscan` |

**Request:**
```json
{ "n_clusters": 3, "eps": 1.5, "min_samples": 5 }
```

### Association Rule Mining

| Method | Endpoint | Description | Auth | Request Body | Response Keys |
|--------|----------|-------------|------|--------------|---------------|
| `POST` | `/api/association` | Apriori frequent itemsets + rules | No | `{ min_support, min_confidence, min_lift }` | `total_itemsets`, `total_rules`, `rules[]` |

**Request:**
```json
{ "min_support": 0.15, "min_confidence": 0.60, "min_lift": 1.2 }
```

### Prediction

| Method | Endpoint | Description | Auth | Request Body | Response Keys |
|--------|----------|-------------|------|--------------|---------------|
| `GET` | `/api/predict/options` | All valid dropdown values for 25 features | No | None | `options: { "Body Frame": [...], ... }` |
| `GET` | `/api/predict/info` | Best model name + CV accuracy | No | None | `best_model`, `best_model_accuracy` |
| `POST` | `/api/predict` | Predict Dosha from 25 feature inputs | No | `{ features: { ... } }` | `predicted_dosha`, `confidence`, `model_used`, `model_accuracy`, `feature_importance` |

**Sample Predict Response:**
```json
{
  "predicted_dosha": "Pitta",
  "confidence": { "Kapha": 0.08, "Pitta": 0.79, "Vata": 0.13 },
  "model_used": "Decision Tree",
  "model_accuracy": 0.9415,
  "feature_importance": [
    { "feature": "Body Temperature", "importance": 0.142 },
    { "feature": "Skin", "importance": 0.118 }
  ]
}
```

**Error Response (missing feature):**
```json
{ "error": "Missing value for feature: Body Frame" }
```

---

## 🗄️ Database Design

AyurInsight uses a structured CSV file as its data source, loaded into an in-memory pandas DataFrame at startup.

### Dataset: `ayurvedic_dosha_dataset.csv`

| Property | Value |
|----------|-------|
| File Size | ~1.2 MB |
| Total Records | 5,000 rows |
| Total Columns | 26 (25 features + 1 target) |
| Data Types | All categorical (string/object) |
| Target Column | `Dosha` (Vata / Pitta / Kapha) |
| Missing Values | None |
| Encoding | UTF-8 |

### Physical Features (8 columns)

| Column | Example Values |
|--------|----------------|
| `Body Frame` | Thin, Medium, Heavy |
| `Type of Hair` | Dry/Rough, Straight/Oily, Wavy/Thick |
| `Color of Hair` | Dark Brown/Black, Brown |
| `Skin` | Dry/Rough/Cracked, Oily/Smooth, Soft/White |
| `Complexion` | Dark, Medium, Fair |
| `Body Weight` | Low, Moderate, Heavy |
| `Nails` | Dry/Rough/Brittle, Soft/Pink/Lustrous, Thick/Oily/Smooth |
| `Size and Color of the Teeth` | Small/Crooked, Medium/Sharp/Yellowish, Strong/White |

### Psychological Features (9 columns)

| Column | Example Values |
|--------|----------------|
| `Pace of Performing Work` | Fast, Moderate, Slow and Steady |
| `Mental Activity` | Restless, Sharp/Focused, Calm/Slow |
| `Memory` | Quick but Forgets, Sharp/Good, Slow but Sustained |
| `Sleep Pattern` | Irregular/Less, Moderate/Sound, Heavy/Prolonged |
| `Weather Conditions` | Dislikes Cold, Dislikes Heat, Dislikes Damp/Cold |
| `Reaction under Adverse Situations` | Anxious/Fearful, Aggressive/Irritable, Calm/Slow |
| `Mood` | Variable/Enthusiastic, Intense/Purposeful, Steady/Calm |
| `Eating Habit` | Irregular, Regular/Intense, Slow/Steady |
| `Hunger` | Irregular, Sharp/Insatiable, Moderate/Regular |

### Physiological Features (8 columns)

| Column | Example Values |
|--------|----------------|
| `Body Temperature` | Cold Hands/Feet, Warm/Excellent, Cool/Moderate |
| `Joints` | Cracking, Flexible/Loose, Well-Formed/Large |
| `Nature` | Imaginative/Impulsive, Leader/Sharp-Witted, Tolerant/Forgiving |
| `Body Energy` | Variable/Low, Intense/Goal-Oriented, Steady/Good |
| `Quality of Voice` | Fast/Unclear, Sharp/Loud, Melodious/Deep |
| `Dreams` | Flying/Running/Fearful, Violent/Passionate, Romantic/Few |
| `Social Relations` | Many Acquaintances/Short Term, Loyal/Loving, Deep Attachment |
| `Body Odor` | Slight, Sharp/Strong, Pleasant |

### Target Column

| Column | Values | Distribution |
|--------|--------|--------------|
| `Dosha` | Vata, Pitta, Kapha | Kapha: ~44%, Pitta: ~37%, Vata: ~19% |

### In-Memory Processing Pipeline

```
CSV Read (once, _cached_df)
    ↓
LabelEncoder per column  →  Supervised & Predict routes
    ↓
StandardScaler + PCA     →  Clustering route
    ↓
pd.get_dummies + bool    →  Association route (Apriori)
```

---

## 🔑 Authentication Flow

AyurInsight v1.0 is a public-access educational platform — **no authentication is required** for any endpoint. The following documents the planned v2.0 authentication architecture.

### Planned JWT Authentication Flow

#### Registration
1. User submits email, username, and password.
2. Backend validates input, checks for duplicate email.
3. Password hashed via **bcrypt** (salt rounds = 12).
4. User record created with default role `user`.
5. `201 Created` returned.

#### Login & Token Issuance
1. User submits email + password.
2. Backend retrieves user, verifies bcrypt hash.
3. Issues **JWT Access Token** (15-min expiry) + **Refresh Token** (7-day expiry, HTTP-only cookie).

#### Token Refresh Flow
```
Protected Request → 401 Expired
    → Frontend calls POST /api/auth/refresh
    → Refresh token validated
    → New access token issued
```

#### Password Hashing
```python
import bcrypt
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=12))
```

#### Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| `user` | Submit predictions, view results |
| `researcher` | Access raw model metrics, export results |
| `admin` | Manage users, upload datasets, view audit logs |

---

## 🔒 Security Features

### Currently Implemented

| Security Measure | Implementation |
|-----------------|----------------|
| **CORS Restriction** | `flask-cors` allows only `http://localhost:5173` |
| **Input Validation** | `/api/predict` validates all 25 features against LabelEncoder classes |
| **Structured Error Responses** | All routes return JSON errors with HTTP 400/500 codes |
| **No Secrets in Source Code** | No credentials, API keys, or secrets committed to the repository |
| **Request Timeout** | Axios enforces 120-second timeout to prevent hanging connections |
| **Virtual Environment Isolation** | Python dependencies isolated in `venv/` |

### Planned Security Enhancements (v2.0)

| Measure | Library | Description |
|---------|---------|-------------|
| **JWT Authentication** | `flask-jwt-extended` | Signed access tokens (HS256, 15-min expiry) |
| **Password Hashing** | `bcrypt` (rounds=12) | Adaptive hashing resistant to brute-force |
| **Rate Limiting** | `Flask-Limiter` + Redis | 10 requests/minute per IP on prediction endpoints |
| **Security Headers** | `Flask-Talisman` | X-Frame-Options, X-Content-Type-Options, HSTS, CSP |
| **XSS Protection** | React JSX (default) | React escapes all user-rendered output by default |
| **SQL Injection Prevention** | SQLAlchemy ORM | Parameterized queries for any future relational store |
| **CSRF Protection** | `flask-wtf` | Double-submit cookie pattern for state-changing forms |
| **Environment Variables** | `python-dotenv` | All secrets loaded from `.env`, never hardcoded |
| **Secure Cookies** | `httponly=True; Secure; SameSite=Strict` | Refresh tokens in HTTP-only cookies |
| **HTTPS** | Nginx + Let's Encrypt | TLS 1.2+ with automatic certificate renewal |

---

## 🔄 Project Workflow

Complete request lifecycle from user interaction to rendered response:

```
STEP 1 — STARTUP
Flask starts → Blueprints registered → Daemon thread spawned
→ init_models() trains 5 classifiers on 5,000 records
→ CSV loaded once into _cached_df (globally cached)

STEP 2 — USER OPENS BROWSER
http://localhost:5173 → React SPA served
Dashboard mounts → GET /api/overview
← JSON: total_records, dosha_distribution, feature_categories
Doughnut + Bar charts rendered

STEP 3 — USER NAVIGATES TO /predict
Two parallel GETs:
  GET /api/predict/options → 25 dropdown values
  GET /api/predict/info   → best model + accuracy
Form renders 25 grouped dropdowns

STEP 4 — USER SUBMITS FORM
handleSubmit() → validates all 25 fields
POST /api/predict { features: { "Body Frame": "Thin", ... } }
→ each value encoded via persisted LabelEncoder
→ TRAINED_MODELS[BEST_MODEL_NAME].predict(X_input)
→ predict_proba() → confidence for Vata / Pitta / Kapha
→ feature_importance extracted (Decision Tree / Logistic Regression)
← JSON: predicted_dosha, confidence, model_used, feature_importance

STEP 5 — RESULT RENDERED
DoshaResultCard mounts with fadeSlideUp animation
→ Dosha banner (Vata=purple / Pitta=orange / Kapha=blue)
→ Animated confidence progress bars (0.8s CSS transition)
→ Tabbed panel: Description / Diet / Lifestyle
→ Feature Importance Bar Chart (top 10, if available)
→ Try Again resets form and scrolls to top
```

---

## 📸 Screenshots

> Run both servers locally and take screenshots to replace placeholders.

| Page | Description |
|------|-------------|
| **Dashboard** | `screenshots/dashboard.png` — Dosha distribution doughnut, feature category bar chart, StatCards |
| **Predict Form** | `screenshots/predict_form.png` — 25-field grouped dropdown form |
| **Dosha Result** | `screenshots/predict_result.png` — Result card with animated confidence bars and feature importance |
| **Supervised Learning** | `screenshots/supervised.png` — 5-model benchmark comparison table |
| **Confusion Matrix** | `screenshots/confusion_matrix.png` — 3×3 confusion matrix per model |
| **K-Means Clustering** | `screenshots/clustering_kmeans.png` — PCA scatter plot and elbow curve |
| **DBSCAN Clustering** | `screenshots/clustering_dbscan.png` — DBSCAN density scatter plot |
| **Association Rules** | `screenshots/association.png` — Apriori rules table with support/confidence/lift |
| **Help Page** | `screenshots/help.png` — Full algorithm documentation |

> **To add screenshots:** Run both servers → Take screenshots → Save to `screenshots/` folder → Update paths in the table above.

---

## 🚢 Deployment Guide

### Option 1 — Render (Backend) + Vercel (Frontend)

**Backend on Render:**
1. Create a new **Web Service** at [render.com](https://render.com).
2. Connect your GitHub repository.
3. Set **Root Directory** → `backend`, **Build Command** → `pip install -r requirements.txt`.
4. Set **Start Command** → `gunicorn app:app --bind 0.0.0.0:$PORT --timeout 300`.
5. Add env vars: `FLASK_ENV=production`, `CORS_ORIGIN=https://your-frontend.vercel.app`.

**Frontend on Vercel:**
1. Set `VITE_API_BASE_URL=https://your-backend.onrender.com/api` in `.env.production`.
2. Build: `npm run build` inside `frontend/`.
3. Deploy: `vercel --prod` (or connect via Vercel dashboard, set framework to Vite).

### Option 2 — Railway (Backend)

1. Connect repo to [railway.app](https://railway.app).
2. Add `backend/Procfile`:
   ```
   web: gunicorn app:app --bind 0.0.0.0:$PORT --timeout 300
   ```
3. Set environment variables in the Railway dashboard.

### Option 3 — Docker Compose

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY . .
EXPOSE 5000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--timeout", "300", "--workers", "2"]
```

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["5000:5000"]
    environment:
      - FLASK_ENV=production
      - CORS_ORIGIN=http://localhost
    volumes:
      - ./backend/data:/app/data
  frontend:
    build:
      context: ./frontend
      args:
        VITE_API_BASE_URL: http://localhost:5000/api
    ports: ["80:80"]
    depends_on: [backend]
```

```bash
docker-compose up --build
```

### Option 4 — AWS EC2

1. Launch Ubuntu 22.04 EC2 (t3.small recommended for ML workloads).
2. Install Python 3.10+, Node.js 18+, Nginx, Certbot.
3. Create a `systemd` service for Gunicorn:
   ```ini
   [Unit]
   Description=AyurInsight Flask API
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/home/ubuntu/AyurInsight/backend
   ExecStart=/home/ubuntu/AyurInsight/backend/venv/bin/gunicorn app:app --bind 127.0.0.1:5000 --timeout 300
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
4. Configure Nginx as a reverse proxy with SSL (Let's Encrypt).
5. Build React frontend (`npm run build`) and serve `dist/` via Nginx.

---

## ⚡ Performance Optimizations

### In-Memory Dataset Caching

```python
# utils/data_loader.py
_cached_df = None

def load_data():
    global _cached_df
    if _cached_df is None:
        _cached_df = pd.read_csv(file_path)  # Loaded ONCE
    return _cached_df
```

Eliminates repeated disk I/O — per-request data loading overhead reduced from ~200ms to ~0ms.

### Background Model Initialization

```python
init_thread = threading.Thread(target=init_models)
init_thread.daemon = True
init_thread.start()
```

All five classifiers are trained on a daemon thread at startup, leaving Flask immediately available for all non-predict endpoints.

### PCA Point Sampling

```python
kmeans_sample = df_pca.sample(min(500, len(df_pca)), random_state=42)
```

Scatter plot payloads capped at 500 points — reduces JSON response size by 90% and eliminates frontend chart rendering bottlenecks.

### Axios Timeout Guard

```javascript
const axiosClient = axios.create({ timeout: 120000 });
```

Prevents indefinitely hanging requests for computationally expensive endpoints (SVM training, Apriori mining).

### Chart.js `maintainAspectRatio: false`

All charts use fixed parent container heights with `maintainAspectRatio: false`, preventing layout reflows during data updates.

### Planned Optimizations

| Optimization | Description |
|--------------|-------------|
| **Lazy Loading** | `React.lazy()` + `Suspense` for per-page code splitting |
| **Pagination** | `limit`/`offset` params for association rules endpoint |
| **Gzip Compression** | Nginx `gzip on; gzip_types application/json;` reduces JSON by ~65% |
| **Database Indexing** | Indexes on `user_id`, `prediction_date`, `predicted_dosha` when migrating to PostgreSQL |
| **Image Optimization** | Vite asset pipeline with content-hash filenames for long-term browser caching |

---

## 🧪 Testing

### Unit Testing (Backend)

```bash
pip install pytest pytest-flask
pytest tests/ -v
pytest tests/ --cov=routes --cov=utils --cov-report=html
```

**Key test scenarios:**
- `data_loader.py`: CSV loaded exactly once (singleton cache verified).
- `preprocessing.py`: `encode_features()` returns correct shape and encoder count.
- `GET /api/overview`: Returns `total_records=5000`, `total_features=25`, 3 Dosha classes.
- `POST /api/predict` (valid): Returns `predicted_dosha` in `['Vata', 'Pitta', 'Kapha']`.
- `POST /api/predict` (missing feature): Returns HTTP `400` with `error` key.

**Example unit test:**
```python
# tests/test_overview.py
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_overview_returns_correct_keys(client):
    response = client.get('/api/overview')
    assert response.status_code == 200
    data = response.get_json()
    assert 'total_records' in data
    assert 'dosha_distribution' in data
    assert data['total_features'] == 25

def test_dosha_distribution_has_three_classes(client):
    response = client.get('/api/overview')
    data = response.get_json()
    assert len(data['dosha_distribution']) == 3
    assert 'Kapha' in data['dosha_distribution']
```

### Integration Testing

```bash
pytest tests/test_integration.py -v
```

**Key integration scenarios:**
- `POST /api/supervised`: All 5 models return accuracy between 0 and 1.
- `POST /api/clustering`: Returns `silhouette_score` for K-Means and Hierarchical.
- `POST /api/association` with `min_support=0.3`: Returns `total_rules >= 0`.
- `POST /api/predict` (all 25 fields): Returns valid Dosha prediction after model init.

### API Testing (cURL)

```bash
# Test Overview
curl -X GET http://localhost:5000/api/overview

# Test Supervised Learning
curl -X POST http://localhost:5000/api/supervised \
  -H "Content-Type: application/json" \
  -d '{"test_size": 0.2, "random_state": 42}'

# Test Clustering
curl -X POST http://localhost:5000/api/clustering \
  -H "Content-Type: application/json" \
  -d '{"n_clusters": 3, "eps": 1.5, "min_samples": 5}'

# Test Association Rules
curl -X POST http://localhost:5000/api/association \
  -H "Content-Type: application/json" \
  -d '{"min_support": 0.15, "min_confidence": 0.60, "min_lift": 1.2}'
```

### Manual Testing Checklist

- [ ] Dashboard loads with correct record count, feature count, and distribution chart.
- [ ] Predict form displays all 25 dropdowns populated from the dataset.
- [ ] Submitting with empty fields highlights all unfilled dropdowns in red.
- [ ] Prediction result renders with correct Dosha color scheme.
- [ ] Confidence bars animate from 0% to correct width in 0.8s.
- [ ] "Try Again" resets form and scrolls to top.
- [ ] Supervised page shows results for all five models.
- [ ] Confusion matrices render a correct 3×3 grid (Kapha/Pitta/Vata).
- [ ] Clustering page renders PCA scatter plot with distinct cluster colors.
- [ ] Elbow curve shows K=2 to K=8 inertia values.
- [ ] Association rules table renders with sortable columns.
- [ ] All pages handle API errors gracefully without crashing.
- [ ] Floating Help button visible and functional on all pages.

---

## 🚀 Future Enhancements

1. **User Authentication & Profiles** — JWT-based registration/login so users can save Dosha history and track health trends over time.
2. **Persistent Results Database** — Integrate PostgreSQL or MongoDB to store prediction history with timestamps and feature inputs.
3. **Dual Dosha Sub-Type Classification** — Extend to Vata-Pitta, Pitta-Kapha, Kapha-Vata for more nuanced Ayurvedic profiling.
4. **Deep Learning Model Integration** — Add a PyTorch or TensorFlow MLP as a sixth classifier to benchmark neural networks against classical ML.
5. **Model Export & Download** — Allow users to download trained models as `.pkl` files via `/api/export/model`.
6. **Hyperparameter Tuning Interface** — `GridSearchCV` / `RandomizedSearchCV` endpoint with configurable parameter grids per algorithm.
7. **Real-Time Training Progress** — Server-Sent Events (SSE) to stream training progress to the frontend for long-running computations.
8. **SHAP Explainability** — Integrate `shap` for per-prediction feature contribution breakdowns beyond tree-based importance.
9. **PDF / CSV Report Export** — Export Dosha prediction reports, model comparison tables, and association rules as downloadable files.
10. **Multilingual Support (i18n)** — Add Hindi and regional Indian language support for accessibility to non-English-speaking practitioners.
11. **Progressive Web App (PWA)** — Offline support, push notifications, and a mobile-optimized responsive layout.
12. **Custom Dataset Upload** — Admin panel for researchers to upload their own CSV datasets and run the full analytics pipeline.
13. **Comparative Dosha Radar Chart** — Radar chart comparing a user's Dosha profile against dataset archetypes.
14. **Automated CI/CD Pipeline** — GitHub Actions for linting, pytest, Docker build, and auto-deploy to Render + Vercel on merge to `main`.
15. **Admin Analytics Dashboard** — Protected panel showing platform usage, total predictions, model accuracy trends, and popular feature combinations.
16. **Public REST API with API Keys** — Documented public API for third-party application integration.
17. **Ayurvedic Recommendation Engine** — Content-based recommendations for herbs, yoga poses, and meditation based on predicted Dosha type.

---

## 🧗 Challenges Faced

**1. Background Thread Synchronization** — Training five classifiers at startup takes 30–90 seconds. Requests to `/api/predict` before completion required a global flag and a user-friendly `"Models not initialized"` 500 response.

**2. SVM Probability Calibration Overhead** — Enabling `probability=True` on `SVC` triggers internal Platt Scaling (cross-validation), significantly increasing training time — a necessary trade-off for `predict_proba()` confidence scores.

**3. Pandas 2.x / mlxtend Compatibility** — `apriori()` requires a boolean DataFrame in pandas 2.x. Required adding an explicit `.astype(bool)` cast after `pd.get_dummies()` to avoid a `ValueError`.

**4. Class Imbalance** — Vata comprising only ~19% of records caused lower recall for Vata predictions. Documented in the dashboard and Help page rather than applying silent oversampling that could mislead users.

**5. PCA Coordinate Scaling** — Raw PCA coordinates had wildly varying scales, causing misaligned Chart.js scatter plots. Applying `StandardScaler` before PCA produced normalized, visually meaningful distributions.

**6. CORS Pre-Flight for POST Endpoints** — Browser pre-flight `OPTIONS` requests required `flask-cors` to be configured at the resource level (`r"/api/*"`) rather than globally.

**7. React 19 Peer Dependencies** — Several libraries had not updated for React 19's lifecycle changes. Required pinning specific compatible versions of `react-chartjs-2` and `lucide-react`.

**8. Infinity Values in Association Rule Conviction** — `conviction` returns `+Infinity` when consequent confidence is 1.0, which breaks JSON serialization. Required an explicit null-coalescing check before serializing conviction values.

---

## 📚 Learning Outcomes

| Domain | Skills Acquired |
|--------|----------------|
| **Machine Learning** | Implement and compare five classifiers; understand cross-validation, confusion matrices, classification reports, and feature importance |
| **Unsupervised Learning** | Apply K-Means, Hierarchical, and DBSCAN clustering; interpret silhouette scores and elbow curves; reduce dimensions with PCA |
| **Association Rule Mining** | Use the Apriori algorithm; interpret antecedents/consequents for domain insights |
| **Flask API Development** | Design modular Blueprint-based REST APIs; handle CORS; implement background threading |
| **React Development** | Build functional components with hooks; implement client-side routing; manage form state and validation |
| **Data Visualization** | Render Doughnut, Bar, and Scatter charts with `react-chartjs-2`; design animated progress bars |
| **Data Engineering** | Load, cache, encode, and scale tabular CSV data using pandas, scikit-learn, and NumPy |
| **Full-Stack Integration** | Connect Python backend to JavaScript frontend via Axios; handle async loading states and error boundaries |
| **Software Architecture** | Apply separation of concerns through Blueprint modularization; implement singleton cache patterns |

---

## 📄 Resume Highlights

ATS-optimized bullet points derived directly from AyurInsight's architecture:

- **Designed and deployed a full-stack machine learning web application** using Flask (Python) and React 19 (JavaScript), enabling real-time Ayurvedic Dosha prediction from 25 categorical health attributes across a 5,000-record dataset.

- **Implemented an automated model selection pipeline** using 5-fold cross-validation across Logistic Regression, Decision Tree, SVM, Naive Bayes, and KNN, achieving classification accuracy of 90%+ on a multi-class categorical health dataset.

- **Built a multi-algorithm unsupervised learning module** integrating K-Means, Agglomerative Hierarchical Clustering, and DBSCAN with PCA-based 2D visualization, enabling silhouette scoring and elbow curve analysis.

- **Engineered an Association Rule Mining pipeline** using the Apriori algorithm (mlxtend), extracting top-100 rules by lift with configurable support, confidence, and lift thresholds from one-hot encoded Ayurvedic symptom data.

- **Architected a modular Flask REST API** with five registered Blueprints, background daemon threading for non-blocking model initialization, and an in-memory dataset caching mechanism eliminating per-request disk I/O overhead.

- **Developed an interactive React SPA** with 6-route client-side navigation, animated CSS confidence progress bars, tabbed result panels, educational tooltips, and Chart.js visualizations (Doughnut, Bar, Scatter).

- **Applied production data preprocessing techniques** including LabelEncoder for categorical encoding, StandardScaler for normalization, and PCA for dimensionality reduction — maintaining consistent encoder state between training and inference.

- **Configured a scoped CORS policy** using `flask-cors` restricted to a single trusted origin and implemented structured JSON error handling with HTTP 400/500 responses across all API routes.

- **Optimized chart rendering performance** by capping PCA scatter plot payloads at 500 sampled points, reducing JSON response size by 90% and eliminating frontend chart rendering bottlenecks.

- **Documented the complete ML data pipeline** in an interactive Help page covering algorithm theory, dataset characteristics, class imbalance effects, and interpretation guidance — enabling independent use by non-technical practitioners.

---

## 📊 GitHub Statistics

| Metric | Value |
|--------|-------|
| **Project Type** | Full-Stack Web App + Machine Learning |
| **Total Source Files** | ~40 files (excluding node_modules, venv, pycache) |
| **Estimated Lines of Code** | ~3,000–3,500 (Python: ~800 · JSX: ~2,200+ · CSS: ~200+) |
| **Estimated Development Time** | 6–8 weeks (academic semester project) |
| **Backend Blueprint Modules** | 5 + 2 Utilities + 1 App Factory |
| **Frontend Pages** | 6 route-level page components |
| **Reusable UI Components** | 10 React components |
| **ML Algorithms Implemented** | 10 (5 Supervised + 3 Clustering + 1 Association + 1 Dimensionality Reduction) |
| **REST API Endpoints** | 7 (3 GET + 4 POST) |
| **Dataset** | 5,000 records × 26 columns (~1.2 MB CSV) |
| **Input Features** | 25 categorical features |
| **Target Classes** | 3 (Vata, Pitta, Kapha) |
| **Python Dependencies** | 6 packages |
| **JavaScript Dependencies** | 7 production + 8 development |

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/AyurInsight.git
cd AyurInsight

# 2. Create a descriptive branch
git checkout -b feature/add-random-forest-model
# or
git checkout -b fix/prediction-encoding-error

# 3. Make changes, commit using Conventional Commits
git commit -m "feat: add Random Forest classifier to supervised pipeline"

# 4. Push and open a Pull Request
git push origin feature/add-random-forest-model
```

### Contribution Guidelines

- **Code Style**: PEP 8 for Python; existing JSX formatting conventions for React.
- **Tests**: Add or update `pytest` tests for any backend changes.
- **Documentation**: Update the Help page and this README for any user-facing changes.
- **Commit Format**: Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
- **Issue First**: For significant changes, open an issue before starting development.
- **No Breaking Changes**: Maintain existing API contracts unless a major version bump is warranted.

### Good First Issues

- Add Random Forest to the supervised learning pipeline.
- Write unit tests for `routes/clustering.py`.
- Implement CSV export for the Association Rules table.
- Add a dark/light mode toggle to the Navbar.
- Create a `Procfile` for Heroku deployment.

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Mrunali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👩‍💻 Author

<div align="center">

**Mrunali**
*Computer Science Student — Semester 6*

[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:your-email@example.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/your-username)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF7139?style=flat-square&logo=firefox&logoColor=white)](https://your-portfolio.com)

*Passionate about applying machine learning to healthcare and wellness domains — building bridges between ancient wisdom and modern data science.*

</div>

---

## 🙏 Acknowledgements

### Open Source Libraries & Frameworks

| Resource | Contribution |
|----------|-------------|
| [Flask](https://flask.palletsprojects.com/) | Lightweight Python web micro-framework powering the REST API |
| [flask-cors](https://flask-cors.readthedocs.io/) | CORS policy management |
| [scikit-learn](https://scikit-learn.org/) | ML toolkit: classification, clustering, preprocessing, metrics |
| [mlxtend](http://rasbt.github.io/mlxtend/) | Apriori algorithm and association rule mining |
| [pandas](https://pandas.pydata.org/) | DataFrame-based data manipulation and analysis |
| [NumPy](https://numpy.org/) | Numerical array operations |
| [React](https://react.dev/) | Component-based JavaScript UI library |
| [Vite](https://vitejs.dev/) | Next-generation frontend tooling with fast HMR |
| [react-router-dom](https://reactrouter.com/) | Declarative client-side routing |
| [Axios](https://axios-http.com/) | Promise-based HTTP client |
| [Chart.js](https://www.chartjs.org/) | Canvas-based chart library |
| [react-chartjs-2](https://react-chartjs-2.js.org/) | React wrapper for Chart.js |
| [lucide-react](https://lucide.dev/) | Open-source icon library |

### Academic References

- Lad, V. (1984). *Ayurveda: The Science of Self-Healing*. Lotus Press.
- Han, J., Kamber, M., & Pei, J. (2011). *Data Mining: Concepts and Techniques* (3rd ed.). Morgan Kaufmann.
- Pedregosa, F. et al. (2011). *Scikit-learn: Machine Learning in Python*. JMLR 12, pp. 2825–2830.

### Special Thanks

- The open-source community behind Python, Node.js, and the browser ecosystem.
- Ayurvedic scholars and practitioners whose documented knowledge systems made this dataset possible.
- Academic advisors and reviewers who guided the analytical design of the platform.

---

<div align="center">

⭐ **If AyurInsight helped you, please give it a star on GitHub!** ⭐

*Built with 💚 for the intersection of ancient wisdom and modern data science.*

</div>
