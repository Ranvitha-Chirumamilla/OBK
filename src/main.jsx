import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const WIDGET_CONTAINER_ID = "obk-chat-widget";

// Check if chatbot mount container exists — if not, create it
let mountNode = document.getElementById(WIDGET_CONTAINER_ID);

if (!mountNode) {
  mountNode = document.createElement("div");
  mountNode.id = WIDGET_CONTAINER_ID;
  document.body.appendChild(mountNode);
}

// Mount App into the floating div (works on Wix + any external site)
ReactDOM.createRoot(mountNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
