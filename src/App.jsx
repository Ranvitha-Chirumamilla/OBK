import { useState, useEffect } from "react";
import FloatingChatButton from "./FloatingChatButton";
import ChatWindow from "./ChatWindow";

export default function App() {
  const [open, setOpen] = useState(false);

  // --------- Notify external site chatbot is ready ---------
  useEffect(() => {
    window.chatbotLoaded = true;
    document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));
    console.log("🔥 OBK Chatbot Ready (React mounted)");
  }, []);
  // ---------------------------------------------------------

  return (
    <div style={{ minHeight: "100vh" }}>
      {!open && (
        <FloatingChatButton onClick={() => setOpen(true)} />
      )}
      {open && (
        <ChatWindow onClose={() => setOpen(false)} />
      )}
    </div>
  );
}


// ------------------------------------------------------
// Make chatbot controllable by external websites (Wix / Webflow / Squarespace)
// ------------------------------------------------------
window.initObkChatbot = function () {
  console.log("⚡ initObkChatbot() called");

  // Prevent duplicate widgets
  if (document.getElementById("obk-chatbot-container")) {
    console.log("Chatbot already exists — skipping.");
    return;
  }

  const container = document.createElement("div");
  container.id = "obk-chatbot-container";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.zIndex = "999999";
  container.style.width = "350px";
  container.style.height = "500px";

  document.body.appendChild(container);

  // Mount the React chatbot inside the container
  import("react-dom/client").then((module) => {
    const root = module.createRoot(container);
    root.render(<App />);
  });
};
