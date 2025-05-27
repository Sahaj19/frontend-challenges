const container = document.querySelector(".container");
const submitBtn = document.querySelector('#submit');
const OTP_Boxes = 5;

// Generating OTP Inputs Dynamically
function generateOtpInputs() {
  for(let i=1; i <= OTP_Boxes; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input';
    container.appendChild(input);
  }
}

// OTP Main Functionalities
function OtpInputLogic() {
  const inputs = document.querySelectorAll(".input");

  // Focus on first input on initial load
  inputs[0].focus();

  container.addEventListener("input", function (e) {
    // only digits are allowed (0-9)
    if (isNaN(e.target.value)) {
      e.target.value = "";
      return;
    }

    // only the last typed number will be selected
    e.target.value = e.target.value.slice(-1);

    // moving focus forward
    if (e.target.value) {
      const nextElement = e.target.nextElementSibling;
      if (nextElement) {
        e.target.nextElementSibling.focus();
      }
    }
  });

  container.addEventListener("keydown", function (e) {
    // nothing will happen if we click space bar
    if (e.key === " ") {
      e.preventDefault();
      return;
    }

    // moving focus backward
    if (e.key === "Backspace" && !e.target.value) {
      const prevElement = e.target.previousElementSibling;
      if (prevElement) {
        e.target.previousElementSibling.focus();
      }
    }
  });
}

// We can use the OTP Afterwards
submitBtn.addEventListener('click', function() {
  const inputs = document.querySelectorAll('.input');
  const OTP = Number(Array.from(inputs).map((otp) => otp.value).join(''));
  if(String(OTP).length !== 5) {
    return;
  }else {
    console.log("OTP :- ", OTP);
  }
})


generateOtpInputs();
OtpInputLogic();