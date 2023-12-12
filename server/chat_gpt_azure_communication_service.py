from openai import AzureOpenAI

class ChatGptAzureCommunicationService:
    def __init__(self, api_base: str, api_version: str, api_key: str):
        self.client = AzureOpenAI(
            azure_endpoint=api_base,
            api_version=api_version,
            api_key=api_key
        )

    def send_request(self, message: str) -> str:
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-32-digital-buildings",
                messages = [
                    {
                        "role": "user",
                        "content": message
                    }
                ],
            )
        except Exception as e:
            return f"Invalid request, error: {e}"

        return response.choices[0].message.content