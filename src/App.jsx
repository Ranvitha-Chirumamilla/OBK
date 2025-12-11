import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    window.chatbotLoaded = true;
    document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));
  }, []);

  return null;   // ⛔ IMPORTANT: do NOT render ChatWindow
}
