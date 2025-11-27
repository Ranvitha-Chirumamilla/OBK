# OBK Chatbot – Floating FAQ Assistant for Our Big Kitchen (OBK)

This project is a **floating FAQ chatbot** built for  
**Our Big Kitchen (OBK) – Australia**.

It appears as a **small button** in the bottom-right corner of a website .  
When someone clicks the button, a **chat window** opens and answers questions about OBK using a FAQ dataset.

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

On the OBK Wix website, we only need to include:

```html
<script src="https://YOUR-NETLIFY-SITE/widget.js"></script>
