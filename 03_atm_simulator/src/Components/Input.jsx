function Input(props) {
  const { atmPin, inputValue, setInputValue, setIsLoggedIn, setMessage, btnDisableState, setBtnDisableState } = props;

  function handleInput() {
    if(inputValue == atmPin) {
      setMessage("Logged In Successfully!");
      setInputValue('');
      setIsLoggedIn(true);
      setBtnDisableState((prev) => ({...prev, checkBalanceBtn : false, depositBtn : false, withdrawnBtn : false, logoutBtn : false, changeAtmPinBtn : false, input : true, submitBtn : true}
      ))
    }else {
      setMessage("Invalid Password. Please Try Again");
      return;
    }
  }

  return <div className="box">
  <input 
  type="number" 
  id="pinInput" 
  placeholder="Enter your Pin"
  value={inputValue}
  onChange={(event) => setInputValue(event.target.value)} 
  disabled={btnDisableState.input}
  autoFocus/>
  <button className="btn" onClick={handleInput} disabled={btnDisableState.submitBtn}>Submit</button>
</div>
}

export default Input;