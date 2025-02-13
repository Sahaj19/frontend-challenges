import Header from "./Components/Header";
import Body from "./Components/Body";
import { useState, useEffect } from "react";

function App() {
  const [atmPin, setAtmPin] = useState(1234);
  const [inputValue, setInputValue] = useState('');
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Clock functionality
  const [totalSeconds, setTotalSeconds] = useState(60);

    
  useEffect(() => {
    let timer;

    if (isLoggedIn) {
      setTotalSeconds(60);
      timer = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            logoutFunc();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isLoggedIn]);
  

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

   // Log Out Func
   function logoutFunc() {
    setMessage('Logged Out Successfully!');
    setIsLoggedIn(false);
    setBtnDisableState((prev) => {
      return {...prev, checkBalanceBtn : true, depositBtn : true, withdrawnBtn : true, logoutBtn : true, changeAtmPinBtn : true,
      input : false, submitBtn : false}
    })
  }

  // Disable-Enable Toggling
  const [btnDisableState, setBtnDisableState] = useState({
    checkBalanceBtn : true,
    depositBtn : true,
    withdrawnBtn : true,
    logoutBtn : true,
    changeAtmPinBtn : true,
    input : false,
    submitBtn : false
  })
  
  return <>
    <Header/>
    <Body
      atmPin={atmPin}
      setAtmPin={setAtmPin}
      inputValue={inputValue}
      setInputValue={setInputValue}
      balance={balance}
      setBalance={setBalance}
      message={message}
      setMessage={setMessage}
      btnDisableState={btnDisableState}
      setBtnDisableState={setBtnDisableState}
      minutes={minutes}
      seconds={seconds}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      logoutFunc={logoutFunc}
    />
  </>
}

export default App;