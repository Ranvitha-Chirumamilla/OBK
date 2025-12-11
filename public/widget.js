(function () {

  // ---------------------------------------------
  // 0. Remove ONLY Wix's blank ghost iframe
  // ---------------------------------------------
  document.querySelectorAll("iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src") || "";

    // HIDE ONLY EMPTY + PARASTORAGE IFRAMES (Wix internal)
    if (
      src.trim() === "" ||
      src.includes("parastorage") ||
      iframe.style.visibility === "hidden"
    ) {
      iframe.style.display = "none";
    }
  });

  // ---------------------------------------------
  // 1. Create Floating Button
  // ---------------------------------------------
  const button = document.createElement("div");
  button.id = "obk-floating-button";
  button.innerHTML = `
    <div style="
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #F7941D;
      color: white;
      font-weight: bold;
      padding: 14px 18px;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 2147483000;
      font-family: Arial, sans-serif;
    ">
      <svg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' width='26px' height='26px' style='margin-right: 10px;'>
        <path d="M12 3C6.486 3 2 6.589 2 11c0 2.038 1.006 3.893 2.682 5.293-.189.889-.703 2.408-2.535 3.558-.3.195-.416.587-.271.927.146.34.512.52.874.44 2.59-.577 4.518-1.686 5.592-2.407C10.312 18.927 11.143 19 12 19c5.514 0 10-3.589 10-8s-4.486-8-10-8z"/>
      </svg>
      How can I help you?
    </div>
  `;
  document.body.appendChild(button);

  // ---------------------------------------------
  // 2. Chat Container
  // ---------------------------------------------
  const container = document.createElement("div");
  container.id = "obk-chat-container";
  container.style.position = "fixed";
  container.style.bottom = "100px";
  container.style.right = "25px";
  container.style.width = "380px";
  container.style.height = "520px";
  container.style.maxHeight = "80vh";
  container.style.borderRadius = "14px";
  container.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
  container.style.zIndex = "2147483000";
  container.style.display = "none";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  // ---------------------------------------------
  // 3. Chatbot Iframe (REAL iframe)
  // ---------------------------------------------
  const chat = document.createElement("iframe");
  chat.id = "obk-chat-window";
  chat.src = "https://obk-lime.vercel.app/";
  chat.style.width = "100%";
  chat.style.height = "100%";
  chat.style.border = "0";
  chat.style.display = "block";
  container.appendChild(chat);

  // ---------------------------------------------
  // 4. Toggle Chatbot
  // ---------------------------------------------
  let isOpen = false;
  button.onclick = () => {
    isOpen = !isOpen;
    container.style.display = isOpen ? "block" : "none";
  };

})();
