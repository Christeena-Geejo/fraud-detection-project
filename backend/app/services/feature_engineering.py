import pandas as pd
def create_features(df, balance_col, withdraw_col, deposit_col):
    df['Amount'] = df[deposit_col] - df[withdraw_col]

    if 'DATE' in df.columns:
        df['DATE'] = pd.to_datetime(df['DATE'], errors='coerce')
        df['Day'] = df['DATE'].dt.day
        df['Month'] = df['DATE'].dt.month

    features = [withdraw_col, deposit_col, balance_col, 'Amount']
    return df, features