(function () {

  // FIX GHOST WINDOW
  document.querySelectorAll("iframe").forEach(iframe => {
    if (iframe.id !== "obk-chat-window") {
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      iframe.style.height = "0px";
    }
  });

  // 1. Create button
  const button = document.createElement("div");
  button.id = "obk-floating-button";
  button.innerHTML = `... same as before ...`;
  document.body.appendChild(button);

  // 2. Create chat container
  const container = document.createElement("div");
  container.id = "obk-chat-container";
  container.style = "position:fixed; bottom:100px; right:25px; width:380px; height:520px; display:none; ...";
  document.body.appendChild(container);

  // 3. Chat iframe
  const chat = document.createElement("iframe");
  chat.id = "obk-chat-window";
  chat.src = "https://obk-lime.vercel.app/";
  chat.style = "width:100%; height:100%; border:0;";
  container.appendChild(chat);

  // 4. Toggle chat
  let isOpen = false;
  button.onclick = () => {
    isOpen = !isOpen;
    container.style.display = isOpen ? "block" : "none";
  };

})();
