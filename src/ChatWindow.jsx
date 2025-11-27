import { useState } from "react";
import dataset from "./BigkitchenOBKAustralia_dataset.json";

const COLORS = {
  primary: "#F7941D",      // Orange (OBK)
  secondary: "#005A8B",    // Blue  (OBK)
  light: "#F5F5F5"
};

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm the OBK Helper. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const askBot = () => {
    if (!input.trim()) return;

    const userMsg = input.toLowerCase().trim();
    setMessages(prev => [...prev, { sender: "user", text: input }]);

    let answer = null;

    // 1️⃣ Greetings
    const greetings = ["hi", "hello", "hey", "good morning", "good evening"];
    if (greetings.some(g => userMsg.includes(g))) {
      answer = "Hello! 👋 How can I help you with OBK today?";
    }

    // 2️⃣ Pattern-based logic (fast replies)
    if (!answer) {
      if (
        userMsg.includes("hour") ||
        userMsg.includes("open") ||
        userMsg.includes("time") ||
        userMsg.includes("when")
      ) {
        answer = "OBK is open Monday–Friday from 9AM to 2PM.";
      }

      if (
        userMsg.includes("location") ||
        userMsg.includes("address") ||
        (userMsg.includes("where") && userMsg.includes("obk"))
      ) {
        answer = "OBK is located at 54/56 Flood St, Bondi NSW 2026.";
      }

      if (
        userMsg.includes("volunteer") ||
        userMsg.includes("help") ||
        userMsg.includes("support")
      ) {
        answer = "You can volunteer by signing up at www.obk.org.au/volunteer 🙌";
      }

      if (
        userMsg.includes("contact") ||
        userMsg.includes("phone") ||
        userMsg.includes("number")
      ) {
        answer = "You can contact OBK at +61 2 8084 2729 📞";
      }

      if (
        userMsg.includes("what is obk") ||
        (userMsg.includes("obk") && userMsg.includes("what"))
      ) {
        answer =
          "OBK (Our Big Kitchen) is a community-run industrial kitchen in Sydney that cooks and distributes meals for people facing hardship.";
      }
    }

    // 3️⃣ Fuzzy dataset matching
    if (!answer) {
      let bestScore = 0;

      dataset.forEach(item => {
        const q = item.question.toLowerCase();
        let score = 0;

        // Keyword matches
        q.split(" ").forEach(word => {
          if (word.length > 3 && userMsg.includes(word)) score += 1;
        });

        // Partial match for typos
        if (userMsg.includes(q.substring(0, 4))) score += 1;

        if (score > bestScore) {
          bestScore = score;
          answer = item.answer;
        }
      });
    }

    // 4️⃣ Fallback
    if (!answer) {
      answer =
        "I'm still learning! Try asking about hours, location, meals, volunteering, or donations.";
    }

    setMessages(prev => [...prev, { sender: "bot", text: answer }]);
    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "95px",
        right: "25px",
        width: "360px",
        height: "480px",
        background: "white",
        borderRadius: "14px",
        border: `2px solid ${COLORS.secondary}`,
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        zIndex: 100000
      }}
    >
      {/* Header */}
      <div
        style={{
          background: COLORS.secondary,
          padding: "12px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px"
        }}
      >
        {/* Title only */}
        <strong style={{ fontSize: "16px" }}>OBK Chat Assistant</strong>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 20,
            cursor: "pointer"
          }}
        >
          ✖
        </button>
      </div>

      {/* Chat messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          background: COLORS.light
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
              background: msg.sender === "user" ? "#d1eaff" : "white",
              textAlign: msg.sender === "user" ? "right" : "left",
              boxShadow:
                msg.sender === "bot"
                  ? "0 1px 4px rgba(0,0,0,0.1)"
                  : "none"
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div style={{ padding: "10px", display: "flex" }}>
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askBot()}
          placeholder="Type your question..."
        />
        <button
          onClick={askBot}
          style={{
            padding: "10px 14px",
            marginLeft: "6px",
            borderRadius: "8px",
            border: "none",
            background: COLORS.primary,
            color: "white",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}