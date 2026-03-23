from .model import train_model, load_model

def detect_anomalies(df, X):
    model = load_model()

    if model is None:
        model = train_model(X)

    df['Anomaly'] = model.predict(X)
    df['Anomaly'] = df['Anomaly'].map({1: 0, -1: 1})

    return df