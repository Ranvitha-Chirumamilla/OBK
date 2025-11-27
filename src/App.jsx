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
