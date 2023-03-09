"use strict";

const input = Array.from(
  document.querySelectorAll(".form-content-input-field")
).slice(0, 3);
const nums = document.querySelectorAll(".num");
const forms = Array.from(document.querySelectorAll(".form-inner"));

const submit = document.querySelectorAll(".form-btn-submit");
const back = document.querySelectorAll(".back");
let n = 0;

const final_head = document.querySelector(".final-1 span:nth-child(1)");
const final_link = document.querySelector(".final-1 span:nth-child(2)");

const final_head_amt = document.querySelector(".final-amt");
const final_price = document.querySelector(".final-tot span:nth-child(2)");

console.log(final_head);
console.log(final_head_amt);
console.log(final_price);

const validateForm = (val, type) => {
  if (type == "name") {
    let new_str = val.replace("/ /g", "");
    if (new_str == "") return "This Field is Requied";
    else return true;
  } else if (type == "email") {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (val.match(validRegex)) {
      return true;
    } else if (val == "") {
      return "This Field is required";
    } else {
      return "This Email is Invalid";
    }
  } else if (type == "mobile") {
    if (val == "") {
      return "This Field is Required";
    } else if (
      isNaN(val.replace("/ /g", "")) ||
      val.replace("/ /g", "").length != 10
    ) {
      return "Invalid Input";
    } else {
      return true;
    }
  }
};

const traverseSlide = (n) => {
  nums.forEach((ele, i) => {
    if (i == n) {
      ele.classList.add("active");
    } else {
      ele.classList.remove("active");
    }
  });
  forms.forEach((ele, i) => {
    if (i == n) {
      ele.classList.remove("hide");
    } else {
      ele.classList.add("hide");
    }
  });
};

input.forEach((e) => {
  e.addEventListener("input", (ele) => {
    console.log(ele.target.value);
    const result = validateForm(ele.target.value, ele.target.dataset.type);
    const text = ele.target.parentElement.querySelector(".invalid-text");
    if (result == true) {
      text.classList.remove("invalid-text-active");
      ele.target.classList.add("valid");
      ele.target.classList.remove("invalid");
    } else {
      ele.target.classList.remove("valid");
      text.classList.add("invalid-text-active");
      ele.target.classList.add("invalid");
      text.innerText = result;
    }
  });
});

submit[0].addEventListener("click", (ele) => {
  let fin = true;
  input
    .slice(
      parseInt(ele.target.dataset.inps),
      parseInt(ele.target.dataset.inpe) + 1
    )
    .forEach((e) => {
      const text = e.parentElement.querySelector(".invalid-text");
      const result = validateForm(e.value, e.dataset.type);
      if (result == true) {
        text.classList.remove("invalid-text-active");
        e.classList.remove("invalid");
        e.classList.add("valid");
      } else {
        fin = false;
        text.classList.remove("text-shake");
        void text.offsetWidth;
        text.classList.add("text-shake");
        text.classList.add("invalid-text-active");
        e.classList.add("invalid");
        e.classList.remove("valid");
        text.innerText = result;
      }
    });
  if (fin) {
    if (n == submit.length - 1) {
      console.log("Submit");
    } else {
      n++;
      traverseSlide(n);
    }
  }
});

submit[1].addEventListener("click", (ele) => {
  if (n == submit.length - 1) {
    console.log("Submit");
  } else {
    n++;
    traverseSlide(n);
  }
});

submit[2].addEventListener("click", (ele) => {
  let plan = [];
  let addOns = [];
  let addOnsPage = document.querySelector(".final-out");
  addOnsPage.innerHTML = "";
  document.querySelectorAll("input[type='radio']").forEach((e) => {
    if (e.checked) {
      plan.push(e.value, e.dataset.price);
    }
  });
  let type = document.querySelector("#toggle-btn-slide").checked
    ? "Yearly"
    : "Monthly";
  document.querySelectorAll(".tick input[type='checkbox']").forEach((ele) => {
    if (ele.checked) {
      addOns.push([ele.dataset.name, ele.dataset.price]);
    }
  });
  addOns.forEach((ele) => {
    const node = document.createElement("div");
    node.classList.add("final-out-ele");
    node.innerHTML = `<span>${ele[0]}</span><span>+${ele[1]}/mo</span>`;
    addOnsPage.append(node);
  });
  final_head.innerText = `${plan[0]} (${type})`;
  final_head_amt.innerText = `$${plan[1]}/mo`;
  let sum = parseInt(plan[1]);
  addOns.forEach((ele) => {
    sum += parseInt(ele[1]);
  });
  final_price.innerText = `$${sum}/mo`;
  n++;
  traverseSlide(n);
});

back.forEach((ele) => {
  ele.addEventListener("click", (ele) => {
    if (n == 0) {
      console.log("Base");
    } else {
      n--;
      traverseSlide(n);
    }
  });
});

submit[3].addEventListener("click", (ele) => {
  n++;
  traverseSlide(n);
});

final_link.addEventListener("click", (ele) => {
  n = 0;
  traverseSlide(n);
});
