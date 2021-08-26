const $billInput = document.querySelector(".input-bill");
const $customInput = document.querySelector(".input-custom");
const $peopleInput = document.querySelector(".input-people");
const $numbersButtons = document.querySelectorAll(".number-tip");
const $buttonReset = document.querySelector(".reset");
const $resultAmount = document.querySelector(".result-amount");
const $resultTotal = document.querySelector(".result-total");
const $inputs = document.querySelectorAll("input[data-form]");

$buttonReset.addEventListener("click", displayReset);

$customInput.addEventListener("input", () => {
  const saveValue = (data) => {
    $customInput.dataset.value = data;
  };
  const focusNumber = () => {
    const length = $customInput.dataset.value.length;
    $customInput.setSelectionRange(length, length);
  };
  const value = replaceNonNumbers($customInput);
  saveValue(value);
  $customInput.value = `${value}%`;
  focusNumber();
});

$customInput.addEventListener("blur", () => {
  const value = replaceNonNumbers($customInput);
  const percentage = value / 100;
  $customInput.dataset.percentage = percentage;
  calculate(percentage);
  setSelected($customInput);
});
