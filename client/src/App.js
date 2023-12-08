import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns"; // Import date-fns for date formatting
import { InputBox } from "./InputBox";
import "./App.css";
import { queryChatGpt, saveChatHistory } from "./ServerCommunicationService";

function App() {
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null); // Create a ref for the chat window

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array includes messages

  const sendMessage = async (inputMessage) => {
    if (inputMessage) {
      postChatMessage(createInputMessage(inputMessage));
      const responseMessage = await queryChatGpt(inputMessage);
      postChatMessage(createResponseMessage(responseMessage));
      await saveChatHistory(messages, "chat-history");
    }
  };

  const postChatMessage = async (message) => {
    if (message) {
      setMessages((messageHistory) => [...messageHistory, message]);
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
              <span className="spacer"></span> {/* Spacer element */}
              <span>[{msg.time}]</span>
              <br />
            </div>
            {msg.text}
          </div>
        ))}
      </div>
      <InputBox onSendMessage={sendMessage} />
    </div>
  );
}

export default App;
