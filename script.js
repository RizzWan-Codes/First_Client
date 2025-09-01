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

// FAQ buttons
const faqButtons = document.querySelectorAll(".faq-buttons button");
faqButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.dataset.answer;
    appendBotMessage(answer);
  });
});

// Send input message
sendBtn.addEventListener("click", () => {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  appendUserMessage(userMsg);
  chatInput.value = "";

  // Optional auto-response
  setTimeout(() => {
    appendBotMessage("🍔 Globurg Bot: Hmm, I don't know that yet.");
  }, 500);
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


// Select all fade-in elements
const faders = document.querySelectorAll('.fade-in-element');

const appearOptions = {
  threshold: 0.1, // how much of the element is visible
  rootMargin: "0px 0px -50px 0px" // trigger a bit earlier
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop observing once visible
    }
  });
}, appearOptions);

// Attach observer to all fade-in elements
faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
