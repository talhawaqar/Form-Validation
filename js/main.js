const form = document.getElementById("form");
const user_name = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

// Show input error message
function showError(input, message) {
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control error";
  const small = formcontrol.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control success";
}

// Check valid email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check Length
function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(input, `${getFieldName(input)} has minimum ${min} characters`);
  } else if (input.value.trim().length > max) {
    showError(input, `${getFieldName(input)} has maximum ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check Password Match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password not match");
  } else {
    showSuccess(input2);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([user_name, email, password, confirm_password]);
  checkLength(user_name, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirm_password);
});
