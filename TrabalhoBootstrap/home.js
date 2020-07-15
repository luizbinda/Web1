//@@Pulini - 01 - Adiciona (ou move caso já exista) um elemento de node selecionado.
const textnode = document.createTextNode("/MG");
document.getElementById("cidade").appendChild(textnode);

//@@Pulini - 02 - Insire um novo elemento antes do primeiro elemento filho de um elemento.

const newStrong = document.createElement("strong");
const textStrong = document.createTextNode("País:");
newStrong.appendChild(textStrong);
const newP = document.createElement("p");
const textP = document.createTextNode("Brasil");
newP.appendChild(newStrong);
newP.appendChild(textP);
const faleConosco = document.getElementById("div_fale_conosco");
const cidade = document.getElementById("cidade");
faleConosco.insertBefore(newP, cidade);

//@@Pulini - 03 - Clona um node selecionado e seu filhos caso deep = true.

const telefone = document.getElementById("telefone");
const clone = telefone.cloneNode(true);
faleConosco.appendChild(clone);

//@@Pulini - 04 - retorna true se o nó especificado tiver algum nó filho, caso contrário retorna false.
const hasNodes = faleConosco.hasChildNodes();
console.log("faleConoscoo tem nodes filhos? ", hasNodes);

//@@Pulini - 05 - Remove e retorna um node da doom;

const removido = faleConosco.removeChild(newP);
console.log("telefone removido:", removido);

//@@Pulini - 06 - Substitui o elemento filho especificado por outro;
faleConosco.replaceChild(removido, clone);

//@@Pulini - 07 - Criar um novo text node

const exemploText = document.createTextNode("exemplo de um createTextNode");
console.log(exemploText);

//@@Pulini - 08 - Criar um novo elemento HTML ou HTMLUnknownElement se o elemento não for reconhecido

const newDiv = document.createElement("div");
console.log("nova div:", newDiv);
const newUnknownElement = document.createElement("elementoDesconhecido");
console.log("elementoDesconhecido:", newUnknownElement);

//@@Pulini - 09 - retorna ou define o valor do atributo class de um elemento especificado;

const classeFaleConsoco = faleConosco.className;
console.log("Classe classeFaleConsoco:", classeFaleConsoco);
newDiv.className = classeFaleConsoco;
console.log("Classe newDiv:", newDiv.className);

//@@Pulini - 10 - etorna o valor de um argumento específico do elemento. Se o atributo não existir, o valor retornado será null ou ""

console.log("id FaleConsoco:", faleConosco.getAttribute("id"));

//@@Pulini - 11 - retorna um valor booleano indicando se o elemento especificado possui ou não o atributo especificado

console.log(
  "faleConoscoo tem attributo class? ",
  faleConosco.hasAttribute("class")
);

console.log("faleConoscoo tem atributo xxx? ", faleConosco.hasAttribute("xxx"));

//@@Pulini - 12 - Adiciona um novo atributo ou modifica o valor de um atributo existente num elemento específico.

console.log("faleConoscoo tem atributo xxx? ", faleConosco.hasAttribute("xxx"));
faleConosco.setAttribute("xxx", 15);
console.log("faleConoscoo tem atributo xxx? ", faleConosco.hasAttribute("xxx"));
console.log("faleConoscoo xx valor ", faleConosco.getAttribute("xxx"));

//@@Pulini - 13 - Obtenha o nó pai de um elemento

console.log("node pai de cidade:", cidade.parentNode);

//@@Pulini - 14 - retorna os filhos de um elemento no formato de nodeList

console.log("nodes filhos de fale conosco:", faleConosco.childNodes);

//@@Pulini - 15 - retorna o primeiro filho de um elemento

console.log("primeiro node filho de fale conosco:", faleConosco.firstChild);

//@@Pulini - 16 - Retorna o nó seguinte ao especificado dentro da lista de filhos do seu pai

console.log(
  "segundo node filho de fale conosco:",
  faleConosco.firstChild.nextSibling
);

//@@Pulini - 17 - Retorna o nó anterior ao especificado dentro da lista de filhos do seu pai ou null se o nó for o primeiro da lista

console.log(
  "previousSibling do primeiro filho:",
  faleConosco.firstChild.previousSibling
);

console.log("filho anterio de Cidade:", cidade.previousSibling.previousSibling); // voce também pode encadear previousSiblings enquanto não for o primeiro filho

//@@Pulini - 18 - retorna um número inteiro que identifica o tipo do nó

console.log("cidade tipo de nó:", cidade.nodeType);
console.log("textP tipo de nó:", textP.nodeType);

//@@Pulini - 19 - retorna o nome do tipo de nó do nó selecionado

console.log("cidade nome do nó:", cidade.nodeName);
console.log("textP nome do nó:", textP.nodeName);

//@@Pulini - 20 - retorna ou define o valor do nó selecionado

console.log("textP value de nó:", textP.nodeValue);
textP.nodeValue = "Italia";
console.log("textP value de nó:", textP.nodeValue);

//@@Pulini - 21 - retorna o filhos de um elemento selecionado no formato de HTMLCollection

console.log("nodes filhos de fale conosco:", faleConosco.children);

//@@Pulini - 22 - retorna o primeiro elemento filho de um elemento selecionado

console.log("primeiro filho de fale conosco:", faleConosco.firstElementChild);

//@@Pulini - 23 - retorna o último elemento filho de um elemento selecionado

console.log("último filho de fale conosco:", faleConosco.lastElementChild);

//@@Pulini - 24 - Retorna o nó seguinte ao especificado dentro da lista de filhos do seu pai

console.log(
  "segundo element filho de fale conosco:",
  faleConosco.nextElementSibling
);

//@@Pulini - 25 - retorna a quantidade de elementos filhos de um elemento selecionado

console.log(
  "quantidade de elementos filhos de fale conosco:",
  faleConosco.childElementCount
);

//@@Pulini - 26 - retorna a quantidade de elementos do HTMLCollection

console.log(
  "quantidade de elementos filhos de fale conosco:",
  faleConosco.children.length
);

//@@Pulini - 27 - adiciona uma (ou varias) função a um evento de um elemento selecionado

const alertSaibaMais = () => {
  alert("Voce clickou em um botão de Saiba Mais");
};

const alertSaibaMaisFirstButton = () => {
  alert("Voce clickou no primeiro um botão de Saiba Mais");
};

document
  .getElementById("primeiro_button_saiba_mais")
  .addEventListener("click", alertSaibaMaisFirstButton);

document.querySelectorAll(".button_saiba_mais").forEach((btn) => {
  btn.addEventListener("click", alertSaibaMais);
});

//@@Pulini - 28 - remove uma função de um evento de um elemento selecionado

document
  .getElementById("primeiro_button_saiba_mais")
  .removeEventListener("click", alertSaibaMaisFirstButton);

//@@Pulini - 29 - adiciona uma função(ou substitue um existente) a um evento de um elemento selecionado
const button = document.getElementById("primeiro_button_saiba_mais");

button.onclick = alertSaibaMais; // não interfere nas fuções adiconadas ou removidas com addEventListener//removeEventListener

//@@Pulini - 30 - adiciona uma função(ou substitue um existente) a um evento de um elemento selecionado

button.onclick = alertSaibaMaisFirstButton; // não interfere nas fuções adiconadas ou removidas com addEventListener//removeEventListener
