// ====== Elements ======
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// ====== Predefined Q&A ======
const predefinedQA = {
  "opening hours": "We are open from 11 AM to 11 PM every day.",
  "vegetarian options": "Yes! We have a variety of delicious vegetarian burgers.",
  "location": "We are at E1/7, Town Center, Zone A, Ward No.1, CIDCO (Prozone Mall area), Aurangabad – 431009.",
  "deliver": "Absolutely! You can order through zomato, swiggy or Magicpin(New).",
  "payment methods": "We accept cash, cards and UPI.",
  "gluten-free": "Yes, we have select gluten-free buns available.",
  "delivery time": "Depends on the platform from which you order and your location.",
  "customize burger": "Yes! You can add or remove toppings as you like.",
  "combo offers": "Yes! Check our menu for the latest combo offers."
};

// ====== Toggle chat window ======
chatToggle.addEventListener("click", () => {
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
  chatToggle.classList.add("rotate");
  setTimeout(() => chatToggle.classList.remove("rotate"), 600);
});

// ====== Append message helpers ======
function appendBotMessage(msg){
  const div = document.createElement("div");
  div.className = "bot-message";
  div.innerText = msg;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendUserMessage(msg){
  const div = document.createElement("div");
  div.className = "user-message";
  div.innerText = msg;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// ====== Send message ======
async function sendMessage(message){
  const formattedMsg = message.toLowerCase().replace(/[?.!]/g, "").trim();

  // Check predefined QA first
  for(const key in predefinedQA){
    if(formattedMsg.includes(key)){
      appendBotMessage(predefinedQA[key]);
      return;
    }
  }

  // Otherwise, call AI backend
  appendBotMessage("Typing... ⏳");
  try {
    const res = await fetch("https://globurg-ai-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    // Replace "Typing..." with AI reply
    chatBody.lastChild.innerText = data.reply || "⚠️ No reply from server";
  } catch(err){
    chatBody.lastChild.innerText = "❌ Oops! Something went wrong with the server.";
    console.error(err);
  }
}

// ====== Send button click ======
sendBtn.addEventListener("click", () => {
  const userMsg = chatInput.value.trim();
  if(!userMsg) return;
  appendUserMessage(userMsg);
  chatInput.value = "";
  sendMessage(userMsg);
});

// ====== Enter key sends message ======
chatInput.addEventListener("keydown", e => {
  if(e.key === "Enter") sendBtn.click();
});

// ====== FAQ buttons click ======
const faqButtons = document.querySelectorAll(".faq button");
faqButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const question = btn.innerText.replace(/[?.!]/g, "").trim();
    appendUserMessage(question);
    sendMessage(question);
  });
});

