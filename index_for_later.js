const numButtons = document.getElementsByClassName("num_btn");
const funcButtons = document.querySelectorAll(".func_btn");
const equal = document.getElementById("evaluate");
const input = document.getElementById("input_values");
const output = document.getElementById("answer");

let inp = 0;
let out = 0;

input.innerHTML = inp;
output.innerHTML = out;

for (let element of numButtons) {
  element.onclick = numButtonClicked;
}

for (let func of funcButtons) {
  func.onclick = funcButtonClicked;
}

function numButtonClicked(e) {
  if (input.innerHTML === "0") {
    input.innerHTML = e.target.innerHTML;
  } else {
    input.innerHTML = input.innerHTML + e.target.innerHTML;
  }
}

function funcButtonClicked(e) {
  if (e.target.innerHTML == "C" || e.target.innerHTML == "⬅") {
    if (e.target.innerHTML == "⬅") {
      let state = input.innerHTML;
      if (input.innerHTML !== "0") {
        let x = state.split("");
        x.pop();
        x = x.join("");
        input.innerHTML = x;
      }
    }
    return;
  }
  input.innerHTML = input.innerHTML + e.target.innerHTML;
}