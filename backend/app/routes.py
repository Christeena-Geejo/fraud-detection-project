import time
import pandas as pd
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from app.services.preprocess import preprocess
from app.services.feature_engineering import create_features
from app.services.anomaly_detector import detect_anomalies
from app.utils.file_handler import save_file, save_output

bp = Blueprint('main', __name__)


@bp.route('/upload', methods=['POST', 'OPTIONS'])
@cross_origin()
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if not file.filename:
        return jsonify({'error': 'Empty filename'}), 400

    start_ms = time.time()

    try:
        file_path = save_file(file)

        # Read CSV or Excel
        if file.filename.lower().endswith('.xlsx'):
            df = pd.read_excel(file_path)
        else:
            df = pd.read_csv(file_path, encoding='utf-8', on_bad_lines='skip')

        total_records = len(df)

        # Preprocess → feature engineering → anomaly detection
        df, balance_col, withdraw_col, deposit_col = preprocess(df)
        df, features = create_features(df, balance_col, withdraw_col, deposit_col)
        df = detect_anomalies(df, df[features])

        processing_ms = int((time.time() - start_ms) * 1000)

        # Save full output
        save_output(df, "fraud_output.csv")

        # Prepare response — return ALL rows so the frontend can show clean ones too
        df_out = df.fillna('')

        # Normalise column names for the frontend mapper
        df_out['flag']  = df_out['Anomaly'].astype(int)
        df_out['score'] = df_out['Score']          # 0-1 float; frontend converts to %
        df_out['risk']  = df_out['Risk']            # "High Risk" / "Medium Risk" / "Low Risk"

        fraud_count = int(df_out['flag'].sum())

        rows = df_out.head(200).to_dict(orient='records')

        return jsonify({
            'message':       'Fraud detection complete',
            'fraud_count':   fraud_count,
            'total_records': total_records,
            'filename':      file.filename,
            'processing_ms': processing_ms,
            'data':          rows,
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
