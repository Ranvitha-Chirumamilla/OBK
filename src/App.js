import React, { useState } from "react";
import dataset from "./BigkitchenOBKAustralia_dataset.json";


function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm OBK Helper. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");

  const askBot = () => {
    if (!input.trim()) return;
  
    const userMsg = input.toLowerCase();
  
    // Add user message first
    setMessages(prev => [...prev, { sender: "user", text: input }]);
  
    let bestAnswer = null;
    let bestScore = 0;
  
    // Greeting handling
    const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];
    if (greetings.some(g => userMsg.includes(g))) {
      bestAnswer = "Hello! How can I help you with OBK information today?";
    } else {
      // Fuzzy match
      dataset.forEach(item => {
        const q = item.question.toLowerCase();
  
        let score = 0;
  
        // Check if question words appear anywhere
        q.split(" ").forEach(word => {
          if (word.length > 3 && userMsg.includes(word)) {
            score += 1;
          }
        });
  
        // Partial phrase match
        if (userMsg.includes(q.substring(0, 5))) {
          score += 1;
        }
  
        // If this is the best match so far → store it
        if (score > bestScore) {
          bestScore = score;
          bestAnswer = item.answer;
        }
      });
    }
  
    if (!bestAnswer) {
      bestAnswer = "Sorry, I don’t have information about that. Try asking about volunteering, donations, location, or meals.";
    }
  
    // Respond
    setMessages(prev => [...prev, { sender: "bot", text: bestAnswer }]);
    setInput("");
  };
  
  

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>OBK Australia Chatbot</h2>

      <div style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: 10,
        marginBottom: 10
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: 8
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "OBK Bot"}:</strong>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <input
        style={{ width: "70%", padding: 10 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button style={{ padding: 10 }} onClick={askBot}>Send</button>
    </div>
  );
}

export default App;
