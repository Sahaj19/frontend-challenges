import { useState, useEffect } from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";

function App() {
  const [randomNum, setRandomNum] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [warningText, setWarningText] = useState("");
  const [guessesArray, setguessesArray] = useState([]);
  const [gameResultText, setGameResultText] = useState("");

  //toggle states
  const [disableInput, setDisableInput] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [disableStart, setDisableStart] = useState(true);

  //generating random number
  function generatingRandomNum() {
    let num = Math.floor(Math.random() * 101);
    setRandomNum(num);
  }

  useEffect(() => {
    generatingRandomNum();
  }, []);

  //disabling inputs
  function gameOver() {
    setDisableInput(true);
    setDisableSubmit(true);
    setDisableStart(false);
  }

  //start game function
  function startFunc() {
    setDisableInput(false);
    setDisableSubmit(false);
    setDisableStart(true);
    generatingRandomNum();
    setInputValue("");
    setWarningText("");
    setguessesArray([]);
    setGameResultText("");
  }

  //handling submit button
  function submitFunc() {
    let validInputValue = parseFloat(inputValue);
    console.log(randomNum);

    if (Number.isNaN(validInputValue)) {
      setWarningText("Please enter a valid input.");
      return;
    }

    if (validInputValue < 0 || validInputValue > 100) {
      setWarningText("The input should be between 0 and 100.");
      return;
    }

    setWarningText("");

    setguessesArray((prev) => {
      const newGuesses = [...prev, validInputValue];

      if (newGuesses.length === 10 && validInputValue !== randomNum) {
        setGameResultText(`You Lost, The Number was ${randomNum}`);
        gameOver();
      }

      return newGuesses;
    });

    if (inputValue == randomNum) {
      setGameResultText("Congrats! You Win");
      gameOver();
    } else if (inputValue < randomNum) {
      setGameResultText("Too Low!");
    } else {
      setGameResultText("Too High!");
    }
  }

  return (
    <>
      <Header />
      <Body
        inputValue={inputValue}
        setInputValue={setInputValue}
        warningText={warningText}
        guessesArray={guessesArray}
        gameResultText={gameResultText}
        submitFunc={submitFunc}
        startFunc={startFunc}
        disableInput={disableInput}
        disableSubmit={disableSubmit}
        disableStart={disableStart}
      />
    </>
  );
}

export default App;
