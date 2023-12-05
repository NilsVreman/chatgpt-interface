import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    if (message) {
      setMessages([
        ...messages,
        { text: message, type: "input" },
        { text: `Echo: ${message}`, type: "response" },
      ]);
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.type === "input" ? "input-message" : "response-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <InputBox onSendMessage={sendMessage} />
    </div>
  );
}

function InputBox({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
