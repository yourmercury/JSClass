const numbers = document.querySelectorAll(".num_btn");
const funcs = document.querySelectorAll(".func_btn");
const outputDisp = document.querySelector("#input_values");
const resultDisp = document.querySelector("#answer");

// [178, "x", 3, "+", 4, ".", 7]

//1x3+4.7

// initialization

let output = [0];
let result = 0;

function reset() {
  output = [0];
  result = 0;
};

function display() {
  outputDisp.innerHTML = output.join("");
  resultDisp.innerHTML = result;
  console.log(output);
}

display();

numbers.forEach((element, index) => {
  element.onclick = () => {
    let val = element.innerHTML;
    if (output.length == 1 && output[0] == 0) {
      output[0] = Number(val);
    } else {
      let lastInp = output[output.length - 1];
      if (typeof lastInp == "number") {
        lastInp = String(lastInp);
        let newInp = lastInp + val;
        output[output.length - 1] = Number(newInp);
      } else {
        output.push(Number(val));
      }
    }
    display();
  };
});

funcs.forEach((element, index) => {
  element.onclick = () => {
    let val = element.innerHTML;
    let lastInp = output[output.length - 1];
    if (val == "C" || val == "⬅" || val == "=") {
      if (val == "C") {
        reset();
      } else if (val == "⬅") {
        if (typeof lastInp == "number") {
          let num = String(lastInp);
          if (num.length == 1) {
            if(output.length == 1){
                output = [0];
            }
            else output.pop();
          } else {
            num = num.slice(0, num.length - 1);
            output[output.length - 1] = Number(num);
          }
        } else output.pop();
      }
      else if(val == "="){
        evaluate();
      }
      display();
      return;
    }
    if (val == "." && output[output.length - 2] == ".") {
      return;
    } else if (typeof lastInp == "string") {
      output[output.length - 1] =
        output[output.length - 3] == "." ? lastInp : val;
    } else output.push(val);
    display();
  };
});

function evaluate(){
    // output = [178, "x", 3, "+", 4, ".", 7, "+", 0, ".", 8]

    if(typeof output[output.length - 1] == "string"){
        output.splice(output.length -1, 1);
    }

    let copied = [...output];

    //Handle the decimals --> [178, "x", 3, "+", 4.7, "+", 0.8]
    function handleDecimal(){
        let index = copied.indexOf(".");
        if(index != -1){
            let num = copied[index-1].toString() + "." + copied[index+1].toString();
            copied.splice(index, 2);
            copied[index-1] = Number(num);
            handleDecimal();
        }
    }

    handleDecimal();

    //handle Bodmas --> [178, "x", 3, "+", 4.7, "+", 0.8]
    function handleTimesAndDivide(func){
        let index = copied.indexOf(func);
        if(index != -1){
            let num = func == "x"? copied[index-1] * copied[index+1] : (func == "/"? copied[index-1] / copied[index+1] : copied[index-1]/100 * copied[index+1]);
            copied.splice(index, 2);
            copied[index-1] = num;
            handleTimesAndDivide();
        }
    }

    handleTimesAndDivide("x");
    handleTimesAndDivide("/");
    handleTimesAndDivide("%");

    function handlePlusAndMinus(func){
        let index = copied.indexOf(func);
        if(index != -1){
            let num = func == "+"? copied[index-1] + copied[index+1] : copied[index-1] - copied[index+1];
            copied.splice(index, 2);
            copied[index-1] = num;
            handleTimesAndDivide();
        }
    }

    handlePlusAndMinus("+");
    handlePlusAndMinus("-");

    result = copied.join("and");
    display();

    console.log(copied);

}
