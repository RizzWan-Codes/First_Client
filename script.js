const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// Toggle chat window & rotate button
chatToggle.addEventListener("click", () => {
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
  chatToggle.classList.add("rotate");
  setTimeout(() => chatToggle.classList.remove("rotate"), 600);
});

// FAQ buttons → send directly to bot
const faqButtons = document.querySelectorAll(".faq-buttons button");
faqButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const question = btn.innerText;
    appendUserMessage(question);
    sendMessage(question);
  });
});

// Send input message
sendBtn.addEventListener("click", () => {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  appendUserMessage(userMsg);
  chatInput.value = "";

  sendMessage(userMsg);
});

// Append messages functions
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

// 🔥 Talk to backend instead of fake reply
async function sendMessage(message) {
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

// Scroll animations (unrelated but keeping it)
const faders = document.querySelectorAll('.fade-in-element');
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
