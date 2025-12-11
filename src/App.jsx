import { useEffect } from "react";
import ChatWindow from "./ChatWindow";

export default function App() {
  // Tell external websites (Wix) that the chatbot app has finished loading
  useEffect(() => {
    window.chatbotLoaded = true;
    document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));
    console.log("🔥 OBK React App Loaded");
  }, []);

  return null; // IMPORTANT: Do NOT render ChatWindow here
}

// ------------------------------------------------------
// EXTERNAL INITIALIZER CALLED FROM widget.js (iframe)
// ------------------------------------------------------
window.initObkChatbot = function () {
  console.log("⚡ initObkChatbot() triggered — mounting ChatWindow");

  // Prevent duplicates inside iframe
  if (document.getElementById("obk-inner-chat")) return;

  const mountDiv = document.createElement("div");
  mountDiv.id = "obk-inner-chat";
  document.body.appendChild(mountDiv);

  import("react-dom/client").then((module) => {
    const root = module.createRoot(mountDiv);
    root.render(<ChatWindow />);
  });
};
