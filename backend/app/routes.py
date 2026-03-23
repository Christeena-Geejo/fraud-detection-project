from flask import Blueprint, request, jsonify
import pandas as pd
from app.services.preprocess import preprocess
from app.services.feature_engineering import create_features
from app.services.anomaly_detector import detect_anomalies
from app.utils.file_handler import save_file, save_output
from flask_cors import CORS

bp = Blueprint('main', __name__)

@bp.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    
    file_path = save_file(file)
    df = pd.read_csv(file_path)

    df, balance_col, withdraw_col, deposit_col = preprocess(df)
    df, features = create_features(df, balance_col, withdraw_col, deposit_col)

    df = detect_anomalies(df, df[features])

    fraud_df = df[df['Anomaly'] == 1]

    output_path = save_output(fraud_df, "fraud_output.csv")

    fraud_df = fraud_df.fillna('N/A')
    fraud_df['flag'] = fraud_df['Anomaly']             
    fraud_df['score'] = fraud_df['Score']
    fraud_df['risk'] = fraud_df['Risk'] 

    return jsonify({
    "message": "Fraud detection complete",
    "fraud_count": len(fraud_df),
    "total_records": len(df),

    "data": fraud_df.head(50).to_dict(orient='records')
    })