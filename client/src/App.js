import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns"; // Import date-fns for date formatting
import { InputBox } from "./InputBox";
import ReactMarkdown from "react-markdown";
import "./App.css";
import {
  queryChatGpt,
  saveChatHistory,
  loadChatHistory,
} from "./ServerCommunicationService";

function App() {
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null); // Create a ref for the chat window

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array includes messages

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const chatHistory = await loadChatHistory("chat-history");
        if (chatHistory) {
          setMessages(chatHistory);
        } else {
          setMessages([
            createChatMessage(
              "Welcome to ChatGPT! Type a message to start chatting.",
              "response"
            ),
          ]);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  const sendMessage = async (inputMessage) => {
    if (inputMessage) {
      postChatMessage(createInputMessage(inputMessage));
      const responseMessage = await queryChatGpt(inputMessage);
      postChatMessage(
        createResponseMessage(responseMessage),
        async (updatedMessages) => {
          await saveChatHistory(updatedMessages, "chat-history");
        }
      );
    }
  };

  const postChatMessage = (message, callback) => {
    if (message) {
      setMessages((messageHistory) => {
        const updatedMessages = [...messageHistory, message];
        if (callback) {
          callback(updatedMessages); // Call saveChatHistory after state update
        }
        return updatedMessages;
      });
    }
  };

  const createChatMessage = (message, type) => {
    return {
      text: message,
      type: type,
      time: format(new Date(), "MMM dd - HH:mm"),
    };
  };
  const createInputMessage = (message) => {
    return createChatMessage(message, "input");
  };
  const createResponseMessage = (message) => {
    return createChatMessage(message, "response");
  };

  return (
    <div className="App">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.type === "input" ? "input-message" : "response-message"
            }`}
          >
            <div className="message-header">
              <strong>{msg.type === "input" ? "You" : "ChatGPT"}</strong>
              <span className="spacer"></span>
              <span>[{msg.time}]</span>
              <br />
            </div>
            <ReactMarkdown>{msg.text}</ReactMarkdown> {/* Markdown rendering */}
          </div>
        ))}
      </div>
      <InputBox onSendMessage={sendMessage} />
    </div>
  );
}

export default App;
