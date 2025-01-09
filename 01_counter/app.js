let counter = document.querySelector("#counter");
let decrementBtn = document.querySelector("#decrement_btn");
let incrementBtn = document.querySelector("#increment_btn");
let inputValue = document.querySelector("#number_input");
let resetBtn = document.querySelector("#rest_btn");

incrementBtn.addEventListener("click", function () {
  counter.textContent = (parseFloat(counter.textContent) + parseFloat(inputValue.value)).toFixed(2);
});

decrementBtn.addEventListener("click", function () {
  counter.textContent = (parseFloat(counter.textContent) - parseFloat(inputValue.value)).toFixed(2);
});

inputValue.addEventListener("change", function () {
  let numberInput = inputValue.valueAsNumber;

  if (Number.isNaN(numberInput) || numberInput < 0 || !numberInput) {
    inputValue.value = 1;
  }
});

resetBtn.addEventListener("click", function () {
  inputValue.value = 1;
  counter.textContent = 0;
});
