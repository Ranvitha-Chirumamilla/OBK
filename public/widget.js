(function () {
  try {
    // ---------------------------------------------------------
    // 0. ULTRA-HARD DUPLICATE PREVENTION
    // ---------------------------------------------------------
    if (window.__OBK_WIDGET_LOCK__ || window.top.__OBK_WIDGET_LOCK__) return;

    window.__OBK_WIDGET_LOCK__ = true;
    window.top.__OBK_WIDGET_LOCK__ = true;

    if (
      window.top.document.querySelector("#obk-button") ||
      window.top.document.querySelector("#obk-chat-box")
    ) {
      return;
    }

    // ---------------------------------------------------------
    // 1. FLOATING CHAT BUTTON (OUTSIDE)
    // ---------------------------------------------------------
    const button = window.top.document.createElement("div");
    button.id = "obk-button";
    button.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #F7941D;
      color: white;
      padding: 14px 18px;
      border-radius: 50px;
      font-weight: bold;
      display: flex;
      align-items: center;
      cursor: pointer;
      z-index: 2147483000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      font-family: Arial, sans-serif;
    `;
    button.innerHTML = "💬 How can I help you?";
    window.top.document.body.appendChild(button);

    // ---------------------------------------------------------
    // 2. CHAT CONTAINER (OUTSIDE)
    // ---------------------------------------------------------
    const box = window.top.document.createElement("div");
    box.id = "obk-chat-box";
    box.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 25px;
      width: 380px;
      height: 520px;
      max-height: 80vh;
      background: white;
      border-radius: 14px;
      overflow: hidden;
      z-index: 2147483000;
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
      display: none;
    `;
    window.top.document.body.appendChild(box);

    // ---------------------------------------------------------
    // 3. IFRAME → loads your Vercel chatbot UI
    // ---------------------------------------------------------
    const iframe = window.top.document.createElement("iframe");
    iframe.src = "https://obk-lime.vercel.app/";
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      overflow: hidden;
    `;
    box.appendChild(iframe);

    // ---------------------------------------------------------
    // 4. INTERNAL CHAT AUTO-OPEN FIX (NEW)
    // ---------------------------------------------------------
    iframe.addEventListener("load", () => {
      try {
        const idoc = iframe.contentWindow.document;

        // Auto-open ChatWindow by simulating open=true on App.jsx
        const openChat = () => {
          const root = iframe.contentWindow.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        };

        // Hide the inner floating button ALWAYS to avoid ghost button
        const launcher = Array.from(
          idoc.querySelectorAll("button, div, span")
        ).find(
          (el) =>
            el.textContent &&
            el.textContent.toLowerCase().includes("how can i help")
        );

        if (launcher) {
          launcher.style.display = "none";
        }

      } catch (e) {
        console.warn("OBK: iframe injection limited by Wix sandbox.", e);
      }
    });

    // ---------------------------------------------------------
    // 5. OUTER BUTTON OPENS/CLOSES THE WHOLE CHAT WIDGET
    // ---------------------------------------------------------
    let open = false;

    button.onclick = () => {
      open = !open;
      box.style.display = open ? "block" : "none";
    };

    // ---------------------------------------------------------
    // 6. ALLOW INSIDE CHATWINDOW CLOSE BUTTON TO CLOSE OUTER BOX
    // ---------------------------------------------------------
    window.addEventListener("message", (event) => {
      if (event.data === "OBK_CLOSE_CHAT") {
        box.style.display = "none";
        open = false;
      }
    });

  } catch (err) {
    console.error("OBK widget error:", err);
  }
})();
