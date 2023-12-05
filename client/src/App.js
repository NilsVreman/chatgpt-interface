import React, { useState, useRef } from 'react';
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
  const textareaRef = useRef(null); // Create a ref for the textarea

  const handleSend = () => {
    onSendMessage(input.trim());
    setInput("");
    // Reset the textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"; // Reset to default
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const adjustHeight = (event) => {
    event.target.style.height = "inherit"; // Reset height to recalculate
    event.target.style.height = `${event.target.scrollHeight}px`; // Set new height
  };

  return (
    <div className="input-box">
      <textarea
        ref={textareaRef} // Attach the ref to the textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          adjustHeight(e);
        }}
        onKeyDown={handleKeyDown}
        rows="1"
        style={{ resize: "none", overflowY: "hidden" }} // Hide default scrollbar
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
