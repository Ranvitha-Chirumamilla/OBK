import React, { useState } from "react";
import dataset from "./BigkitchenOBKAustralia_dataset.json";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm the OBK Helper. How can I assist you today?",
    },
  ]);

  const [input, setInput] = useState("");

  // ---------------------------
  // 🔥 MAIN BOT LOGIC (FIXED)
  // ---------------------------
  const askBot = () => {
    if (!input.trim()) return;

    const userMsg = input.toLowerCase().trim();

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    let bestAnswer = null;
    let bestScore = 0;

    // ---------------------------
    // 1. GREETING DETECTION
    // ---------------------------
    const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];

    if (greetings.some((g) => userMsg.includes(g))) {
      bestAnswer = "Hello! How can I help you with OBK information today?";
    }

    // ---------------------------
    // 2. EXACT MATCH (highest priority)
    // ---------------------------
    if (!bestAnswer) {
      const cleanUser = userMsg.replace(/[^\w\s]/g, "");
      for (let item of dataset) {
        const cleanQ = item.question.toLowerCase().replace(/[^\w\s]/g, "");
        if (cleanQ === cleanUser) {
          bestAnswer = item.answer;
          bestScore = 999; // guarantee this wins
          break;
        }
      }
    }

    // ---------------------------
    // 3. STARTS-WITH MATCH
    // ---------------------------
    if (!bestAnswer) {
      for (let item of dataset) {
        if (item.question.toLowerCase().startsWith(userMsg.substring(0, 5))) {
          bestAnswer = item.answer;
          bestScore = 500;
          break;
        }
      }
    }

    // ---------------------------
    // 4. FUZZY MATCH (fallback)
    // ---------------------------
    if (!bestAnswer) {
      dataset.forEach((item) => {
        const q = item.question.toLowerCase();
        let score = 0;

        // Keyword scoring
        q.split(" ").forEach((word) => {
          if (word.length > 3 && userMsg.includes(word)) {
            score += 1;
          }
        });

        // Partial match
        if (userMsg.includes(q.substring(0, 5))) {
          score += 1;
        }

        // Store highest score
        if (score > bestScore) {
          bestScore = score;
          bestAnswer = item.answer;
        }
      });
    }

    // ---------------------------
    // 5. DEFAULT FALLBACK
    // ---------------------------
    if (!bestAnswer) {
      bestAnswer =
        "Sorry, I don’t have information about that. Try asking about meals, volunteering, donations, or OBK hours.";
    }

    // Display bot response
    setMessages((prev) => [...prev, { sender: "bot", text: bestAnswer }]);
    setInput("");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.window}>
        {/* HEADER */}
        <div style={styles.header}>
          <span style={styles.headerTitle}>OBK Chat Assistant</span>
          <button style={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        {/* MESSAGES */}
        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.messageBubble,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#ff9800" : "#e0e0e0",
                color: msg.sender === "user" ? "white" : "black",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => e.key === "Enter" && askBot()}
          />
          <button style={styles.sendBtn} onClick={askBot}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------------------
// 🎨 STYLES
// ---------------------------
const styles = {
  overlay: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    zIndex: 9999,
  },

  window: {
    width: "350px",
    height: "500px",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },

  header: {
    background: "#01579b",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: "16px",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },

  messages: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  messageBubble: {
    padding: "10px 14px",
    borderRadius: "10px",
    maxWidth: "75%",
    fontSize: "14px",
  },

  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
    background: "#fafafa",
  },

  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  sendBtn: {
    background: "#ff9800",
    border: "none",
    color: "white",
    padding: "10px 16px",
    marginLeft: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ChatWindow;
