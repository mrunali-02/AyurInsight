import os
import threading

from flask import Flask
from flask_cors import CORS

from routes.overview import overview_bp
from routes.supervised import supervised_bp
from routes.clustering import clustering_bp
from routes.association import association_bp
from routes.predict import predict_bp, init_models

app = Flask(__name__)

# Enable CORS for local and deployed frontend
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                os.getenv("CORS_ORIGIN")
            ]
        }
    }
)


# Root Route
@app.route("/")
def home():
    return {
        "status": "running",
        "message": "Machine Learning Backend API is Live 🚀",
        "version": "1.0.0"
    }, 200


# Register API Blueprints
app.register_blueprint(overview_bp, url_prefix="/api")
app.register_blueprint(supervised_bp, url_prefix="/api")
app.register_blueprint(clustering_bp, url_prefix="/api")
app.register_blueprint(association_bp, url_prefix="/api")
app.register_blueprint(predict_bp, url_prefix="/api")


# Initialize ML models in the background
print("🚀 Initializing ML models in background...")
init_thread = threading.Thread(target=init_models)
init_thread.daemon = True
init_thread.start()


# Run Flask Application
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
