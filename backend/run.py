print("🚀 Starting...")

from flask import Flask
from flask_cors import CORS
from app.routes import bp

app = Flask(__name__)

CORS(app)
app.register_blueprint(bp)

if __name__ == "__main__":
    print("Inside main")
    app.run(debug=True)