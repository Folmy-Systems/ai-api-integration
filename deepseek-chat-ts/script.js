document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const apiKeyInput = document.querySelector(".api-key-input");
  const saveApiKeyButton = document.querySelector(".save-api-key");
  const errorMessage = document.getElementById("error-message");

  let apiKey = localStorage.getItem("deepseek-api-key");
  if (apiKey) {
    apiKeyInput.value = "••••••••••••••••";
  }

  saveApiKeyButton.addEventListener("click", function () {
    const key = apiKeyInput.value.trim();
    if (key && !key.startsWith("••••")) {
      apiKey = key;
      localStorage.setItem("deepseek-api-key", key);
      apiKeyInput.value = "••••••••••••••••";
      hideError();
    }
  });

  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }

    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  sendButton.addEventListener("click", sendMessage);

  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    if (!apiKey) {
      showError("Пожалуйста, введите ваш API ключ OpenRouter");
      return;
    }

    addMessage(message, "user");
    chatInput.value = "";
    chatInput.style.height = "auto";

    showTypingIndicator();

    sendToDeepSeekAPI(message);
  }

  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(
      sender === "user" ? "user-message" : "ai-message"
    );
    messageElement.textContent = text;

    chatMessages.appendChild(messageElement);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const typingElement = document.createElement("div");
    typingElement.classList.add("typing-indicator");
    typingElement.id = "typing-indicator";

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.classList.add("typing-dot");
      typingElement.appendChild(dot);
    }

    chatMessages.appendChild(typingElement);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const typingElement = document.getElementById("typing-indicator");
    if (typingElement) {
      typingElement.remove();
    }
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }

  function hideError() {
    errorMessage.style.display = "none";
  }

  async function sendToDeepSeekAPI(message) {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": window.location.href,
            "X-Title": "DeepSeek Chat",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3.1:free",
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
            max_tokens: 2048,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Ошибка API: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      hideTypingIndicator();

      if (data.choices && data.choices.length > 0) {
        const aiResponse = data.choices[0].message.content;
        addMessage(aiResponse, "ai");
      } else {
        throw new Error("Неожиданный формат ответа от API");
      }
    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
      hideTypingIndicator();
      showError(
        `Ошибка: ${error.message}. Проверьте ваш API ключ и попробуйте снова.`
      );
    }
  }
});
