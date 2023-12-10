from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import argparse

from chat_gpt_azure_communication_service import ChatGptAzureCommunicationService

class ChatGptCommunicationServer:
    def __init__(self, api_base: str, api_version: str, api_key: str):
        self.gptService = ChatGptAzureCommunicationService(
            api_base=api_base,
            api_version=api_version,
            api_key=api_key
        )

        self.history_dir = "chat_history"
        os.makedirs(self.history_dir, exist_ok=True)

        self.app = Flask(__name__)
        CORS(self.app)
        self.setup_routes()

    def setup_routes(self):
        self.app.add_url_rule("/api/gpt", "handle_gpt_query", self.handle_gpt_query, methods=["POST"])
        self.app.add_url_rule("/api/save-chat", "save_chat_history", self.save_chat_history, methods=["POST"])
        self.app.add_url_rule("/api/load-chat", "load_chat_history", self.load_chat_history, methods=["GET"])

    def handle_gpt_query(self):
        try:
            message = request.json["message"]
            response = self.gptService.send_request(message)
        except (TypeError, KeyError):
            response = "No message received or invalid format"

        return jsonify({"message": response})
    
    def save_chat_history(self):
        try:
            chat_history_name = request.json["chatHistoryName"]
            chat_history = request.json["chatHistory"]

            file_path = os.path.join(self.history_dir, f"{chat_history_name}.json")
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
            file_path = os.path.join(self.history_dir, f"{chat_history_name}.json")
            with open(file_path, 'r') as file:
                chat_history = json.load(file)

            return jsonify({"status": "success", "chatHistory": chat_history})

        except FileNotFoundError:
            return jsonify({"status": "error", "message": "File not found"}), 404

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    def run(self, host="localhost", port=5000, debug=True):
        self.app.run(debug=False, host=host, port=port)

    @staticmethod
    def setup_argument_parser():
        parser = argparse.ArgumentParser(description="Chat GPT Communication Server")
        parser.add_argument("--api-version", required=True, type=str, help="The api version")
        parser.add_argument("--api-base", required=True, type=str, help="The base chat gpt api url")
        parser.add_argument("--api-key", required=True, type=str, help="The api key")
        return parser

if __name__ == "__main__":
    argparser = ChatGptCommunicationServer.setup_argument_parser()
    args = argparser.parse_args()

    server = ChatGptCommunicationServer(args.api_base, args.api_version, args.api_key)
    server.run()