function ChangePin(props) {
  const { btnDisableState, setMessage, setAtmPin } = props;

  // Change ATM Pin Function
  function changePinFunc() {
    let pinPrompt = parseInt(prompt("Enter a new 4-digit Atm Pin"));

    if(Number.isNaN(pinPrompt) || pinPrompt.toString().length > 4 || !pinPrompt) {
      setMessage("Please Enter a Valid Atm Pin. Please Try Again");
      return;
    }else {
      setAtmPin(pinPrompt);
      setMessage("Logged In Successfully Using New Atm Pin.");
      return;
    }
  }

  return <div className="box">
  <button className="btn" disabled={btnDisableState.changeAtmPinBtn} onClick={changePinFunc}>Change Atm Pin</button>
  </div>
}

export default ChangePin;