const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

let current = "0";
let previous = "";
let operator = null;
let resetNext = false;

function updateDisplay() {
  expressionEl.textContent = previous && operator
    ? `${previous} ${operator}`
    : "";
  resultEl.textContent = current;
}

function flashResult() {
  resultEl.classList.remove("flash");
  void resultEl.offsetWidth;
  resultEl.classList.add("flash");
}

function inputNumber(digit) {
  if (resetNext) {
    current = digit;
    resetNext = false;
  } else if (current === "0") {
    current = digit;
  } else if (current.length < 14) {
    current += digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (resetNext) {
    current = "0.";
    resetNext = false;
  } else if (!current.includes(".")) {
    current += ".";
  }
  updateDisplay();
}

function setOperator(nextOp) {
  if (operator && !resetNext) {
    compute();
  }
  previous = current;
  operator = nextOp;
  resetNext = true;
  updateDisplay();
}

function compute() {
  if (!operator || previous === "") return;

  const a = parseFloat(previous);
  const b = parseFloat(current);
  let value;

  switch (operator) {
    case "+":
      value = a + b;
      break;
    case "−":
      value = a - b;
      break;
    case "×":
      value = a * b;
      break;
    case "÷":
      if (b === 0) {
        current = "Error";
        previous = "";
        operator = null;
        resetNext = true;
        updateDisplay();
        return;
      }
      value = a / b;
      break;
    default:
      return;
  }

  current = formatNumber(value);
  previous = "";
  operator = null;
  resetNext = true;
  flashResult();
  updateDisplay();
}

function formatNumber(num) {
  if (!Number.isFinite(num)) return "Error";

  const rounded = Math.round(num * 1e10) / 1e10;
  let text = String(rounded);

  if (text.length > 14) {
    text = rounded.toExponential(6);
  }
  return text;
}

function clearAll() {
  current = "0";
  previous = "";
  operator = null;
  resetNext = false;
  updateDisplay();
}

function deleteLast() {
  if (resetNext || current === "Error") {
    current = "0";
    resetNext = false;
  } else if (current.length <= 1) {
    current = "0";
  } else {
    current = current.slice(0, -1);
  }
  updateDisplay();
}

function percent() {
  const value = parseFloat(current);
  if (!Number.isFinite(value)) return;
  current = formatNumber(value / 100);
  updateDisplay();
}

document.querySelector(".keys").addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;

  if (btn.dataset.num !== undefined) {
    inputNumber(btn.dataset.num);
  } else if (btn.dataset.op !== undefined) {
    setOperator(btn.dataset.op);
  } else if (btn.dataset.action === "decimal") {
    inputDecimal();
  } else if (btn.dataset.action === "equals") {
    compute();
  } else if (btn.dataset.action === "clear") {
    clearAll();
  } else if (btn.dataset.action === "delete") {
    deleteLast();
  } else if (btn.dataset.action === "percent") {
    percent();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/\d/.test(key)) {
    inputNumber(key);
  } else if (key === ".") {
    inputDecimal();
  } else if (key === "+") {
    setOperator("+");
  } else if (key === "-") {
    setOperator("−");
  } else if (key === "*") {
    setOperator("×");
  } else if (key === "/") {
    event.preventDefault();
    setOperator("÷");
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    compute();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearAll();
  } else if (key === "%") {
    percent();
  }
});

updateDisplay();
