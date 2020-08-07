const modal = document.getElementById("modal_body");
const fecharModal = document.getElementById("btnFechar");

const createInput = (content, tipo, classe, disable = false) => {
  const div = document.createElement("div");
  div.setAttribute("class", "input-group flex-nowrap");

  const span = document.createElement("span");
  span.setAttribute("class", "input-group-text");
  span.appendChild(document.createTextNode(content));

  const divContent = document.createElement("div");
  div.setAttribute("class", "input-group-prepend");
  div.setAttribute("id", `div-${content}`);
  divContent.appendChild(span);

  const input = document.createElement("input");
  input.setAttribute("type", tipo);
  input.setAttribute("class", classe);
  input.setAttribute("id", content);
  input.setAttribute("placeholder", content);
  input.setAttribute("aria-label", content);
  input.setAttribute("aria-describedby", "addon-wrapping");
  disable && input.setAttribute("readonly", true);

  div.appendChild(divContent);
  div.appendChild(input);
  return div;
};

const createSelect = (tipo, nome, multiple, elements) => {
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
  select.setAttribute("id", nome);

  multiple && select.setAttribute("multiple", true);

  elements.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute(`id_tipo`, element.id);
    option.setAttribute(`nome_tipo`, tipo);
    tipo === "Número de Série"
      ? option.appendChild(document.createTextNode(element[tipo]))
      : option.appendChild(document.createTextNode(element.Nome));
    select.appendChild(option);
  });

  div.appendChild(divContent);
  div.appendChild(select);

  return div;
};

const buscarElementos = (tipo) => {
  const elements = JSON.parse(localStorage.getItem(tipo));

  if (!elements) {
    localStorage.setItem(tipo, JSON.stringify([]));
    return JSON.parse(localStorage.getItem(tipo));
  }
  return elements;
};

const saveType = (tipo) => {
  const elements = buscarElementos(tipo);
  const inputs = [...modal.getElementsByTagName("input")];
  const selects = [...modal.getElementsByTagName("select")];

  const id = document.getElementById("id").value;
  const element = elements.find((cadastro) => cadastro.id === id);
  !element && (inputs[0].value = elements.length + 1);

  if (inputs.some((element) => !element.value)) {
    alert("É Necessario preencher todos os campos para salvar!");
    !element && (inputs[0].value = "");
    return;
  }

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

const verificarItemLocado = (numeroDeSerie) => {
  const item = getElement("item", "Número de Série", numeroDeSerie);
  return item.locado;
};

const saveLocacao = () => {
  let elements = buscarElementos("locacao");
  let id = document.getElementById("id").value;
  let element = elements.find((cadastro) => cadastro.id === id);

  if (!element) {
    const numeroDeSerie = document.getElementById("Item Locado").value;
    if (verificarItemLocado(numeroDeSerie)) {
      alert("Esse item já esta locado!");
      return;
    }
  }

  saveType("locacao");
  elements = buscarElementos("locacao");
  id = document.getElementById("id").value;
  element = elements.find((cadastro) => cadastro.id === id);

  const items = buscarElementos("item");
  const itemSelected = element["Número de Série"].find(
    (item) => item.selected === true
  );
  const index = items.findIndex(
    (cadastro) => cadastro["Número de Série"] === itemSelected.nome
  );
  const item = getElement(
    "item",
    "Número de Série",
    element["Número de Série"][index].nome
  );

  item.locado = true;
  item.id_locado = element.id;
  items[index] = item;

  localStorage.setItem("item", JSON.stringify(items));
};

const getElement = (tipoElement, tipoSearch, search) => {
  const elements = buscarElementos(tipoElement);
  const element = elements.find((element) => element[tipoSearch] == search);

  return element;
};

const calcularValor = () => {
  const item = document.getElementById("Item Locado");
  const titulo = getElement(
    "titulo",
    "id",
    item.options[item.selectedIndex].attributes.id_tipo.value
  );
  const classe = getElement("classe", "id", titulo.classe[0].id_tipo);

  const valor = document.getElementById("Valor");
  valor.value = classe.Valor;
};

const calcularDataDeEntrega = () => {
  const item = document.getElementById("Item Locado");
  const titulo = getElement(
    "titulo",
    "id",
    item.options[item.selectedIndex].attributes.id_tipo.value
  );
  const classe = getElement("classe", "id", titulo.classe[0].id_tipo);

  const dataDevolucaoInput = document.getElementById("Data de Devolução");

  const dataDevolucao = new Date();
  dataDevolucao.setDate(
    dataDevolucao.getDate() + Number(classe["Dias para devolução"])
  );
  const dataArray = dataDevolucao.toLocaleDateString("pt-BR").split("/");

  dataDevolucaoInput.value = `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
};

const saveCliente = (tipo) => {
  saveType("cliente");
  const elements = buscarElementos("cliente");
  const id = document.getElementById("id").value;
  const element = elements.find((cadastro) => cadastro.id === id);
  element.estaAtivo = true;
  element.tipo = tipo;
  localStorage.setItem("cliente", JSON.stringify(elements));
};

const getCliente = (tipo) => {
  const elements = buscarElementos("cliente");
  elements.forEach((element, index) => {
    !(element.tipo === tipo) && elements.splice(index, 1);
  });

  return elements;
};

const getAttributes = (id, element) => {
  const atorSelecionado = element.find((ator) => ator.id == id);

  if (!atorSelecionado) {
    alert(`Id não encontrado!`);
    return;
  }

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
};

const buscarItemPorNumerDeSerie = (numeroDeSerie) => {
  const item = getElement("item", "Número de Série", numeroDeSerie[0].value);
  const cliente = document.getElementById("Cliente");
  const valor = document.getElementById("Valor");
  const data = document.getElementById("Data de Devolução");

  if (!item || !item.locado) {
    data.value = "";
    valor.value = "";
    cliente.value = "";
    document.getElementById("save").onclick = () => {
      alert("Busque o numero de série que deseja desalocar antes de salvar!");
    };
    alert("Item não Alocado");
  } else {
    const locacao = getElement("locacao", "id", item.id_locado);
    locacao.cliente.forEach((clienteItem) => {
      clienteItem.selected && (cliente.value = clienteItem.nome);
    });
    data.value = locacao["Data de Devolução"];
    valor.value = locacao.Valor;
    document.getElementById("save").onclick = () =>
      realizarDevolocao(locacao.id);
  }
};

const realizarDevolocao = (id) => {
  const elements = buscarElementos("locacao");
  const element = elements.find((locacao) => locacao.id === id);

  const items = buscarElementos("item");
  const itemSelected = element["Número de Série"].find(
    (item) => item.selected === true
  );
  const index = items.findIndex(
    (item) => item["Número de Série"] === itemSelected.nome
  );
  const item = getElement(
    "item",
    "Número de Série",
    element["Número de Série"][index].nome
  );

  delete item.locado;
  delete item.id_locado;

  const desalocarItem = () => {
    const elements = buscarElementos("locacao");

    const index = elements.findIndex((locacao) => locacao.id == element.id);
    if (index === -1) {
      alert(`Id não encontrado!`);
      fecharModal.click();
      return;
    }

    elements.splice(
      elements.findIndex((element) => element.id == id),
      1
    );

    localStorage.setItem("locacao", JSON.stringify(elements));
  };
  desalocarItem();
  items[index] = item;

  localStorage.setItem("item", JSON.stringify(items));
  fecharModal.click();
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
        getAttributes(
          document.getElementById("id").value,
          buscarElementos("ator")
        );
      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "ator");
        alert("Excluido com sucesso!");
      };
      break;

    case "classe":
      title.textContent = "Classe";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      modal.appendChild(createInput("Valor", "text", "form-control"));
      modal.appendChild(
        createInput("Dias para devolução", "number", "form-control")
      );
      saveButton.onclick = () => saveType("classe");
      searchButton.onclick = () =>
        getAttributes(
          document.getElementById("id").value,
          buscarElementos("classe")
        );

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "classe");
        alert("Excluido com sucesso!");
      };
      break;

    case "diretor":
      title.textContent = "Diretor";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      saveButton.onclick = () => saveType("diretor");
      searchButton.onclick = () =>
        getAttributes(
          document.getElementById("id").value,
          buscarElementos("diretor")
        );

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "diretor");
        alert("Excluido com sucesso!");
      };
      break;

    case "titulo":
      title.textContent = "Titulo";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      modal.appendChild(
        createSelect("diretor", "Diretor", false, buscarElementos("diretor"))
      );
      modal.appendChild(
        createSelect("ator", "Atores", true, buscarElementos("ator"))
      );
      modal.appendChild(createInput("Ano", "date", "form-control"));
      modal.appendChild(createInput("Sinopse", "text", "form-control"));
      modal.appendChild(createInput("Categoria", "text", "form-control"));
      modal.appendChild(
        createSelect("classe", "Classe", false, buscarElementos("classe"))
      );
      saveButton.onclick = () => saveType("titulo");
      searchButton.onclick = () =>
        getAttributes(
          document.getElementById("id").value,
          buscarElementos("titulo")
        );
      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "titulo");
        alert("Excluido com sucesso!");
      };
      break;

    case "item":
      title.textContent = "Item";
      modal.appendChild(
        createInput("Número de Série", "number", "form-control")
      );
      modal.appendChild(
        createSelect("titulo", "Titulo", true, buscarElementos("titulo"))
      );
      modal.appendChild(
        createInput("Data de aquisição", "date", "form-control")
      );
      modal.appendChild(createInput("Tipo", "text", "form-control"));
      saveButton.onclick = () => saveType("item");
      searchButton.onclick = () =>
        getAttributes(
          document.getElementById("id").value,
          buscarElementos("item")
        );

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "item");
        alert("Excluido com sucesso!");
      };
      break;

    case "socio":
      title.textContent = "Cliente";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      modal.appendChild(createInput("Endereço", "text", "form-control"));
      modal.appendChild(createInput("telefone", "text", "form-control"));
      modal.appendChild(
        createSelect("sexo", "Sexo", false, [
          { id: "1", Nome: "Masculino" },
          { id: "2", Nome: "Feminino" },
        ])
      );
      modal.appendChild(createInput("CPF", "text", "form-control"));
      modal.appendChild(
        createInput("Data de nascimento", "date", "form-control")
      );

      saveButton.onclick = () => saveCliente("socio");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, getCliente("socio"));

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "cliente");
        alert("Excluido com sucesso!");
      };

      break;

    case "dependente":
      title.textContent = "Cliente";
      modal.appendChild(createInput("Nome", "text", "form-control"));
      modal.appendChild(
        createSelect("sexo", "Sexo", false, [
          { id: "1", Nome: "Masculino" },
          { id: "2", Nome: "Feminino" },
        ])
      );
      modal.appendChild(
        createInput("Data de nascimento", "date", "form-control")
      );
      modal.appendChild(
        createSelect("socio", "Sócio", false, getCliente("socio"))
      );
      saveButton.onclick = () => saveCliente("dependente");
      searchButton.onclick = () =>
        getAttributes(
          document.getElementById("id").value,
          getCliente("dependente")
        );

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "cliente");
        alert("Excluido com sucesso!");
      };

      break;

    case "locacao":
      title.textContent = "Locação";

      modal.appendChild(
        createSelect("cliente", "Cliente", false, buscarElementos("cliente"))
      );
      modal.appendChild(
        createSelect(
          "Número de Série",
          "Item Locado",
          false,
          buscarElementos("item")
        )
      );

      modal.appendChild(createInput("Valor", "number", "form-control"));
      modal.appendChild(
        createInput("Data de Devolução", "date", "form-control")
      );

      saveButton.onclick = () => saveLocacao("locacao");
      searchButton.onclick = () =>
        getAttributes(
          document.getElementById("id").value,
          buscarElementos("locacao")
        );

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "locacao");
        alert("Excluido com sucesso!");
      };

      break;

    case "devolucao":
      title.textContent = "Devolução";

      modal.appendChild(
        createInput("Número de Série", "number", "form-control")
      );

      const exluir_id = document.getElementById("div-id");
      exluir_id.textContent = "";

      const numeroDeSerie = document.getElementById("div-Número de Série");

      const button = document.createElement("button");
      button.setAttribute("class", "btn btn-primary");
      button.appendChild(document.createTextNode("Buscar"));
      numeroDeSerie.appendChild(button);
      button.onclick = () =>
        buscarItemPorNumerDeSerie(numeroDeSerie.getElementsByTagName("input"));

      modal.appendChild(createInput("Cliente", "text", "form-control", true));
      modal.appendChild(createInput("Valor", "number", "form-control", true));
      modal.appendChild(
        createInput("Data de Devolução", "date", "form-control", true)
      );

      modal.appendChild(createInput("Valor", "text", "form-control"));
      modal.appendChild(
        createInput("Data de Devolução", "date", "form-control")
      );

      saveButton.onclick = () => {
        alert("Busque o numero de série que deseja desalocar antes de salvar!");
      };

      searchButton.onclick = () =>
        getAttributes(
          document.getElementById("id").value,
          buscarElementos("devolucao")
        );

      deleteButton.onclick = () => {};

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
document
  .getElementById("cadastrar_socio")
  .addEventListener("click", () => preencherModal("socio"));

document
  .getElementById("cadastrar_dependente")
  .addEventListener("click", () => preencherModal("dependente"));

document
  .getElementById("cadastrar_locacao")
  .addEventListener("click", () => preencherModal("locacao"));

document
  .getElementById("cadastrar_locacao")
  .addEventListener("click", calcularValor);

document
  .getElementById("cadastrar_locacao")
  .addEventListener("click", calcularDataDeEntrega);

document
  .getElementById("cadastrar_devolucao")
  .addEventListener("click", () => preencherModal("devolucao"));
