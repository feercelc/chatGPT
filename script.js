// Quiz
const quizButtons = document.querySelectorAll(".q-btn");
const quizResult = document.getElementById("quiz-result");


quizButtons.forEach(btn => {
btn.addEventListener("click", () => {
const result = btn.getAttribute("data-result");


let msg = "";
if (result === "luz") msg = "Você desbloqueou a Dimensão Brilhante!✨";
if (result === "sombras") msg = "Você entrou na Dimensão das Sombras… 🌑";
if (result === "caos") msg = "Bem-vindo ao Caos Colorido! 🌈🔥";


quizResult.textContent = msg;
quizResult.classList.remove("hidden");
});
});


// Escolhas de caminhos
const choices = document.querySelectorAll(".choice");
const finais = document.querySelectorAll(".final");


choices.forEach(choice => {
choice.addEventListener("click", () => {
const target = choice.getAttribute("data-target");


finais.forEach(fin => fin.classList.add("hidden"));


document.getElementById(target).classList.remove("hidden");
});
});