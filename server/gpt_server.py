from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/gpt', methods=['POST'])
def handle_request():
    try:
        message = request.json['message']
        response_message = f"Server received: {message}"
    except (TypeError, KeyError):
        response_message = "No message received or invalid format"

    return jsonify({"message": response_message})

@app.route('/api/save-chat', methods=['POST'])
def save_chat_history():
    try:
        chat_history_name = request.json['chatHistoryName']
        chat_history = request.json['chatHistory']
        with open(f'{chat_history_name}.json', 'w') as file:
            json.dump(chat_history, file)
        return jsonify({"status": "success"})
    except Exception as e:
        print(e)
        return jsonify({"status": "error"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)