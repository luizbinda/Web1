const attResponse = (value = "") =>
  (document.getElementById("response").innerHTML = value);

function calculadora(evt) {
  const response = document.getElementById("response").innerHTML;
  const button = evt.target.innerHTML;

  evt.preventDefault();
  if (button === "=") {
    try {
      response === "Error"
        ? attResponse("Error")
        : attResponse(eval(response.replace("^", "**")));
    } catch (err) {
      attResponse("Error");
    }
  } else if (button === "cls") {
    attResponse("");
  } else {
    response === "Error" ? attResponse(button) : attResponse(response + button);
  }
}

const buttons = document.querySelectorAll(".button").forEach((btn) => {
  btn.addEventListener("click", calculadora);
});
