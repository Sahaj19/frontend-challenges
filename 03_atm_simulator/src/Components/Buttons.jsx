function Buttons(props) {
  const { balance, setBalance, setMessage, btnDisableState, logoutFunc } = props;

  // Check Balance Function
  function checkBalanceFunc() {
    setMessage(`Your Current Balance Is Rs. ${balance}`)
  }

  // Deposit Function
  function depositFunc() {
    let depositPrompt = parseInt(prompt("Enter Deposit Amount."));

    if(Number.isNaN(depositPrompt) || !depositPrompt || depositPrompt < 0) {
      setMessage("Invalid Deposit Amount. Please Try Again!");
      return
    }else if(depositPrompt > 1000) {
      setMessage("Maximum Deposit Amount Limit is Rs.1000")
      return
    }else {
      setBalance((prev) => {
        const newBalance = prev + depositPrompt;
        setMessage(`Rs.${depositPrompt} Deposited Successfully. Available Balance Rs.${newBalance}`)
        return newBalance;
      });
    }
  }

  // withdraw Function
  function withdrawFunc() {
    let withdrawPrompt = parseInt(prompt("Enter Withdraw Amount."));

    if(Number.isNaN(withdrawPrompt) || !withdrawPrompt || withdrawPrompt < 0 || withdrawPrompt > balance) {
      setMessage("Invalid withdraw Amount. Please Try Again!");
      return
    }else if(withdrawPrompt > 2000) {
      setMessage("Maximum withdraw Amount Limit is Rs.2000")
      return
    }else {
      setBalance((prev) => {
        const newBalance = prev - withdrawPrompt;
        setMessage(`Rs.${withdrawPrompt} Withdrawn Successfully. Available Balance Rs.${newBalance}`)
        return newBalance;
      });
    }
  }

  return <div className="box">
  <button className="btn" disabled={btnDisableState.checkBalanceBtn} onClick={checkBalanceFunc}>Check Balance</button>
  <button className="btn" disabled={btnDisableState.depositBtn} onClick={depositFunc}>Deposit</button>
  <button className="btn" disabled={btnDisableState.withdrawnBtn} onClick={withdrawFunc}>Withdraw</button>
  <button className="btn" disabled={btnDisableState.logoutBtn} onClick={logoutFunc}>Logout</button>
</div>
}

export default Buttons;