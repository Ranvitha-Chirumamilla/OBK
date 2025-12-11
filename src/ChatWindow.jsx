import React, { useState } from "react";
import dataset from "./BigkitchenOBKAustralia_dataset.json";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m Carrie. How can I help you today?" }
  ]);

  const [input, setInput] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastUnknown, setLastUnknown] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const resetState = () => {
    setAttemptCount(0);
    setLastUnknown("");
    setShowOptions(false);
  };

  const askBot = () => {
    if (!input.trim()) return;
    const userMsg = input.toLowerCase().trim();

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    let bestAnswer = null;
    let bestScore = 0;

    const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];
    if (greetings.some((g) => userMsg.includes(g))) {
      resetState();
      bestAnswer = "Hello! How can I help you with OBK information today?";
    }

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

      if (bestScore > 0) resetState();
      else bestAnswer = null;
    }

    if (!bestAnswer) {
      const newCount = userMsg === lastUnknown ? attemptCount + 1 : 1;

      setLastUnknown(userMsg);
      setAttemptCount(newCount);

      if (newCount === 1) {
        bestAnswer = "Sorry, I don’t have that information — could you rephrase your question?";
      } else if (newCount === 2) {
        bestAnswer = "I'm still not finding that — could you try asking differently?";
      } else if (newCount >= 3) {
        bestAnswer = "Which would you like to know more about?";
        setShowOptions(true);
      }

      setMessages((prev) => [...prev, { sender: "bot", text: bestAnswer }]);
      setInput("");
      return;
    }

    resetState();
    setMessages((prev) => [...prev, { sender: "bot", text: bestAnswer }]);
    setInput("");
  };

  // -----------------------------------------------------------------------
  // 🌟 FIX: ENSURE CLOSE BUTTON WORKS INSIDE WIX (iframe → parent)
  // -----------------------------------------------------------------------
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose(); // closes internal chat
    }

    // Send message to parent Wix site to close outer widget
    try {
      window.parent.postMessage("OBK_CLOSE_CHAT", "*");
    } catch (e) {
      console.error("PostMessage failed", e);
    }
  };

  // -----------------------------------------------------------------------
  // STYLES
  // -----------------------------------------------------------------------
  const styles = {
    overlay: {
      position: "fixed",
      bottom: 0,
      right: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      zIndex: 2147483647,
      pointerEvents: "none",
    },

    window: {
      width: "350px",
      height: "500px",
      background: "white",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      margin: "20px",
      zIndex: 2147483647,
      pointerEvents: "auto",
    },

    header: {
      background: "#2e7d32",
      padding: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
    },

    closeBtn: {
      background: "transparent",
      border: "none",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
      padding: "4px",
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

  // -----------------------------------------------------------------------

  return (
    <div style={styles.overlay}>
      <div style={styles.window}>
        <div style={styles.header}>
          <span>Carrie of OBK</span>

          {/* FIXED CLOSE BUTTON */}
          <button style={styles.closeBtn} onClick={handleClose}>
            ✖
          </button>
        </div>

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

export default ChatWindow;
