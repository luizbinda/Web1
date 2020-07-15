const attResponse = (value = "") =>
  (document.getElementById("response").value = value);

const cronometro = () => {
  return setInterval(() => {
    const operacao = document.getElementById("operacao");
    const value1 = document.getElementById("valor1").value;
    const value2 = document.getElementById("valor2").value;
    const selected = operacao.options[operacao.selectedIndex].value;

    if (selected === "+") attResponse(eval(`${value1}+${value2}`));
    else if (selected === "-") attResponse(eval(`${value1}-${value2}`));
    else if (selected === "*") attResponse(eval(`${value1}*${value2}`));
    else if (selected === "/") attResponse(eval(`${value1}/${value2}`));
  }, 100);
};

let temporizador = cronometro();

document
  .getElementById("parar")
  .addEventListener("click", () => clearInterval(temporizador));

document.getElementById("inciar").addEventListener("click", () => {
  clearInterval(temporizador);
  temporizador = cronometro();
});
