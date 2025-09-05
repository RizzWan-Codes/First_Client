const chatIcon = document.getElementById("chatToggle");
const chatWidget = document.getElementById("chatWindow");

chatIcon.addEventListener("click", () => {
  chatWidget.style.display = chatWidget.style.display === "flex" ? "none" : "flex";
});

document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("chatInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userInput = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBody");
  const message = userInput.value.trim();

  if (!message) return;

  chatBox.innerHTML += `<div class="user-message">${message}</div>`;
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // 🔥 Replace with your actual Render backend URL
    const response = await fetch("https://Globurg-AI-Backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    chatBox.innerHTML += `<div class="bot-message">${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<div class="bot-message error">Oops! Something went wrong!</div>`;
  }
}
