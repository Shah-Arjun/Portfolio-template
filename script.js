//----------------- for google sheet
const scriptURL =
  "https://script.google.com/macros/s/AKfycbx-TYYEME202eqBjm2hV8gMAr9s-9SgaLWaYEzHV37Tpbv6ByVOEysIDSj2yBzTksAu/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.alert = "Message sent successfully";
      setTimeout(function () {
        //after 5 miliseconds the msg will dissapear/empty
        msg.innerHTML = "";
      }, 500);
      form.reset(); //reset the form after submit/ makes empty form
    })
    .catch((error) => console.error("Error!", error.message));
});

// -----------------for about me section tab
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

//--------------for navbar in small screen
var sidemenu = document.getElementById("sidemenu");

function openMenu() {
  //opens the nav links on clicking menu bar
  sidemenu.style.right = "0"; // sidemenu ko style css ko right property ma 0 hal
}

function closeMenu(navlinks) {
  //closes the nav links on clicking -> X
  sidemenu.style.right = "-200px"; // sidemenu ko style css ko right property ma -200px hal
}

//---------------EmaiJS functionality
function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_eccgofv";
  const templateID = "template_efcn76c";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value;
      console.log(res);
      alert("Your message has been submitted successfully.");
    })
    .catch((err) => console.log(err));
}





// -----------------for chatbot
// Elements
const chatIcon = document.getElementById("chat-icon");
const chatContainer = document.getElementById("chat-container");
const closeBtn = document.getElementById("close-btn");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Toggle chat visibility
chatIcon.addEventListener("click", () => (chatContainer.style.display = "flex"))
closeBtn.addEventListener("click", () => (chatContainer.style.display = "none"))

// FAQ Bot Data , for testing , to be aaded more que-ans.
const faqs = [
  {
    patterns: ["who are you", "yourself", "introduce", "name", "introduction"],
    responses: [
      "I'm Arjun Shah, a CSIT student and aspiring web & mobile app developer!",
      "Hey! I'm Arjun, passionate about coding and building projects.",
    ],
  },
  {
    patterns: ["projects", "what have you built", "portfolio", "what have you done"],
    responses: [
      "I have built apps like a Calculator App, Family Record App, and Quiz App.",
      "Check out my projects: Calculator, Family Record, and Quiz applications!",
    ],
  },
  {
    patterns: ["technologies", "skills", "tech stack", "programming", "programs", "language"],
    responses: [
      "I work with HTML, CSS, JavaScript, React, Node.js, and Flutter.",
      "My main tech stack includes React for web and Flutter for mobile apps.",
    ],
  },
  {
    patterns: ["contact", "reach you", "email", "linkdin", "github"],
    responses: [
      "You can reach me at arjun.079csit05@godawari.edu.np or connect with me on LinkedIn - Arjun Shah.",
      "Feel free to contact me via email or LinkedIn anytime!",
    ],
  },
  {
    patterns: ["learn coding", "help me", "teach coding", "how to learn codeing", "Which language is best"],
    responses: [
      "Absolutely! I share coding tips and resources on my portfolio and LinkedIn.",
      "Sure! I love helping beginners get started with coding.",
    ],
  },
];

// Append message
function appendMessage(sender, text) {                                 // sender -> tells who sent the message (user or bot) , textt -> actual message constent
  const msgDiv = document.createElement("div");                          // makes a new div 
  msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";        // identify id sender is user or bot and set div class
  msgDiv.textContent = text;                                           // put actual message inside the box
  chatBox.appendChild(msgDiv);                                        // adds the new message box into the chat area (chatBox).
  chatBox.scrollTop = chatBox.scrollHeight;                            // chat box automatically scroll down so the latest message is visible.
}

// Bot response
function getBotResponse(input) {
  input = input.toLowerCase();
  for (let faq of faqs) {
    for (let pattern of faq.patterns) {
      if (input.includes(pattern)) {
        return faq.responses[Math.floor(Math.random() * faq.responses.length)];
      }
    }
  }
  const fallback = [
    "Sorry, I didn't understand that. Try asking differently!",
    "Hmm, not sure about that. Ask me about my projects or skills.",
    "I'm learning every day! Ask me something else.",
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
}

// Send event
sendBtn.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (!input) return;
  appendMessage("user", input);
  appendMessage("bot", getBotResponse(input));
  userInput.value = "";
});

// Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
