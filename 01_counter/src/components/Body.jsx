function Body(props) {
  const { counter, setCounter, inputValue, setInputValue, reset } = props;

  //input validation
  const validateInput = (value) => {
    value = parseFloat(value);
    if(value < 0 || Number.isNaN(value)) {
      setInputValue(1);
    }else {
      setInputValue(value)
    }
  }

  //buttons controls
  const increment = () => {
    setCounter((prevcounter) => (parseFloat(prevcounter) + parseFloat(inputValue)).toFixed(2))
  }

  const decrement = () => {
    setCounter((prevcounter) => (parseFloat(prevcounter) - parseFloat(inputValue)).toFixed(2))
  }

  //html body
  return (
    <section className="counter_container">
      <div className="box"><h2 id="counter">{counter}</h2></div>
      <div className="box">
        <button onClick={decrement} className="control_btn">-</button>
        <button onClick={increment} className="control_btn">+</button>
      </div>
      <div className="box">
        <h3>Increment/Decrement by &nbsp;<input type="number" value={inputValue} min="0" max="10" onChange={(event) => validateInput(event.target.value)} /></h3>
      </div>
      <div className="box"><button onClick={reset} id="rest_btn">Reset</button></div>
    </section>
  );
}

export default Body;
