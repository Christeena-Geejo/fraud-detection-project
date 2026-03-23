from sklearn.ensemble import IsolationForest
import joblib
from config import MODEL_PATH

def train_model(X):
    model = IsolationForest(contamination=0.03, random_state=42)
    model.fit(X)
    joblib.dump(model, MODEL_PATH)
    return model

def load_model():
    try:
        return joblib.load(MODEL_PATH)
    except:
        return None