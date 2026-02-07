import React, { useState } from "react";
import "../styles/ChatBotDrawer.css";

const ChatBotDrawer = ({ isOpen, onClose, location}) => {
    const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm your Urban GIS AI assistant." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!location) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Please select a location on the map first." }
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      {
        role: "bot",
        text: `Analyzing "${input}" for ${location.name}...`
      }
    ]);

    setInput("");
  };
    return(
        <>
            <div className={`chatbot-drawer ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
            <h4>GIS Assistant</h4>
            <button onClick={onClose}>✖</button>
        </div>

        <div className="chat-body">
            {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
                {m.text}
            </div>
            ))}
        </div>

        <div className="chat-input">
            <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            />
            <button onClick={sendMessage}>➤</button>
        </div>
        </div>
        </>
    );
}

export default ChatBotDrawer;