import { useState, useRef, useEffect } from "react";

function App() {
  const Otp_Boxes = 5;
  const [otpArray, setOtpArray] = useState(new Array(Otp_Boxes).fill(''))
  const otpInputRef = useRef([]);

  // Initial Loading Behaviour
  useEffect(() => {
    otpInputRef.current[0]?.focus();
  },[])

  // otp change handler
  const handleChange = (otpValue, index) => {
    if(isNaN(otpValue)) return;

    const newOtpValue = otpValue.trim();
    const newOtpArray = [...otpArray];
    newOtpArray[index] = newOtpValue.slice(-1);
    setOtpArray(newOtpArray);

    if(newOtpValue) {
      otpInputRef.current[index + 1]?.focus()
    }
  }

  // backspace handler
  const handleKeyDown = (e,index) => {
    if(e.key === "Backspace" && !otpInputRef.current[index]?.value) {
      otpInputRef.current[index-1]?.focus();
    }
  }

  return (
    <>
      <h1>Otp Input</h1>
      <div className="container">
        {otpArray.map((otpValue, index) => {
          return (
            <input 
              key={index} 
              type="text" 
              value={otpValue} 
              ref={(otpValue) => otpInputRef.current[index] = otpValue}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e,index)}
            />
          )
        })}
      </div>
    </>
  )
}

export default App;