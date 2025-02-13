import CurrentPin from "./CurrentPin";
import ChangePin from "./ChangePin";
import Clock from "./Clock";
import Input from "./Input";
import Buttons from "./Buttons";
import Message from "./Message";

function Body(props) {
  const { atmPin, setAtmPin, inputValue, setInputValue, balance, setBalance, message, setMessage, btnDisableState, setBtnDisableState, minutes, seconds, setIsLoggedIn, isLoggedIn, logoutFunc } = props;

  return <section className="container">
  <CurrentPin
    atmPin={atmPin}
  />
  <ChangePin
    btnDisableState={btnDisableState}
    setMessage={setMessage}
    setAtmPin={setAtmPin}
  />
  <Clock
    minutes={minutes}
    seconds={seconds}
    isLoggedIn={isLoggedIn}
  />
  <Input
    atmPin={atmPin}
    inputValue={inputValue}
    setInputValue={setInputValue}
    setMessage={setMessage}
    btnDisableState={btnDisableState}
    setBtnDisableState={setBtnDisableState}
    setIsLoggedIn={setIsLoggedIn}
  />
  <Buttons
    btnDisableState={btnDisableState}
    setMessage={setMessage}
    balance={balance}
    setBalance={setBalance}
    logoutFunc={logoutFunc}
    setIsLoggedIn={setIsLoggedIn}
  />
  <Message
    message={message}
  />
</section>

}

export default Body;