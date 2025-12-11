(function () {

  // --------------------------------------------------------
  // 0. PREVENT MULTIPLE LOADS
  // --------------------------------------------------------
  if (window.__obkChatLoaded) {
    console.log("OBK Chatbot already loaded — skipping duplicate load");
    return;
  }
  window.__obkChatLoaded = true;

  // --------------------------------------------------------
  // 1. CREATE BUTTON
  // --------------------------------------------------------
  const button = document.createElement("div");
  button.id = "obk-button";
  button.style = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    z-index: 2147483000;
    background: #F7941D;
    color: white;
    font-weight: bold;
    padding: 14px 18px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    font-family: Arial, sans-serif;
  `;
  button.innerHTML = "💬  How can I help you?";
  document.body.appendChild(button);

  // --------------------------------------------------------
  // 2. CREATE CHAT CONTAINER
  // --------------------------------------------------------
  const box = document.createElement("div");
  box.id = "obk-chat-box";
  box.style = `
    position: fixed;
    bottom: 100px;
    right: 25px;
    width: 380px;
    height: 520px;
    max-height: 80vh;
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    z-index: 2147483000;
    display: none;
  `;
  document.body.appendChild(box);

  // --------------------------------------------------------
  // 3. ADD IFRAME
  // --------------------------------------------------------
  const iframe = document.createElement("iframe");
  iframe.src = "https://obk-lime.vercel.app/";
  iframe.style = "width: 100%; height: 100%; border: none;";
  box.appendChild(iframe);

  // --------------------------------------------------------
  // 4. OPEN / CLOSE LOGIC
  // --------------------------------------------------------
  let open = false;
  button.onclick = () => {
    open = !open;
    box.style.display = open ? "block" : "none";
  };

})();
