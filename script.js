"use strict";
const startScreen = document.querySelector("#startScreen");
const questionScreen = document.querySelector("#questionScreen");
const resultsScreen = document.querySelector("#resultsScreen");

const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
});
