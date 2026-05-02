from flask import Flask, jsonify, request
import random
from flask_cors import CORS
from data import queues
from queue_model import get_all_wait_times, add_person
from allocator import assign_counter
from predictor import simulate_future
from utils import get_best_time

app = Flask(__name__)
CORS(app)
from flask_cors import CORS
CORS(app)

# 1. Current Status
@app.route("/status", methods=["GET"])
def status():
    return jsonify(get_all_wait_times(queues))


# 2. Join Queue (manual or auto assign)
@app.route("/join", methods=["POST"])
def join():
    data = request.json

    service_time = random.randint(20, 40)

    if "counter" in data:
        counter = data["counter"]
    else:
        counter = assign_counter(queues)

    add_person(queues[counter], service_time)

    return jsonify({
        "assigned_counter": counter,
        "service_time": service_time
    })


# 3. Prediction
@app.route("/predict", methods=["GET"])
def predict():
    predictions = simulate_future(queues, seconds=600)
    return jsonify(predictions)


# 4. Recommendation
@app.route("/recommend", methods=["GET"])
def recommend():
    predictions = simulate_future(queues, seconds=600)
    best_time, min_wait = get_best_time(predictions)

    best_counter = assign_counter(queues)

    return jsonify({
        "best_counter": best_counter,
        "best_time_seconds": best_time,
        "estimated_total_wait": min_wait
    })


if __name__ == "__main__":
    app.run(debug=True)