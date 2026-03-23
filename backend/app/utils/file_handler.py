import os
from config import UPLOAD_FOLDER, OUTPUT_FOLDER

def save_file(file):
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)
    return path

def save_output(df, filename):
    output_path = os.path.join(OUTPUT_FOLDER, filename)
    df.to_csv(output_path, index=False)
    return output_path