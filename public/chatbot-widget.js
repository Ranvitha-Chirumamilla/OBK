(function () {
  // load the compiled app bundle
  const script = document.createElement("script");
  script.src = "https://obk-chabot.netlify.app/assets/index.js";
  script.defer = true;

  script.onload = () => {
    console.log("OBK chatbot bundle loaded");

    // Try initializing repeatedly until function exists
    const tryInit = setInterval(() => {
      if (window.initObkChatbot) {
        console.log("Running chatbot init...");
        window.initObkChatbot();
        clearInterval(tryInit);
      }
    }, 300);
  };

  document.body.appendChild(script);
})();
