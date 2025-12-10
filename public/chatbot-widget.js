(function () {
  function loadWidget() {
    const script = document.createElement("script");
    script.src = "https://obk-chabot.netlify.app/assets/index.js";
    script.defer = true;
    script.onload = () => {
      console.log("OBK Chatbot Loaded");
      window.ChatbotLoaded = true;
    };
    document.body.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadWidget);
  } else {
    loadWidget();
  }
})();
