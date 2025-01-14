function Body(props) {

  const {inputValue, setInputValue,  submitFunc, warningText, guessesArray, gameResultText, startFunc, disableInput, disableSubmit, disableStart } = props;

  return <section className="game_container">
  <div className="box"><p>Enter a guess between 0 to 100</p></div>
  <div className="box inputBox">
    <input 
    type="number" 
    id="inputNumber" 
    placeholder="Enter a number" 
    min="0" 
    max="100" 
    autoFocus 
    value={inputValue}
    disabled={disableInput}
    onChange={(event) => setInputValue(event.target.value)}
    required/>
    <button id="submitBtn" className="btn" disabled={disableSubmit} onClick={submitFunc}>Submit</button>
  </div>
  <div className="box"><p id="gameResult">{gameResultText}</p></div>
  <div className="box"><p id="guesses">{guessesArray.length > 0 ? `Your Guesses Are :- ${guessesArray.join(",")}` : ""}</p></div>
  <div className="box"><p id="warning">{warningText}</p></div>
  <div className="box"><button id="startGame" className="btn" disabled={disableStart} onClick={startFunc}>Start</button></div>
</section>
}

export default Body;