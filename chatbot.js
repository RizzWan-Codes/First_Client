// ===== Elements =====
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// ===== Predefined Q&A =====
const predefinedQA = {
  "What are your opening hours?": "We are open from 11 AM to 11 PM every day.",
  "Do you have vegetarian options?": "Yes! We have a variety of delicious vegetarian burgers.",
  "Where are you located?": "We are at E1/7, Town Center, Zone A, Ward No.1, CIDCO (Prozone Mall area), Aurangabad – 431009.",
  "Do you deliver?": "Absolutely! You can order through Zomato, Swiggy or Magicpin(New).",
  "What payment methods do you accept?": "We accept cash, cards, and UPI",
  "Do you have gluten-free options?": "Yes, we have select gluten-free buns available.",
  "How long does delivery take?": "Depends on the platform from which you ordered and your location",
  "Can I customize my burger?": "Yes! You can add or remove toppings as you like.",
  "Do you have combo offers?": "Yes! Check our menu for the latest combo offers."
};

// ===== Toggle chat window & rotate button =====
chatToggle.addEventListener("click", () => {
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
  chatToggle.classList.add("rotate");
  setTimeout(() => chatToggle.classList.remove("rotate"), 600);
});

// ===== FAQ buttons → send directly to bot =====
const faqButtons = document.querySelectorAll(".faq button");
faqButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const question = btn.innerText;
    appendUserMessage(question);
    sendMessage(question);
  });
});

// ===== Send input message =====
sendBtn.addEventListener("click", () => {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  appendUserMessage(userMsg);
  chatInput.value = "";
  sendMessage(userMsg);
});

// ===== Send on Enter key =====
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// ===== Append messages functions =====
function appendBotMessage(msg) {
  const div = document.createElement("div");
  div.className = "bot-message";
  div.innerText = msg;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendUserMessage(msg) {
  const div = document.createElement("div");
  div.className = "user-message";
  div.innerText = msg;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// ===== Talk to backend or predefined Q&A =====
async function sendMessage(message) {
  // Check predefined questions first
  if (predefinedQA[message]) {
    appendBotMessage(predefinedQA[message]);
    return;
  }

  // Otherwise, call your AI backend
  try {
    const response = await fetch("https://globurg-ai-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    appendBotMessage(data.reply || "⚠️ No reply from server");
  } catch (error) {
    appendBotMessage("❌ Oops! Something went wrong with the server.");
    console.error(error);
  }
}

