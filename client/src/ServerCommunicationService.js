const serverURL = "http://localhost:5000";

export const queryChatGpt = async (message) => {
  try {
    const response = await fetch(`${serverURL}/api/gpt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseMessage = await response.json()
    return responseMessage.message;
  } catch (error) {
    console.error("Error sending message:", error);
    return `Server communication error: ${error}`;
  }
};

export const saveChatHistory = async (chatHistory, chatHistoryName) => {
  const dataToSend = {
    chatHistory: chatHistory,
    chatHistoryName: chatHistoryName,
  };
  try {
    const response = await fetch(`${serverURL}/api/save-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( dataToSend ),
    });
    if (response.ok) {
      return await response.json();
    }
    console.error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error("Error saving chat history:", error);
    return null;
  }
};

// Add more functions as needed
