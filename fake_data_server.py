from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")  # Allow requests from port 5173


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
