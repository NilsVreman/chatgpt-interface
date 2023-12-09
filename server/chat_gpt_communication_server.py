from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

class ChatGptCommunicationServer:
    def __init__(self):
        self._history_dir = "chat_history"
        os.makedirs(self._history_dir, exist_ok=True)
        self.app = Flask(__name__)
        CORS(self.app)
        self.setup_routes()

    def setup_routes(self):
        self.app.add_url_rule("/api/gpt", "handle_request", self.handle_request, methods=["POST"])
        self.app.add_url_rule("/api/save-chat", "save_chat_history", self.save_chat_history, methods=["POST"])
        self.app.add_url_rule("/api/load-chat", "load_chat_history", self.load_chat_history, methods=["GET"])

    def handle_request(self):
        try:
            message = request.json["message"]
            response_message = f"Server received: {message}"
        except (TypeError, KeyError):
            response_message = "No message received or invalid format"

        return jsonify({"message": response_message})
    
    def save_chat_history(self):
        try:
            chat_history_name = request.json["chatHistoryName"]
            chat_history = request.json["chatHistory"]

            file_path = os.path.join(self._history_dir, f"{chat_history_name}.json")
            with open(file_path, 'w') as file:
                json.dump(chat_history, file)

            return jsonify({"status": "success"})

        except KeyError:
            return jsonify({"status": "error", "message": "Missing data"}), 400

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    def load_chat_history(self):
        try:
            chat_history_name = request.args.get("file_name")
            file_path = os.path.join(self._history_dir, f"{chat_history_name}.json")
            with open(file_path, 'r') as file:
                chat_history = json.load(file)

            return jsonify({"status": "success", "chatHistory": chat_history})

        except FileNotFoundError:
            return jsonify({"status": "error", "message": "File not found"}), 404

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    def run(self, host="localhost", port=5000, debug=True):
        self.app.run(debug=False, host=host, port=port)

if __name__ == "__main__":
    server = ChatGptCommunicationServer()
    server.run()