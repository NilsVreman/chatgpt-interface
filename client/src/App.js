import React, { useState, useEffect, useRef } from 'react';
import { format } from "date-fns"; // Import date-fns for date formatting
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null); // Create a ref for the chat window

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array includes messages

  const sendMessage = (message) => {
    if (message) {
      const timestamp = format(new Date(), "MMM dd - HH:mm"); // Format current date and time
      setMessages([
        ...messages,
        { text: message, type: "input", time: timestamp },
        { text: `Echo: ${message}`, type: "response", time: timestamp },
      ]);
    }
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
        rows="1"
        onChange={(e) => {
          setInput(e.target.value);
          adjustHeight(e);
        }}
        onKeyDown={handleKeyDown}
        style={{ resize: "none", overflowY: "hidden" }} // Hide default scrollbar
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
