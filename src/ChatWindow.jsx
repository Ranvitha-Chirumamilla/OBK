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
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastUnknown, setLastUnknown] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  // Reset fallback logic when correct answer or button is clicked
  const resetState = () => {
    setAttemptCount(0);
    setLastUnknown("");
    setShowOptions(false);
  };

  // ---------------------------
  // 🔥 MAIN BOT LOGIC
  // ---------------------------
  const askBot = () => {
    if (!input.trim()) return;
    const userMsg = input.toLowerCase().trim();

    // Add user message to screen
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    let bestAnswer = null;
    let bestScore = 0;

    // ---------------------------
    // 1. GREETING DETECTION
    // ---------------------------
    const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];
    if (greetings.some((g) => userMsg.includes(g))) {
      resetState();
      bestAnswer = "Hello! How can I help you with OBK information today?";
    }

    // ---------------------------
    // 2. EXACT MATCH
    // ---------------------------
    if (!bestAnswer) {
      const cleanUser = userMsg.replace(/[^\w\s]/g, "");
      for (let item of dataset) {
        const cleanQ = item.question.toLowerCase().replace(/[^\w\s]/g, "");
        if (cleanQ === cleanUser) {
          resetState();
          bestAnswer = item.answer;
          bestScore = 999;
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
          resetState();
          bestAnswer = item.answer;
          bestScore = 500;
          break;
        }
      }
    }

    // ---------------------------
    // 4. FUZZY MATCH
    // ---------------------------
    if (!bestAnswer) {
      dataset.forEach((item) => {
        const q = item.question.toLowerCase();
        let score = 0;

        q.split(" ").forEach((word) => {
          if (word.length > 3 && userMsg.includes(word)) score++;
        });

        if (userMsg.includes(q.substring(0, 5))) score++;

        if (score > bestScore) {
          bestScore = score;
          bestAnswer = item.answer;
        }
      });

      // If fuzzy matched but low confidence → treat as match
      if (bestScore > 0) resetState();
      else bestAnswer = null;
    }

    // ---------------------------
    // 5. UNKNOWN QUESTION HANDLING (Correct 3-step fallback)
    // ---------------------------
    if (!bestAnswer) {
      const newCount = userMsg === lastUnknown ? attemptCount + 1 : 1;

      setLastUnknown(userMsg);
      setAttemptCount(newCount);

      if (newCount === 1) {
        bestAnswer =
          "Sorry, I don’t have that information — could you rephrase your question?";
      } else if (newCount === 2) {
        bestAnswer =
          "I'm still not finding that — could you try asking in a different way?";
      } else if (newCount >= 3) {
        bestAnswer =
          "Which would you like to know more about:\n\n👉 Volunteering Individually\n👉 Program / Event Details";
        setShowOptions(true);
      }

      setMessages((prev) => [...prev, { sender: "bot", text: bestAnswer }]);
      setInput("");
      return;
    }

    // SUCCESS MATCH → RESET ATTEMPTS
    resetState();
    setMessages((prev) => [...prev, { sender: "bot", text: bestAnswer }]);
    setInput("");
  };

  // ---------------------------
  // BUTTON HANDLERS
  // ---------------------------
  const handleVolunteerClick = () => {
    const response =
      "To learn more about *volunteering individually*, please email our Volunteer Coordinator at **volunteers@obk.org.au**.\n\nIs there anything else I can help you with?";
    
    setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    resetState();
  };

  const handleProgramClick = () => {
    const response =
      "To learn more about *program and event details*, please email our Admin team at **info@obk.org.au**.\n\nIs there anything else I can help you with?";
    
    setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    resetState();
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

          {showOptions && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              <button style={styles.optionBtn} onClick={handleVolunteerClick}>
                Volunteering Individually
              </button>
              <button style={styles.optionBtn} onClick={handleProgramClick}>
                Program / Event Details
              </button>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => e.key === "Enter" && askBot()}
          />
          <button style={styles.sendBtn} onClick={askBot}>Send</button>
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
    background: "#2e7d32",
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

  optionBtn: {
    background: "#2e7d32",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default ChatWindow;

