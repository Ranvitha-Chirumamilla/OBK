import { useState, useEffect } from "react";
import FloatingChatButton from "./FloatingChatButton";
import ChatWindow from "./ChatWindow";

export default function App() {
  const [open, setOpen] = useState(false);

  // Notify external sites when chatbot is ready
  useEffect(() => {
    window.chatbotLoaded = true;
    document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      {!open && <FloatingChatButton onClick={() => setOpen(true)} />}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  );
}
