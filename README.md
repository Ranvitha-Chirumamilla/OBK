# OBK Chatbot – Floating FAQ Assistant for Our Big Kitchen (OBK)

<div align="center">

# 🤖 OBK Chatbot  
### A Floating FAQ Assistant for **Our Big Kitchen (OBK) – Australia**

---

</div>

The OBK Chatbot provides an automated way for visitors to quickly find information about volunteering, programs, events, and general OBK inquiries. It behaves as a **floating interactive assistant**, appearing on every page of the OBK website.

Clicking the floating button opens a conversational interface powered by a FAQ-based dataset and custom search logic.

---

## 🧠 Key Capabilities

- 🔍 Answers FAQ-based questions using matching logic  
- 🤝 Provides action response buttons when unsure  
- 📱 Fully responsive and mobile-friendly  
- 💬 Three-step fallback flow for unknown questions  
- 🚀 Auto-published to production from GitHub via Netlify  
- 🛠 Easily maintained by updating a single JSON file  
- 🌍 Embedded and visible across all OBK website pages

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| ⚛ React + Vite | Chat UI and behavior logic |
| 📄 JSON dataset | Stores questions and answers |
| 🚀 Netlify | Hosting and CI/CD |
| 🌐 Wix Custom Code | Embedding chatbot into obk.org.au |
| 🧩 `chatbot-widget.js` | Floating widget and external loader |

---

## 📦 Project Structure Overview

| Component | Description |
|----------|-------------|
| `src/ChatWindow.jsx` | Main chatbot UI, message handling, logic and fallback flow |
| `src/App.jsx` | Wrapper component |
| `src/main.jsx` | Dynamically mounts chatbot when injected into external pages |
| `public/chatbot-widget.js` | Script used to inject and display chatbot on the OBK website |
| `BigKitchenOBK_dataset.json` | All FAQ responses used by chatbot |

---

## 🧩 How the System Works



The chatbot is built with:

- **React + Vite** (for the UI and logic)
- **JSON dataset** (for OBK questions and answers)
- **Netlify** (for hosting and auto-deploy)
- **Wix custom code** (to embed the chatbot on the OBK site)
- **`widget.js`** (to create the professional floating widget)

---

## 1. Big Picture – How Everything Fits Together

At a high level, this project has **three main parts**:

1. **React chatbot app** (the real chat UI with messages, input box, logic)
2. **FAQ dataset** (a JSON file with OBK questions and answers)
3. **Widget script (`widget.js`)** that:
   - creates the floating orange button on the website  
   - opens a popup chat window  
   - loads the React app inside an `iframe`

============

## Features

✔ Floating chat button across **all pages**  
✔ Exact match, partial match & fuzzy matching search  
✔ Smart fallback system (3 attempts logic)  
✔ Interactive buttons for volunteering & program inquiries  
✔ Mobile-responsive UI  
✔ Auto-deployed via Netlify from GitHub  
✔ Easy content updates via JSON file (no coding needed)

## 🧠 Architecture Overview

GitHub Repo → Netlify (Auto Deployment) → chatbot-widget.js → Wix Website

| Layer | Purpose |
|-------|--------|
| 💬 React Chat UI | Displays chatbot interface |
| 🧮 Chat logic | Matching, scoring, fallback, options |
| 📄 JSON Dataset | Stores FAQs (editable without code changes) |
| 🔧 chatbot-widget.js | Allows embedding anywhere (Wix, future platforms) |
| 🌐 Wix Custom Code | Injects chatbot into OBK.org.au site |

---

## 🗂️ Important Files

| File | Description |
|------|-------------|
| `src/ChatWindow.jsx` | Core chatbot logic + UI |
| `src/App.jsx` | Shell that wraps chatbot |
| `src/main.jsx` | Custom mounting logic for external sites |
| `public/chatbot-widget.js` | Script Wix loads |
| `BigKitchenOBK_dataset.json` | All chatbot responses |

---

## 🧪 Local Development

npm install
npm run dev

then open : '<http://localhost:5173/>'

## 🚀 Deployment

Deployment happens **automatically when you push to GitHub**.

```sh
git add .
git commit -m "Your update message"
git push

Netlify will detect changes and redeploy to production.

To confirm deployment:

Visit Netlify → Deploys

Look for ✔ Published

========================

## Embedding on WIX (Already Configured but here for future use)

If the chatbot ever needs to be reinstalled:

Open: Wix Dashboard → Settings → Custom Code → Add Custom Code

Paste this:

<script src="https://obk-chabot.netlify.app/chatbot-widget.js"></script>


Set:
| Setting   | Value              |
| --------- | ------------------ |
| Apply to  | **All Pages**      |
| Insert at | **Body - end**     |
| Load      | **On every visit** |


Save → Publish → Refresh site

=================
✏️ Updating FAQ Content (No Code Change Required)

To update answers in the chatbot:

Edit BigKitchenOBK_dataset.json

Save changes

Push update to GitHub:

git add BigKitchenOBK_dataset.json
git commit -m "Updated OBK FAQ content"
git push


Netlify will redeploy automatically.

---------------------

🧑‍💻 Updating Chat Functionality or UI

If modifying chatbot logic or styling:

Test changes locally (npm run dev)

Confirm chatbot loads via widget script

Push changes to GitHub

Validate functionality on production via Wix

If chatbot stops displaying, verify the widget URL loads:

👉 https://obk-chabot.netlify.app/chatbot-widget.js

If this URL loads successfully, Wix will display it.

----------------------------
📌 Ownership & Maintenance

| Area                 | Maintained By               |
| -------------------- | --------------------------- |
| Codebase             | GitHub Repository           |
| Hosting & Deployment | Netlify                     |
| Website Integration  | Wix                         |
| Content Updates      | OBK team (via dataset JSON) |

--------------------------------------------

🎉 Status: Live, Stable, and Fully Integrated

For improvements or support, follow the instructions outlined above.

💛 Built to support the OBK community.

--------------------------
---

© 2025 — Built and developed by **Ranvitha Chirumamilla**

