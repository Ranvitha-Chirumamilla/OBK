import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 🔥 Mark chatbot JS as loaded and notify external listeners
window.chatbotLoaded = true;
document.dispatchEvent(new Event("OBK_CHATBOT_LOADED"));

// Performance analytics (Optional)
reportWebVitals();
