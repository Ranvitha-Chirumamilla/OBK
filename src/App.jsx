import { useEffect } from "react";
import ChatWindow from "./ChatWindow";

export default function App() {

  useEffect(() => {
    window.chatbotLoaded = true;
    document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));
  }, []);

  return <ChatWindow />;
}
