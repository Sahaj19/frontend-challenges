let inputNumber = document.querySelector("#inputNumber");
let submitBtn = document.querySelector("#submitBtn");
let gameResultText = document.querySelector("#gameResult");
let guessesText = document.querySelector("#guesses");
let startGameBtn = document.querySelector("#startGame");
let warningText = document.querySelector("#warning");

let generatedRandomNumber;
let guessesArray = [];

//generating random number
let randomNumber = () => {
  generatedRandomNumber = Math.floor(Math.random() * 101);
  return generatedRandomNumber;
};

randomNumber();

//gameover functionalities;
let gameOver = (text) => {
  gameResultText.textContent = text;
  inputNumber.disabled = true;
  submitBtn.disabled = true;
  startGameBtn.disabled = false;
};

//too low & too high functionalities
let tooHighTooLow = (text) => {
  if (guessesArray.length < 10) {
    gameResultText.textContent = text;
  } else {
    gameOver(`You lost it! The number was ${generatedRandomNumber}`);
  }
};

//handling warning text
let warningTextResult = (text) => {
  warningText.textContent = text;
}

//handling input
submitBtn.addEventListener("click", function () {
  let inputValue = inputNumber.valueAsNumber;

  if (inputValue < 0 || inputValue > 100) {
    warningTextResult("Please Enter a number from 0 to 100");
    return;
  } else if (Number.isNaN(inputValue)) {
    warningTextResult("Please Enter a valid number");
    return;
  } else {
    warningTextResult("");
  }

  guessesArray.push(inputValue);

  if (inputValue == generatedRandomNumber) {
    gameOver("You got it! congrats");
  } else if (inputValue < generatedRandomNumber) {
    tooHighTooLow("Too Low!");
  } else {
    tooHighTooLow("Too High!");
  }

  guessesText.textContent = `Your guesses are ${guessesArray.join(",")}`;
});

//restarting the game
startGameBtn.addEventListener("click", function () {
  randomNumber();
  guessesArray = [];
  gameResultText.textContent = "";
  guessesText.textContent = "";
  inputNumber.value = "";
  inputNumber.disabled = false;
  submitBtn.disabled = false;
  startGameBtn.disabled = true;
});
