import React, { useState, useRef } from "react";

export function InputBox({ onSendMessage }) {
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