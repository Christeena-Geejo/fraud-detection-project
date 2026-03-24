import numpy as np
from .model import train_model, load_model


def detect_anomalies(df, X):
    """Run IsolationForest on X, add Score / Anomaly / Risk columns to df."""
    model = load_model()
    if model is None:
        model = train_model(X)

    # decision_function: higher = more normal; we invert so higher = more anomalous
    raw_scores = model.decision_function(X)
    df = df.copy()
    df['Score'] = -raw_scores

    # Normalise to [0, 1]
    min_s = df['Score'].min()
    max_s = df['Score'].max()
    if max_s - min_s > 0:
        df['Score'] = (df['Score'] - min_s) / (max_s - min_s)
    else:
        df['Score'] = 0.0

    # Binary flag: 1 = anomaly, 0 = normal
    predictions = model.predict(X)           # +1 = normal, -1 = anomaly
    df['Anomaly'] = np.where(predictions == -1, 1, 0)

    # Risk level
    def risk_level(score):
        if score > 0.75:   return 'High Risk'
        elif score > 0.50: return 'Medium Risk'
        else:              return 'Low Risk'

    df['Risk'] = df['Score'].apply(risk_level)

    return df
