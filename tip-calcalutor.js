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

$numbersButtons.forEach(($number) => {
  const numberValue = parseFloat($number.dataset.percentage);
  $number.addEventListener("click", () => {
    setSelected($number);
    calculate(numberValue);
  });
});

$inputs.forEach(($input) => {
  $input.addEventListener("input", () => {
    const isInvalid = [...$inputs].some(($input) => {
      const value = $input.value.trim();
      return value === "" || value === "0";
    });
    if (isInvalid) return setButtonsDisabledState(true);
    !isInvalid && setButtonsDisabledState(false);
    const $selected = document.querySelector("[selected]");
    if ($selected) calculate($selected.dataset.percentage);
  });
});

function calculate(tipValue) {
  if (isInvalid($billInput) || isInvalid($peopleInput) || tipValue === 0)
    return setButtonsDisabledState(true);
  const billValue = $billInput.value;
  const division = billValue / $peopleInput.value;
  const interestRate = division * tipValue;
  const result = division + interestRate;
  displayUpdate(interestRate, result);
  $buttonReset.disabled = false;
}

function setSelected($element) {
  $customInput.removeAttribute("selected");
  $numbersButtons.forEach(($number) => {
    $number.removeAttribute("selected");
  });
  $element.setAttribute("selected", "");
}

function setButtonsDisabledState(state) {
  $numbersButtons.forEach(($numbers) => {
    $numbers.disabled = state;
    $customInput.disabled = state;
  });
}

function isInvalid($element) {
  return $element.value === "" || $element.value === 0;
}

function replaceNonNumbers($element) {
  return $element.value.replace(/\D/g, "");
}

function displayUpdate(amount, total) {
  $resultAmount.innerHTML = amount.toFixed(2);
  $resultTotal.innerHTML = total.toFixed(2);
}

function displayReset() {
  $billInput.value = "";
  $peopleInput.value = "";
  $customInput.value = "";
  $resultAmount.innerHTML = "0.00";
  $resultTotal.innerHTML = "0.00";
  setButtonsDisabledState(true);
  setSelected($customInput);
}
