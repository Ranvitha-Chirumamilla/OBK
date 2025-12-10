import { useState } from "react";
import FloatingChatButton from "./FloatingChatButton";
import ChatWindow from "./ChatWindow";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Floating button (only when chat is closed) */}
      {!open && (
        <FloatingChatButton onClick={() => setOpen(true)} />
      )}

      {/* Chat window (only when chat is open) */}
      {open && (
        <ChatWindow onClose={() => setOpen(false)} />
      )}
    </div>
  );
}


// ------------------------------------------------------
// Make chatbot available to external websites (like Wix)
// ------------------------------------------------------
window.initObkChatbot = function () {
  console.log("OBK Chatbot Init Triggered");

  // Avoid duplicate widgets if triggered multiple times
  if (document.getElementById("obk-chatbot-container")) {
    console.log("Chatbot already exists, skipping mount.");
    return;
  }

  // Create container for React chatbot
  const container = document.createElement("div");
  container.id = "obk-chatbot-container";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.zIndex = "999999";
  container.style.width = "350px";
  container.style.height = "500px";

  document.body.appendChild(container);

  // Dynamically mount React app into Wix site
  import("react-dom/client").then((module) => {
    const root = module.createRoot(container);
    root.render(<App />);
  });
};
