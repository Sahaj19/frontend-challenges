import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  const reset = () => {
    setCounter(0);
    setInputValue(1)
  }


  return <>
    <Header/>
    <Body 
      counter={counter}
      setCounter={setCounter}
      inputValue={inputValue}
      setInputValue={setInputValue}
      reset={reset}
    />
  </>
}

export default App;