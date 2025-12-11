(function () {
  try {
    // ---------------------------------------------------------
    // 0. GUARDED SINGLE EXECUTION (COVERS MULTIPLE IFRAMES)
    // ---------------------------------------------------------
    if (window.top.__OBK_WIDGET_ACTIVE__) {
      console.log("OBK Chatbot already active in top frame – skipping duplicate");
      return;
    }
    window.top.__OBK_WIDGET_ACTIVE__ = true;

    // ---------------------------------------------------------
    // 1. CLEAN UP ANY EXISTING ELEMENTS (PREVENT GHOST WINDOWS)
    // ---------------------------------------------------------
    const removeOld = () => {
      const els = window.top.document.querySelectorAll("#obk-chat-box, #obk-button");
      els.forEach((el) => el.remove());
    };
    removeOld();

    // ---------------------------------------------------------
    // 2. CREATE BUTTON
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
    // 3. CHAT CONTAINER
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
    // 4. EMBED IFRAME SAFELY
    // ---------------------------------------------------------
    const iframe = window.top.document.createElement("iframe");
    iframe.src = "https://obk-lime.vercel.app/";
    iframe.style.cssText = "width:100%;height:100%;border:none;";
    box.appendChild(iframe);

    // ---------------------------------------------------------
    // 5. TOGGLE LOGIC
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
