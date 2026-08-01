"use strict";
const startScreen = document.querySelector("#startScreen");
const questionScreen = document.querySelector("#questionScreen");
const resultsScreen = document.querySelector("#resultsScreen");
const subtitle = document.querySelector(".subtitle");
const questionNum = document.querySelector("#questionNum");
const startBtn = document.querySelector("#startBtn");

const questionText = document.querySelector("#questionText");
const optionsContainer = document.querySelector("#optionsContainer");
const scoreDisplay = document.querySelector("#scoreDisplay");

const totalQuestions = document.querySelector("#totalQuestions");
const finalScore = document.querySelector("#finalScore");
const resultLabel = document.querySelector("#resultLabel");
const resultMsg = document.querySelector("#resultMsg");

let currentQuestion = 0;
let score = 0;

const questionsArr = [
  {
    question: `What is the result of <code>typeof null</code> in JavaScript?`,
    options: {
      a: '"null"',
      b: '"undefined"',
      c: '"object"',
      d: '"number"',
    },
    answer: "c",
    description: `In JavaScript, typeof null returns <code>"object"</code> due to a legacy bug from the initial implementation of the language where null was represented as a null pointer.`,
  },
  {
    question:
      "Which keyword declares a block-scoped variable that cannot be reassigned?",
    options: {
      a: "var",
      b: "let",
      c: "const",
      d: "static",
    },
    answer: "c",
    description:
      "<code>const</code> creates block-scoped bindings that cannot be reassigned after declaration.",
  },
  {
    question: `What will <code>console.log(1 + "2" + 3)</code> output?`,
    options: {
      a: '"6"',
      b: '"123"',
      c: "6",
      d: '"15"',
    },
    answer: "b",
    description: `Operations execute left-to-right. <code>1 + "2"</code> results in string concatenation <code>"12"</code>, and <code>"12" + 3</code> yields <code>"123"</code>.`,
  },
  {
    question:
      "Which array method creates a new array filled with the results of calling a function on every element?",
    options: {
      a: ".forEach()",
      b: ".filter()",
      c: ".map()",
      d: ".reduce()",
    },
    answer: "c",
    description:
      "<code>.map()</code> returns a new transformed array without mutating the original array, unlike <code>.forEach()</code> which returns <code>undefined</code>.",
  },
  {
    question:
      "What does the strict equality operator (<code>===</code>) check?",
    options: {
      a: "Values only, performing implicit type conversion",
      b: "Both value and data type without type conversion",
      c: "Object reference memory address only",
      d: "String length equivalence",
    },
    answer: "b",
    description:
      "Unlike <code>==</code>, <code>===</code> ensures both operands have identical types before comparing values.",
  },
  {
    question: `What will <code>Boolean("")</code> evaluate to?`,
    options: {
      a: "true",
      b: "false",
      c: "null",
      d: "undefined",
    },
    answer: "b",
    description:
      'An empty string <code>""</code> is a falsy value in JavaScript, so <code>Boolean("")</code> evaluates to <code>false</code>.',
  },
  {
    question:
      "Which DOM method returns the first element matching a specified CSS selector?",
    options: {
      a: "document.getElementById()",
      b: "document.querySelectorAll()",
      c: "document.querySelector()",
      d: "document.getElementsByClassName()",
    },
    answer: "c",
    description:
      "<code>document.querySelector()</code> searches the DOM tree and returns the first matching Element node.",
  },
  {
    question: "What is a closure in JavaScript?",
    options: {
      a: "A function bound to its outer lexical environment",
      b: "A method that closes network connections",
      c: "A syntax statement for terminating a loop",
      d: "An instantly invoked anonymous function",
    },
    answer: "a",
    description:
      "Closures allow inner functions to retain access to variables defined in their outer lexical scope even after the outer function has returned.",
  },
  {
    question: `What will <code>console.log(0.1 + 0.2 === 0.3)</code> print?`,
    options: {
      a: "true",
      b: "false",
      c: "NaN",
      d: "TypeError",
    },
    answer: "b",
    description:
      "Due to binary floating-point representation (IEEE 754), <code>0.1 + 0.2</code> evaluates to <code>0.30000000000000004</code>, making the strict comparison <code>false</code>.",
  },
  {
    question:
      "Which method converts a JavaScript object or value into a JSON string?",
    options: {
      a: "JSON.parse()",
      b: "JSON.stringify()",
      c: "Object.toString()",
      d: "String.toJSON()",
    },
    answer: "b",
    description:
      "<code>JSON.stringify()</code> serializes JavaScript data structures into JSON strings for transmission or storage.",
  },
];

subtitle.textContent = `${questionsArr.length} questions · Multiple choice`;

const dynamicHtmlQuestions = function () {
  questionNum.innerHTML = `Question ${currentQuestion + 1} of ${questionsArr.length} `;
  questionText.innerHTML = `${questionsArr[currentQuestion].question}`;
  const optionHtml = Object.entries(questionsArr[currentQuestion].options)
    .map(
      ([key, value]) =>
        `<button class="option-btn" data-option="${key}">${value}</button>`,
    )
    .join("");
  optionsContainer.innerHTML = optionHtml;
};
const dynamicHtmlResult = function () {
  const percentage = (score / questionsArr.length) * 100;
  finalScore.innerHTML = score;
  totalQuestions.innerHTML = questionsArr.length;
  resultLabel.innerHTML =
    percentage >= 90
      ? "Absolute JS Wizard 🧙‍♂️"
      : percentage >= 70
        ? "Certified Nerd, We Love That 🤓"
        : percentage >= 50
          ? "Solid Effort, Google Was Almost Not Needed 👍"
          : percentage >= 30
            ? "console.log(you) Says Try Again 😅"
            : "It's Okay, JS Confuses Everyone Sometimes 💜";
  resultMsg.innerHTML = `You answered ${score} questions correctly.`;
};

startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  dynamicHtmlQuestions();
});

let isClicked = false;

optionsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("option-btn")) {
    if (!isClicked) {
      isClicked = true;

      // Correct Option
      const correctOption = document.querySelector(
        `[data-option="${questionsArr[currentQuestion].answer}"]`,
      );

      if (questionsArr[currentQuestion].answer === e.target.dataset.option) {
        correctOption.classList.add("correct");
        score++;
        scoreDisplay.innerHTML = `Score: ${score}`;
      } else {
        e.target.classList.add("wrong");
        correctOption.classList.add("correct");
      }
    } else {
      return;
    }

    if (currentQuestion < questionsArr.length - 1) {
      currentQuestion++;
      setTimeout(() => {
        isClicked = false;
        dynamicHtmlQuestions();
      }, 2000);
    } else {
      dynamicHtmlResult();
      setTimeout(() => {
        questionScreen.classList.add("hidden");
        resultsScreen.classList.remove("hidden");
      }, 2000);
    }
  }
});
