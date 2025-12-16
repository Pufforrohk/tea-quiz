const pictures = [
  { src: "images/01.jpg", title: "Anastasia", label: "Black tea with natural bergamot, lemon and orange blossom flavors" },
  { src: "images/02.jpg", title: "AquaSummer", label: "Peach, hibiscus, apricot" },
  { src: "images/03.jpg", title: "Tropical White", label: "Mango and passion fruit flavored white tea" },
  { src: "images/04.jpg", title: "Green ginger-lemon", label: "Ginger-lemon flavored green tea" },
  { src: "images/05.jpg", title: "Vanilla Rooibos", label: "Vanilla flavored herbal tea" },
  { src: "images/06.jpg", title: "Le Dessert", label: "Green tea with natural apple, almond and vanilla flavouring" },
  { src: "images/07.jpg", title: "Kashmir Tchai", label: "Flavored blend of black tea and spices" },
  { src: "images/09.jpg", title: "Sleep Ritual", label: "Rooibos, verbena, natural mango flavor" },
  { src: "images/10.jpg", title: "Green Jasmine", label: "Green tea with natural jasmine flavor" },
  { src: "images/11.jpg", title: "Tsarevna", label: "Blend of black tea with natural orange and spices flavors" },
  { src: "images/13.jpg", title: "AquaExotica", label: "Exotic fruit flavored blend of hibiscus and apple" },
  { src: "images/14.jpg", title: "Four Red Fruits", label: "Black tea with natural berry flavors" },
  { src: "images/15.jpg", title: "Immune Defense Ritual", label: "Mate, green tea, acerola cherry, natural orange and tropical fruit flavors" },
  { src: "images/16.jpg", title: "White Anastasia ", label: "Bergamot and orange blossom flavored white tea" },
];

let currentQuestion = 1;
let score = 0;
let repeat = [];
let answersA = [];
let correctA = [];
let N = 5;

function loadRandomQuestion() {

  if (currentQuestion > N) {
    showFinalScreen();
    return;
  }

  const img = document.getElementById("quizImage");
  const optionsDiv = document.getElementById("options");

  let correct = {}
  do {
    correct = pictures[Math.floor(Math.random() * pictures.length)];
  } while((repeat.includes(correct.src)));

  img.src = correct.src;
  repeat.push(correct.src);

  const wrongLabels = pictures
    .filter(p => p.label !== correct.label)
    .map(p => p.label);

  const wrongChoices = wrongLabels.sort(() => Math.random() - 0.5).slice(0, 3);
  const allChoices = [correct.label, ...wrongChoices].sort(() => Math.random() - 0.5);

  document.getElementById("questionNumber").textContent =
    "Question " + currentQuestion + " of " + N;

  optionsDiv.innerHTML = "";
  allChoices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === correct.label) {
        score++;
      }
      correctA.push(correct);
      answersA.push(choice);
      currentQuestion++;
      loadRandomQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function showFinalScreen() {
  const container = document.querySelector(".container");

  let cards = "";
  for (let i = 0; i < answersA.length; i++) {
    const isCorrect = answersA[i] === correctA[i].label;

    cards += `
      <div class="answer-card ${isCorrect ? "correct" : "wrong"}">
        <img src="${correctA[i].src}" class="thumb-card" onclick="openPopup('${correctA[i].src}')">
        <div>
          <p><strong>Your answer:</strong> ${answersA[i]}</p>
          <p><strong>Correct answer:</strong> ${correctA[i].label}</p>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <h1>Congratulations!</h1>
    <p>Your score: <strong>${score} / ${N}</strong></p>
    ${cards}
    <button onclick="restartQuiz()">Play Again</button>

    <div id="popupOverlay" class="popup-overlay" onclick="closePopup()">
      <img id="popupImage" class="popup-image">
    </div>
  `;
}

function openPopup(src) {
  const overlay = document.getElementById("popupOverlay");
  const popupImg = document.getElementById("popupImage");
  popupImg.src = src;
  overlay.style.display = "flex";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}

function restartQuiz() {
  score = 0;
  currentQuestion = 1;
  repeat = [];
  answersA = [];
  correctA = [];
  location.reload();
}

window.onload = loadRandomQuestion;
