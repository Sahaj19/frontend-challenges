let Input = document.querySelector("#pinInput");
let submitBtn = document.querySelector("#submit");
let checkBalanceBtn = document.querySelector("#checkBalance");
let depositBtn = document.querySelector("#deposit");
let withdrawBtn = document.querySelector("#withdraw");
let logoutBtn = document.querySelector("#logout");
let sessionTimeoutClock = document.querySelector("#sessionTimeout");
let atmMessage = document.querySelector("#message");
let changePinBtn = document.querySelector("#changePin");
let currentAtmPin = document.querySelector("#currentAtmPin");


// ATM PIN & Initial Balance
let ATM_PIN = 1234;
let INITIAL_BALANCE = 1000;
let MAX_DEPOSIT_AMOUNT = 500;
let MAX_WITHDRAWN_AMOUNT = 1000;
let timerInterval;
let totalSeconds;

// Starting Session Timeout Clock
function sessionClockStarts() {
  totalSeconds = 120;

  if(timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    sessionTimeoutClock.textContent = `Your session Expires in ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`

    totalSeconds--;

    // Stop the timer when it reaches 0
    if (totalSeconds < 0) {
      clearInterval(timerInterval);
      LoggingOff();
    }
  }, 1000);
}

// Changing Atm Pin 
function changeAtmPin() {
  let atmPrompt = parseInt(prompt("Enter a new 4-digit ATM Pin"));

  if(Number.isNaN(atmPrompt) || atmPrompt < 0 || atmPrompt.toString().length !== 4) {
    atmMessage.textContent = "Please Enter A Valid New Atm Pin";
    return;
  }else {
    ATM_PIN = atmPrompt;
    currentAtmPin.textContent = `${ATM_PIN}`;
    atmMessage.textContent = "Atm Pin Changed Successfully";
    LoggingOff();
  }
}

// Enable Buttons
function EnableButtons() {
  submitBtn.disabled = false;
  checkBalanceBtn.disabled = false;
  depositBtn.disabled = false;
  withdrawBtn.disabled = false;
}

// Submit Btn Functionality
submitBtn.addEventListener("click", () => {
  let inputValue = Input.valueAsNumber;

  if (inputValue === ATM_PIN) {
    sessionClockStarts();
    EnableButtons();
    atmMessage.textContent = "Logged In Successfully :)";
    submitBtn.disabled = true;
    Input.disabled = true;
    logoutBtn.disabled = false;
    changePinBtn.disabled = false;
  } else {
    atmMessage.textContent = "Incorrect PIN. Please try again.";
  }

  Input.value = "";
});

// Deposit Btn Functionality
depositBtn.addEventListener("click", () => {
  let depositPrompt = parseInt(prompt("Enter the amount to deposit"));

  if (Number.isNaN(depositPrompt) || depositPrompt <= 0) {
    atmMessage.textContent = "Invalid deposit amount. Please enter a valid number.";
    return;
  }else if(depositPrompt > MAX_DEPOSIT_AMOUNT) {
    atmMessage.textContent = `Maximum Deposit Limit is ${MAX_DEPOSIT_AMOUNT}. Please Try Again`;
    return;
  }else {
    INITIAL_BALANCE += depositPrompt;
    atmMessage.textContent = `Rs.${depositPrompt} Deposited Successfully! Your Balance :- ${INITIAL_BALANCE}`;
  }
})

// Withdrawn Btn Functionality
withdrawBtn.addEventListener("click", () => {
  let withdrawnPrompt = parseInt(prompt("Enter the amount to withdraw"));

  if(Number.isNaN(withdrawnPrompt) || (withdrawnPrompt > INITIAL_BALANCE)) {
    atmMessage.textContent = "Invalid amount or insufficient balance. Please try again.";
    return
  }else if(withdrawnPrompt > MAX_WITHDRAWN_AMOUNT) {
    atmMessage.textContent = `Maximum Withdrawn Limit is ${MAX_WITHDRAWN_AMOUNT}. Please Try Again.`;
    return
  }else {
    INITIAL_BALANCE -= withdrawnPrompt;
    atmMessage.textContent = `Rs.${withdrawnPrompt} Withdrawn Successfully! Your Balance :- Rs.${INITIAL_BALANCE}`;
  }
})

// Check Balance Functionality
checkBalanceBtn.addEventListener("click", () => {
  atmMessage.textContent = `Your Balance is Rs.${INITIAL_BALANCE}`;
})

// change atm pin btn functionality
changePinBtn.addEventListener("click", changeAtmPin);


// Log-Out Button Functionality
logoutBtn.addEventListener("click", LoggingOff);

// Log Out Function
function LoggingOff() {
  clearInterval(timerInterval);
  sessionTimeoutClock.textContent = "";
  checkBalanceBtn.disabled = true;
  depositBtn.disabled = true;
  withdrawBtn.disabled = true;
  logoutBtn.disabled = true;
  Input.disabled = false;
  submitBtn.disabled = false;
  changePinBtn.disabled = true;
  atmMessage.textContent = "Logged Out Successfully!";
  Input.focus();
}

// Current Pin Updation
currentAtmPin.textContent = `${ATM_PIN}`;

