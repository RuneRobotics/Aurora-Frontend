import random
import os
from pathlib import Path
from flask import Flask, Response, jsonify, request, send_file
from flask_cors import CORS
from waitress import serve
import threading
import time
import cv2

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

# Camera and threading setup
camera = cv2.VideoCapture(0)
frame_lock = threading.Lock()
latest_frame = None

def camera_reader():
    global latest_frame
    while True:
        success, frame = camera.read()
        if success:
            ret, buffer = cv2.imencode('.jpg', frame)
            with frame_lock:
                latest_frame = buffer.tobytes()
        time.sleep(1 / 30)  # ~30 FPS

threading.Thread(target=camera_reader, daemon=True).start()

# In-memory stores
settings_store = {}
mode_store = {
    "mode": "Detection",
    "camera_id": -1
}
calibration_settings_store = {}

# Snapshot storage
SNAPSHOT_DIR = Path("snapshots")
SNAPSHOT_DIR.mkdir(exist_ok=True)

def get_snapshot_path(index: int) -> Path:
    return SNAPSHOT_DIR / f"snapshot_{index}.jpg"

def list_snapshot_indices() -> list[int]:
    return sorted([
        int(f.stem.split('_')[1])
        for f in SNAPSHOT_DIR.glob("snapshot_*.jpg")
        if f.stem.split('_')[1].isdigit()
    ])

@app.route('/api/stream_0')
def stream_0():
    def generate_frames():
        while True:
            with frame_lock:
                if latest_frame is None:
                    continue
                frame = latest_frame
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/detection', methods=['GET'])
def detection_data():
    data = {
        "robot_position": {
            "pitch": 0,
            "roll": 0,
            "x": 5,
            "y": 2,
            "yaw": 2 + 3.14 * 180 / random.randint(1, 180),
            "z": 0
        },
        "targets": {
            "april_tags": []
        }
    }
    return jsonify(data)

@app.route('/api/device', methods=['GET'])
def get_data():
    data = {
        "ip": "1-.67.38.19",
        "cameras": [
            {
                "camera_id": 0,
                "camera_position": {
                    "pitch": 0,
                    "roll": 0,
                    "x": 5,
                    "y": 2,
                    "yaw": 2,
                    "z": 0
                },
                "targets": {
                    "april_tags": []
                }},
            {
                "camera_id": 1,
                "camera_position": {
                    "pitch": 0,
                    "roll": 0,
                    "x": 5,
                    "y": 2,
                    "yaw": 2,
                    "z": 0
                },
                "targets": {
                    "april_tags": []
                }}
        ]
    }
    return jsonify(data)

@app.route('/api/settings_<tab>', methods=['GET', 'POST'])
def handle_settings(tab):
    if request.method == 'GET':
        return jsonify(settings_store.get(tab, {
            "x": 0,
            "y": 0,
            "z": 0,
            "roll": 0,
            "pitch": 0,
            "yaw": 0,
            "fps": 30,
            "name": f"default_{tab}"
        }))
    elif request.method == 'POST':
        data = request.get_json()
        required_fields = ['x', 'y', 'z', 'roll', 'pitch', 'yaw', 'fps', 'name']
        missing = [key for key in required_fields if key not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        settings_store[tab] = data
        print(f"Saved settings for tab '{tab}': {data}")
        return jsonify({"status": "success"}), 200

@app.route('/api/mode', methods=['GET', 'POST'])
def handle_mode():
    if request.method == 'GET':
        return jsonify(mode_store)
    elif request.method == 'POST':
        data = request.get_json()
        if not data or 'mode' not in data or 'camera_id' not in data:
            return jsonify({"error": "Missing 'mode' or 'camera_id'"}), 400

        mode_store['mode'] = data['mode']
        mode_store['camera_id'] = data['camera_id']
        print(f"Updated mode: {mode_store}")
        return jsonify({"status": "success"}), 200

@app.route('/api/calibration_settings', methods=['POST'])
def calibration_settings():
    data = request.get_json()
    required_fields = ['rows', 'columns', 'sideLength', 'imageSize']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required calibration fields"}), 400

    image_size = data['imageSize']
    if not isinstance(image_size, dict) or 'width' not in image_size or 'height' not in image_size:
        return jsonify({"error": "Invalid imageSize format"}), 400

    calibration_settings_store.clear()
    calibration_settings_store.update({
        'rows': data['rows'],
        'columns': data['columns'],
        'sideLength': data['sideLength'],
        'imageSize': {
            'width': image_size['width'],
            'height': image_size['height']
        }
    })

    print(f"Calibration settings received: {calibration_settings_store}")
    return jsonify({"status": "success"}), 200

@app.route('/api/calibration_settings', methods=['GET'])
def get_calibration_settings():
    if not calibration_settings_store:
        return jsonify({"error": "No calibration settings found"}), 404
    return jsonify(calibration_settings_store)

@app.route('/api/calibration/snapshot_<int:index>')
def serve_snapshot(index):
    file_path = get_snapshot_path(index)
    if not file_path.exists():
        return jsonify({"error": "Snapshot not found"}), 404
    return send_file(file_path, mimetype="image/jpeg")

@app.route('/api/calibration/operation', methods=['POST'])
def handle_calibration_operation():
    data = request.get_json()
    if not data or 'operation' not in data:
        return jsonify({"error": "Missing 'operation' field"}), 400

    operation = data['operation']

    if operation == "Snapshot":
        with frame_lock:
            if latest_frame is None:
                return jsonify({"error": "No frame available"}), 500
            image_data = latest_frame

        indices = list_snapshot_indices()
        next_index = (max(indices) + 1) if indices else 0
        file_path = get_snapshot_path(next_index)
        with open(file_path, "wb") as f:
            f.write(image_data)
        print(f"Saved snapshot at index {next_index}")
        return jsonify({"status": "success", "index": next_index}), 200

    elif operation == "Delete":
        if 'index' not in data:
            return jsonify({"error": "Missing 'index' for delete operation"}), 400
        index = data['index']
        file_path = get_snapshot_path(index)
        if file_path.exists():
            os.remove(file_path)
            print(f"Deleted snapshot at index {index}")
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"error": f"Snapshot {index} not found"}), 404

    elif operation == "Calibration":
        for f in SNAPSHOT_DIR.glob("snapshot_*.jpg"):
            f.unlink()
        print("Deleted all calibration snapshots")
        return jsonify({"status": "success"}), 200

    else:
        return jsonify({"error": f"Unknown operation '{operation}'"}), 400

if __name__ == '__main__':
    print("Starting server on http://localhost:5800")
    serve(app, host='localhost', port=5800)
