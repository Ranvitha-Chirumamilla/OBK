(function () {
  try {
    // ---------------------------------------------------------
    // 0. STOP DUPLICATES
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
    // 1. OUTER FLOATING BUTTON
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
    // 2. OUTER CHAT BOX
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
    // 3. IFRAME to load Vercel chatbot
    // ---------------------------------------------------------
    const iframe = window.top.document.createElement("iframe");
    iframe.src = "https://obk-lime.vercel.app/";
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;
    box.appendChild(iframe);

    // ---------------------------------------------------------
    // 4. INSIDE IFRAME CLEANUP — remove ghost button
    // ---------------------------------------------------------
    iframe.addEventListener("load", () => {
      try {
        const idoc = iframe.contentWindow.document;

        // Hide inner floating button always
        const launcher = Array.from(
          idoc.querySelectorAll("button, div, span")
        ).find(
          el =>
            el.textContent &&
            el.textContent.toLowerCase().includes("how can i help")
        );

        if (launcher) launcher.style.display = "none";

      } catch (e) {
        console.warn("OBK widget: Cannot modify iframe due to Wix sandbox.", e);
      }
    });

    // ---------------------------------------------------------
    // 5. BUTTON LOGIC — open/close full widget
    // ---------------------------------------------------------
    let open = false;

    button.onclick = () => {
      open = !open;
      box.style.display = open ? "block" : "none";
    };

    // ---------------------------------------------------------
    // 6. LISTEN FOR CLOSE SIGNAL FROM INSIDE CHAT WINDOW
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
