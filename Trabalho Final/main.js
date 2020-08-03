const modal = document.getElementById("modal_body");
const fecharModal = document.getElementById("btnFechar");

const createInput = (content, tipo, classe) => {
  const div = document.createElement("div");
  div.setAttribute("class", "input-group flex-nowrap");

  const span = document.createElement("span");
  span.setAttribute("class", "input-group-text");
  span.appendChild(document.createTextNode(content));

  const divContent = document.createElement("div");
  div.setAttribute("class", "input-group-prepend");
  divContent.appendChild(span);

  const input = document.createElement("input");
  input.setAttribute("type", tipo);
  input.setAttribute("class", classe);
  input.setAttribute("id", content);
  input.setAttribute("placeholder", content);
  input.setAttribute("aria-label", content);
  input.setAttribute("aria-describedby", "addon-wrapping");
  div.appendChild(divContent);
  div.appendChild(input);
  return div;
};

const createSelect = (tipo, nome, multiple) => {
  const elements = buscarElementos(tipo);

  const div = document.createElement("div");
  div.setAttribute("class", "input-group flex-nowrap");

  const span = document.createElement("span");
  span.setAttribute("class", "input-group-text");
  span.appendChild(document.createTextNode(nome));

  const divContent = document.createElement("div");
  div.setAttribute("class", "input-group-prepend");
  divContent.appendChild(span);

  const select = document.createElement("select");
  select.setAttribute("class", "form-control");
  multiple && select.setAttribute("multiple", true);

  elements.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute(`id_tipo`, element.id);
    option.setAttribute(`nome_tipo`, tipo);
    option.appendChild(document.createTextNode(element.Nome));
    select.appendChild(option);
  });

  div.appendChild(divContent);
  div.appendChild(select);

  return div;
};

const buscarElementos = (tipo) => {
  let elements = JSON.parse(localStorage.getItem(tipo));
  !elements &&
    (() => {
      localStorage.setItem(tipo, JSON.stringify([]));
      elements = JSON.parse(localStorage.getItem(tipo));
    })();
  return elements;
};

const saveType = (tipo) => {
  const elements = buscarElementos(tipo);
  const inputs = [...modal.getElementsByTagName("input")];
  const selects = [...modal.getElementsByTagName("select")];

  let camposValidos = true;
  inputs.forEach((element) => (element.value ? null : (camposValidos = false)));

  !camposValidos &&
    (() => {
      alert("É Necessario preencher todos os campos para salvar!");
      return;
    })();

  const id = document.getElementById("id").value;

  const element = elements.find((cadastro) => cadastro.id === id);

  const insert = {};
  element
    ? (() => {
        inputs.forEach((input) => (element[input.id] = input.value));
        selects.forEach((select) => {
          const selecteds = [...select.children];
          selecteds.forEach((selected) => {
            select[selected.index].selected = selected.selected;
            selected.index === 0
              ? (() => {
                  element[selected.attributes.nome_tipo.value] = [];
                  element[selected.attributes.nome_tipo.value].push({
                    nome: selected.value,
                    id_tipo: selected.attributes.id_tipo.value,
                    selected: selected.selected ? true : false,
                  });
                })()
              : (() => {
                  element[selected.attributes.nome_tipo.value].push({
                    nome: selected.value,
                    id_tipo: selected.attributes.id_tipo.value,
                    selected: selected.selected ? true : false,
                  });
                })();
          });
        });
      })()
    : (() => {
        inputs.forEach((input) => (insert[input.id] = input.value));

        selects.forEach((select) => {
          const selecteds = [...select.children];
          selecteds.forEach((selected) => {
            select[selected.index].selected = selected.selected;
            if (insert[selected.attributes.nome_tipo.value] === undefined) {
              insert[selected.attributes.nome_tipo.value] = [];
              insert[selected.attributes.nome_tipo.value].push({
                nome: selected.value,
                id_tipo: select[select.selectedIndex].attributes.id_tipo.value,
                selected: selected.selected ? true : false,
              });
            } else {
              insert[selected.attributes.nome_tipo.value].push({
                nome: selected.value,
                id_tipo: select[select.selectedIndex].attributes.id_tipo.value,
                selected: selected.selected ? true : false,
              });
            }
          });
        });
        elements.push(insert);
      })();

  localStorage.setItem(tipo, JSON.stringify(elements));
  alert("Salvo com sucesso!");
  fecharModal.click();
};

const getAttributes = (id, tipo) => {
  const element = buscarElementos(tipo);

  const atorSelecionado = element.find((ator) => ator.id == id);
  !atorSelecionado &&
    (() => {
      alert(`Id não encontrado!`);
      return;
    })();

  [...modal.getElementsByTagName("input")].forEach(
    (input) => (input.value = atorSelecionado[input.id])
  );

  [...modal.getElementsByTagName("select")].forEach((select) => {
    const selecteds = [...select.children];
    selecteds.forEach((selected) => {
      select[selected.index].selected = atorSelecionado[
        selected.attributes.nome_tipo.value
      ][selected.index].selected
        ? true
        : false;
    });

    // select.value =
    //   atorSelecionado[
    //     select[select.selectedIndex].attributes.nome_tipo.value
    //   ].nome;
  });
};

const deleteAttribute = (id, tipo) => {
  const elements = buscarElementos(tipo);

  const index = elements.findIndex((element) => element.id == id);
  if (index === -1) {
    alert(`Id não encontrado!`);
    fecharModal.click();
    return;
  }

  const excluir = confirm("Tem certeza que deseja excluir?");

  if (!excluir) return;

  elements.splice(
    elements.findIndex((element) => element.id == id),
    1
  );

  localStorage.setItem(tipo, JSON.stringify(elements));
  fecharModal.click();
  alert("Excluido com sucesso!");
};

const preencherModal = (tipo) => {
  const title = document.getElementById("exampleModalLabel");
  const saveButton = document.getElementById("save");
  const searchButton = document.getElementById("buscar");
  const deleteButton = document.getElementById("deletar");
  modal.textContent = "";
  modal.appendChild(createInput("id", "number", "form-control"));

  switch (tipo) {
    case "ator":
      title.textContent = "Ator";
      modal.appendChild(createInput("Nome", "text", "form-control"));

      saveButton.onclick = () => saveType("ator");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "ator");
      deleteButton.onclick = () =>
        deleteAttribute(document.getElementById("id").value, "ator");

      break;

    case "classe":
      title.textContent = "Classe";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      modal.appendChild(createInput("Valor", "text", "form-control"));
      modal.appendChild(
        createInput("data de devolução", "date", "form-control")
      );
      saveButton.onclick = () => saveType("classe");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "classe");

      deleteButton.onclick = () =>
        deleteAttribute(document.getElementById("id").value, "classe");

      break;

    case "diretor":
      title.textContent = "Diretor";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      saveButton.onclick = () => saveType("diretor");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "diretor");

      deleteButton.onclick = () =>
        deleteAttribute(document.getElementById("id").value, "diretor");

      break;

    case "titulo":
      title.textContent = "Titulo";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      modal.appendChild(createSelect("diretor", "Diretor", true));
      modal.appendChild(createSelect("ator", "Atores", true));
      modal.appendChild(createInput("Ano", "date", "form-control"));
      modal.appendChild(createInput("Sinopse", "text", "form-control"));
      modal.appendChild(createInput("Categoria", "text", "form-control"));
      modal.appendChild(createSelect("classe", "Classe", true));
      saveButton.onclick = () => saveType("titulo");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "titulo");
      deleteButton.onclick = () =>
        deleteAttribute(document.getElementById("id").value, "titulo");
      break;

    case "item":
      title.textContent = "Item";
      modal.appendChild(createInput("Número de Série", "text", "form-control"));
      modal.appendChild(createSelect("titulo", "Titulo", true));
      modal.appendChild(
        createInput("Data de aquisição", "date", "form-control")
      );
      modal.appendChild(createInput("Tipo", "text", "form-control"));
      saveButton.onclick = () => saveType("item");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "item");

      deleteButton.onclick = () =>
        deleteAttribute(document.getElementById("id").value, "item");

      break;

    default:
      break;
  }
};

document
  .getElementById("cadastrar_ator")
  .addEventListener("click", () => preencherModal("ator"));
document
  .getElementById("cadastrar_classe")
  .addEventListener("click", () => preencherModal("classe"));
document
  .getElementById("cadastrar_diretor")
  .addEventListener("click", () => preencherModal("diretor"));
document
  .getElementById("cadastrar_item")
  .addEventListener("click", () => preencherModal("item"));
document
  .getElementById("cadastrar_titulo")
  .addEventListener("click", () => preencherModal("titulo"));
