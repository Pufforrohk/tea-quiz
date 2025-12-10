// Add your images and labels here:
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

];
// Quiz state
let currentQuestion = 1;
let score = 0;
let repeat = [];

function loadRandomQuestion() {

  if (currentQuestion > 5) {
    showFinalScreen();
    return;
  }

  const img = document.getElementById("quizImage");
  const optionsDiv = document.getElementById("options");

  // Select random picture
  let correct = {}
  do {
    correct = pictures[Math.floor(Math.random() * pictures.length)];
  } while((repeat.includes(correct.src)));

  img.src = correct.src;
  repeat.push(correct.src);

  // Generate answer choices
  const wrongLabels = pictures
    .filter(p => p.label !== correct.label)
    .map(p => p.label);

  const wrongChoices = wrongLabels.sort(() => Math.random() - 0.5).slice(0, 3);
  const allChoices = [correct.label, ...wrongChoices].sort(() => Math.random() - 0.5);

  // Display the question count
  document.getElementById("questionNumber").textContent =
    "Question " + currentQuestion + " of 5";

  // Generate answer buttons
  optionsDiv.innerHTML = "";
  allChoices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === correct.label) {
        score++;
      }
      currentQuestion++;
      loadRandomQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function showFinalScreen() {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <h1>Congratulations!</h1>
    <p>Your score: <strong>${score} / 5</strong></p>
    <button onclick="restartQuiz()">Play Again</button>
  `;
}

function restartQuiz() {
  score = 0;
  currentQuestion = 1;
  repeat = [];
  location.reload();
}

window.onload = loadRandomQuestion;
