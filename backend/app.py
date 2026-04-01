from flask import Flask
from flask_cors import CORS

from routes.overview import overview_bp
from routes.supervised import supervised_bp
from routes.clustering import clustering_bp
from routes.association import association_bp
from routes.predict import predict_bp, init_models

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.register_blueprint(overview_bp, url_prefix='/api')
app.register_blueprint(supervised_bp, url_prefix='/api')
app.register_blueprint(clustering_bp, url_prefix='/api')
app.register_blueprint(association_bp, url_prefix='/api')
app.register_blueprint(predict_bp, url_prefix='/api')

import threading
print("Starting to initialize model for predict in background...")
init_thread = threading.Thread(target=init_models)
init_thread.daemon = True
init_thread.start()

if __name__ == '__main__':
    app.run(port=5000, debug=True)
