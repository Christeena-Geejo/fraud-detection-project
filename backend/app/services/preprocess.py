import pandas as pd

def preprocess(df):
    df.columns = df.columns.str.strip()

    balance_col = [c for c in df.columns if 'BALANCE' in c.upper()][0]
    withdraw_col = [c for c in df.columns if 'WITHDRAWAL' in c.upper()][0]
    deposit_col = [c for c in df.columns if 'DEPOSIT' in c.upper()][0]

    for col in [balance_col, withdraw_col, deposit_col]:
        df[col] = df[col].astype(str).str.replace(',', '')
        df[col] = pd.to_numeric(df[col], errors='coerce')

    df[[balance_col, withdraw_col, deposit_col]] = df[[balance_col, withdraw_col, deposit_col]].fillna(0)

    return df, balance_col, withdraw_col, deposit_col