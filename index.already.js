const numbers = document.querySelectorAll(".num_btn");
const funcs = document.querySelectorAll(".func_btn");
const outputDisp = document.querySelector("#input_values");
const resultDisp = document.querySelector("#answer");

let output = [0];
let result = 0;

function calcDisplay() {
  console.log(output);
  outputDisp.innerHTML = output.join(" ");
}

function displayResult() {
  resultDisp.innerHTML = result;
}

numbers.forEach((number, index) => {
  number.onclick = () => {
    let last = output[output.length - 1];
    let num = number.innerHTML;

    console.log(num);

    if (typeof last == "number") {
      let res = String(last) + num;
      output[output.length - 1] = Number(res);
    } else {
      output.push(Number(num));
    }

    calcDisplay();
  };
});

funcs.forEach((func, index) => {
  func.onclick = () => {
    let last = output[output.length - 1];
    let sym = func.innerHTML;

    console.log(sym);
    if (sym == "=") {
      evaluate();
    } else if (sym == "C") {
      output = [0];
      result = 0;
      calcDisplay();
      displayResult();
    } else if (sym == "⬅") {
      // [1, * , 2345]
      if (typeof last == "number") {
        let num = String(last); // "2435";
        if (num.length == 1 && output.length > 1) {
          output.pop();
        } else {
          num = num.substring(0, num.length - 1); // "2";
          output[output.length - 1] = Number(num);
        }
      } else output.pop();
    } else if (typeof last == "number") {
      output.push(sym);
    } else {
      output[output.length - 1] = sym;
    }

    calcDisplay();
  };
});

// Bodmas
function evaluate() {
  // output = resolved = [10, "+", 2, -, 7]

  let sym = null;
  let resolved = [...output];

  // output [1, +, 2, x, 4, ., 7, + , 3];
  // firstResolution resolves decimals [1, +, 2, x, 4.7, +, 3];
  // secondResolution resolves for bodmas [1, +, 9.4, +, 3];

  // 1+2x4.7

  // For loop to resolve for bodmas

  for (let i = 0; i < resolved.length; i++) {
    let inp = resolved[i];
    if (inp == ".") {
      let before = resolved[i - 1];
      let after = resolved[i + 1];

      let newInp = before + "." + after;
      newInp = Number(newInp); // 4.7

      resolved.splice(i, 2);
      resolved[i - 1] = newInp;
    }
  }

  // [1, +, 2, x, 4.7, +, 3];
  for (let i = 0; i < resolved.length; i++) {
    let inp = resolved[i];
    let val = 0;
    let before = resolved[i - 1];
    let after = resolved[i + 1];

    if (inp == "x" || inp == "/" || inp == "%") {
      if (inp == "x") {
        val = before * after;
      } else if (inp == "/") {
        val = before / after;
      } else if (inp == "%") {
        val = (before / 100) * after;
      }
      
      resolved.splice(i, 2);
      resolved[i - 1] = val;

      i--;

      
      // before [1, +, 2, x, 4.7, +, 3]; length = 7;
      // i = 3;
      // after [1, + 9.4 + 3]; length = 3;
    }
  }

  for (let i = 0; i < resolved.length; i++) {
    let inp = resolved[i];

    if (typeof inp == "number") {
      if (sym) {
        if (sym == "+") result += inp;
        else if (sym == "-") result -= inp;
      } else {
        result = inp;
      }
    } else {
      sym = inp;
    }
  }

  displayResult();
}
