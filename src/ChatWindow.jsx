import React, { useState, useEffect, useRef } from "react";
import dataset from "./BigkitchenOBKAustralia_dataset.json";

const linkifyText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    const cleanUrl = url.replace(/[.,)]*$/, "");
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`;
  });
};

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m Carrie. Please choose an option below." }
  ]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, relatedQuestions, showOptions]);

  const closeChat = () => {
    window.parent.postMessage("OBK_CLOSE_CHAT", "*");
    if (onClose) onClose();
  };

  const volunteerKeywords = [
    "volunteer",
    "wwcc",
    "duke of ed",
    "shift",
    "track volunteer hours",
    "cooking experience",
    "minimum age",
    "wear to volunteer",
    "register as a volunteer",
    "book a volunteer shift",
    "sign up to volunteer",
    "food be provided for volunteers"
  ];

  const donationKeywords = [
    "donat",
    "cash donation",
    "equipment donation",
    "food donation",
    "make a donation",
    "contribute through a cash donation"
  ];

  const volunteerData = dataset.filter((item) => {
    const question = item.question.toLowerCase();
    return volunteerKeywords.some((keyword) => question.includes(keyword));
  });

  const donationData = dataset.filter((item) => {
    const question = item.question.toLowerCase();
    return donationKeywords.some((keyword) => question.includes(keyword));
  });

  const handleBackToMainMenu = () => {
    setSelectedCategory("");
    setRelatedQuestions([]);
    setShowOptions(true);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: "Back to Main Menu" },
      { sender: "bot", text: "Please choose an option below." }
    ]);
  };

  const handleOptionClick = (option) => {
    setSelectedCategory(option);

    if (option === "volunteer") {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "Volunteer" },
        {
          sender: "bot",
          text: "Here are some volunteer-related questions you can choose from:"
        }
      ]);
      setRelatedQuestions(volunteerData);
      setShowOptions(false);
    } else if (option === "donations") {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "Donations" },
        {
          sender: "bot",
          text: "Here are some donation-related questions you can choose from:"
        }
      ]);
      setRelatedQuestions(donationData);
      setShowOptions(false);
    } else if (option === "general") {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "General Enquiry" },
        {
          sender: "bot",
          text:
            "Which would you like to know more about?\n\n" +
            "Volunteering Individually — Email our Volunteer Coordinator at volunteers@obk.org.au\n\n" +
            "Program Details — Email our Admin at info@obk.org.au\n\n" +
            "Is there anything else that I can help you with today?"
        }
      ]);
      setRelatedQuestions([]);
      setShowOptions(false);
    }
  };

  const handleRelatedQuestionClick = (item) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: item.question },
      { sender: "bot", text: item.answer }
    ]);
    setRelatedQuestions([]);
  };

  const askBot = () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    const userMsg = userInput.toLowerCase();

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);

    const greetings = [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good evening",
      "good afternoon"
    ];

    if (greetings.some((greeting) => userMsg.includes(greeting))) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Please choose one of these options: Volunteer, Donations, or General Enquiry."
        }
      ]);
      setInput("");
      return;
    }

    if (selectedCategory === "general") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "For general enquiries, please email our Admin at info@obk.org.au or visit https://www.obk.org.au/contact-us"
        }
      ]);
      setInput("");
      return;
    }

    let activeDataset = [];

    if (selectedCategory === "volunteer") {
      activeDataset = volunteerData;
    } else if (selectedCategory === "donations") {
      activeDataset = donationData;
    } else {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Please select Volunteer, Donations, or General Enquiry first."
        }
      ]);
      setInput("");
      return;
    }

    let bestAnswer = null;
    let bestScore = 0;
    const fuzzyThreshold = 2;
    const cleanUser = userMsg.replace(/[^\w\s]/g, "");

    for (const item of activeDataset) {
      const cleanQuestion = item.question.toLowerCase().replace(/[^\w\s]/g, "");
      if (cleanQuestion === cleanUser) {
        bestAnswer = item.answer;
        bestScore = 999;
        break;
      }
    }

    if (!bestAnswer) {
      for (const item of activeDataset) {
        const questionStart = item.question.toLowerCase().substring(0, 5);
        if (
          userMsg.length >= 5 &&
          item.question.toLowerCase().startsWith(userMsg.substring(0, 5))
        ) {
          bestAnswer = item.answer;
          bestScore = 500;
          break;
        }
        if (userMsg.includes(questionStart)) {
          bestAnswer = item.answer;
          bestScore = 400;
          break;
        }
      }
    }

    if (!bestAnswer) {
      activeDataset.forEach((item) => {
        const question = item.question.toLowerCase();
        let score = 0;

        question.split(" ").forEach((word) => {
          if (word.length > 3 && userMsg.includes(word)) score++;
        });

        if (userMsg.includes(question.substring(0, 5))) score++;

        if (score > bestScore) {
          bestScore = score;
          bestAnswer = item.answer;
        }
      });

      if (bestScore < fuzzyThreshold) {
        if (selectedCategory === "volunteer") {
          bestAnswer =
            "Sorry, I couldn’t find that volunteer information. Please email volunteers@obk.org.au.";
        } else if (selectedCategory === "donations") {
          bestAnswer =
            "Sorry, I couldn’t find that donation information. Please email info@obk.org.au.";
        }
      }
    }

    setMessages((prev) => [...prev, { sender: "bot", text: bestAnswer }]);
    setInput("");
  };

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
      background: "transparent"
    },

    window: {
      width: "380px",
      height: "520px",
      background: "white",
      borderRadius: "14px",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      pointerEvents: "auto",
      margin: "0px",
      overflow: "hidden",
      border: "none"
    },

    header: {
      background: "#2e7d32",
      padding: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
      fontWeight: "bold"
    },

    closeBtn: {
      background: "transparent",
      border: "none",
      color: "white",
      fontSize: "20px",
      cursor: "pointer"
    },

    messages: {
      flex: 1,
      padding: "12px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    },

    messageBubble: {
      padding: "12px 16px",
      borderRadius: "10px",
      maxWidth: "75%",
      fontSize: "14px",
      wordBreak: "break-word",
      overflowWrap: "anywhere",
      whiteSpace: "pre-wrap"
    },

    optionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginTop: "8px"
    },

    optionBtn: {
      background: "#f5f5f5",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px 12px",
      cursor: "pointer",
      textAlign: "left",
      fontSize: "14px",
      color: "#000"
    },

    backBtn: {
      background: "#2e7d32",
      border: "none",
      borderRadius: "8px",
      padding: "10px 12px",
      cursor: "pointer",
      textAlign: "center",
      fontSize: "14px",
      color: "white",
      fontWeight: "bold",
      marginTop: "8px"
    },

    inputArea: {
      display: "flex",
      padding: "10px",
      borderTop: "1px solid #ccc",
      background: "#fafafa"
    },

    input: {
      flex: 1,
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc"
    },

    sendBtn: {
      background: "#ff9800",
      border: "none",
      color: "white",
      padding: "10px 16px",
      marginLeft: "8px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.window}>
        <div style={styles.header}>
          <span>Carrie of OBK</span>
          <button style={styles.closeBtn} onClick={closeChat}>
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
                color: msg.sender === "user" ? "white" : "black"
              }}
            >
              {msg.sender === "bot" ? (
                <span dangerouslySetInnerHTML={{ __html: linkifyText(msg.text) }} />
              ) : (
                msg.text
              )}
            </div>
          ))}

          {showOptions && (
            <div style={styles.optionsContainer}>
              <button
                style={styles.optionBtn}
                onClick={() => handleOptionClick("volunteer")}
              >
                Volunteer
              </button>

              <button
                style={styles.optionBtn}
                onClick={() => handleOptionClick("donations")}
              >
                Donations
              </button>

              <button
                style={styles.optionBtn}
                onClick={() => handleOptionClick("general")}
              >
                General Enquiry
              </button>
            </div>
          )}

          {relatedQuestions.length > 0 && (
            <div style={styles.optionsContainer}>
              {relatedQuestions.map((item, index) => (
                <button
                  key={`${item.question}-${index}`}
                  style={styles.optionBtn}
                  onClick={() => handleRelatedQuestionClick(item)}
                >
                  {item.question}
                </button>
              ))}
            </div>
          )}

          {!showOptions && (
            <button style={styles.backBtn} onClick={handleBackToMainMenu}>
              Back to Main Menu
            </button>
          )}

          <div ref={messagesEndRef} />
        </div>

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

export default ChatWindow;