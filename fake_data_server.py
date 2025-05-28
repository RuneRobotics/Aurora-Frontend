from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

# OpenCV video capture (0 = default camera)
camera = cv2.VideoCapture(0)

@app.route('/api/stream_0')
def stream_0():
    def generate_frames():
        while True:
            success, frame = camera.read()
            if not success:
                break
            else:
                # Encode frame as JPEG
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

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

if __name__ == '__main__':
    app.run(host='localhost', port=5800, debug=True)
