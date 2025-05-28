from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import cv2

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

# OpenCV camera setup
camera = cv2.VideoCapture(0)

@app.route('/api/stream_0')
def stream_0():
    def generate_frames():
        while True:
            success, frame = camera.read()
            if not success:
                break
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "fused_data": {
            "robot_position": {
                "pitch": 0,
                "roll": 0,
                "x": 5,
                "y": 2,
                "yaw": 2,
                "z": 0
            },
            "targets": {
                "april_tags": []
            }
        },
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


settings_store = {}

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


if __name__ == '__main__':
    app.run(host='localhost', port=5800, debug=True)
