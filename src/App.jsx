import { useState, useEffect } from "react";
import FloatingChatButton from "./FloatingChatButton";
import ChatWindow from "./ChatWindow";

export default function App() {
  // Detect if running inside OBK iframe
  const isIframe = window.self !== window.top;

  const [open, setOpen] = useState(isIframe ? true : false);

  // Notify external sites when chatbot is ready
  useEffect(() => {
    window.chatbotLoaded = true;
    document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));
  }, []);

  // If inside iframe → ALWAYS show chat window directly (no floating button)
  if (isIframe) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <ChatWindow onClose={() => {}} /> 
      </div>
    );
  }

  // Normal behavior (local/Vercel full page)
  return (
    <div style={{ minHeight: "100vh" }}>
      {!open && <FloatingChatButton onClick={() => setOpen(true)} />}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  );
}
