# Momentum — Bank Anomaly Detection

## Project Structure

```
momentum/
├── frontend/          ← Open index.html in a browser
│   ├── index.html     ← Upload & Process
│   ├── dashboard.html ← Overview & stats
│   ├── flagged.html   ← All flagged transactions
│   ├── account.html   ← Per-account detail
│   ├── explorer.html  ← Anomaly type explorer
│   ├── export.html    ← Export reports
│   ├── data.js        ← Shared data, utilities, backend integration
│   └── style.css      ← Shared styles
│
└── backend/           ← Flask API
    ├── run.py         ← Entry point: python run.py
    ├── config.py      ← Paths config
    ├── requirements.txt
    ├── models/
    │   └── isolation_forest.pkl
    ├── uploads/       ← Auto-created on first run
    ├── outputs/       ← Auto-created on first run
    └── app/
        ├── routes.py
        ├── services/
        │   ├── preprocess.py
        │   ├── feature_engineering.py
        │   ├── anomaly_detector.py
        │   └── model.py
        └── utils/
            └── file_handler.py
```

## Quick Start

### 1. Start the backend
```bash
cd backend
pip install -r requirements.txt
python run.py
```
Backend runs on http://localhost:5000

### 2. Open the frontend
Open `frontend/index.html` in your browser directly (no server needed),
or serve with:
```bash
cd frontend
python -m http.server 8080
```

### 3. Upload a CSV
The CSV should have columns: transaction_id, account_id, date, time,
transaction_type, amount, channel (optional), branch_code (optional).

If the backend is not running, the app shows mock demo data on all pages.
