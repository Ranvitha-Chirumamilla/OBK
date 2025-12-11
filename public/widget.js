(function () {
  try {
    // ---------------------------------------------------------
    // 0. ULTRA-HARD DUPLICATE PREVENTION
    // ---------------------------------------------------------
    if (window.__OBK_WIDGET_LOCK__ || window.top.__OBK_WIDGET_LOCK__) {
      return;
    }

    window.__OBK_WIDGET_LOCK__ = true;
    window.top.__OBK_WIDGET_LOCK__ = true;

    // Also guard against DOM duplicates
    if (
      window.top.document.querySelector("#obk-button") ||
      window.top.document.querySelector("#obk-chat-box")
    ) {
      return;
    }

    // ---------------------------------------------------------
    // 1. CREATE BUTTON
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
    // 2. CHAT CONTAINER
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
    // 3. EMBED IFRAME (YOUR VERCEL APP)
    // ---------------------------------------------------------
    const iframe = window.top.document.createElement("iframe");
    iframe.src = "https://obk-lime.vercel.app/";
    iframe.style.cssText = "width:100%;height:100%;border:none;";
    box.appendChild(iframe);

    // When iframe loads, auto-open the internal chat
    iframe.addEventListener("load", () => {
      try {
        const idoc = iframe.contentWindow.document;

        // Find the inner launcher that says "How can I help"
        const launcher = Array.from(
          idoc.querySelectorAll("button, div, span")
        ).find(
          (el) =>
            el.textContent &&
            el.textContent.toLowerCase().includes("how can i help")
        );

        if (launcher) {
          // Click it to open the chat window
          launcher.click();
          // Hide the inner launcher so we don't see button-inside-button
          launcher.style.display = "none";
        }
      } catch (e) {
        console.error("OBK widget: failed to auto-open inner chat", e);
      }
    });

    // ---------------------------------------------------------
    // 4. OPEN / CLOSE LOGIC FOR OUTER BUTTON
    // ---------------------------------------------------------
    let open = false;
    button.onclick = () => {
      open = !open;
      box.style.display = open ? "block" : "none";
    };
  } catch (err) {
    console.error("OBK widget error:", err);
  }
})();
