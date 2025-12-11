import { useEffect } from "react";
import ChatWindow from "./ChatWindow";

export default function App() {

  // Notify external site chatbot is ready
  useEffect(() => {
    window.chatbotLoaded = true;
    document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));
    console.log("🔥 OBK Chatbot Ready (React mounted)");
  }, []);

  // Only render the chat window — no button here!
  return (
    <div style={{ minHeight: "100vh" }}>
      <ChatWindow />
    </div>
  );
}
