
from .model import train_model, load_model
import numpy as np

def detect_anomalies(df, X):
    model = load_model()

    # Train model if not exists
    if model is None:
        model = train_model(X)

    # =========================
    # 1. Get anomaly scores
    # =========================
    scores = model.decision_function(X)

    # Convert (higher = more anomalous)
    df['Score'] = -scores

    # =========================
    # 2. Normalize scores (0–1)
    # =========================
    min_s = df['Score'].min()
    max_s = df['Score'].max()

    if max_s - min_s != 0:
        df['Score'] = (df['Score'] - min_s) / (max_s - min_s)
    else:
        df['Score'] = 0  # fallback

    # =========================
    # 3. Predict anomalies
    # =========================
    df['Anomaly'] = model.predict(X)
    df['Anomaly'] = df['Anomaly'].map({1: 0, -1: 1})

    # =========================
    # 4. Risk level (optional 🔥)
    # =========================
    def risk_level(score):
        if score > 0.8:
            return "High Risk"
        elif score > 0.5:
            return "Medium Risk"
        else:
            return "Low Risk"

    df['Risk'] = df['Score'].apply(risk_level)

    return df