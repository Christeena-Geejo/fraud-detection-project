print("🚀 Starting Momentum backend...")

from flask import Flask
from flask_cors import CORS
from app.routes import bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
