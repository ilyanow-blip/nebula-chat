import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const socket = io(API_URL);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("init", (msgs) => setMessages(msgs));
    socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    return () => {
      socket.off("init");
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>NebulaChat</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
        {messages.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ marginTop: "10px", width: "80%" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px" }}>Send</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
