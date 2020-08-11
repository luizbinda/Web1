const modal = document.getElementById("modal_body");
const fecharModal = document.getElementById("btnFechar");

const api = "https://backend-locadora.herokuapp.com";

const store = (route, body) => {
  fetch(`${api}/${route}`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      if (Array.isArray(json)) {
        json.map((data) => alert(data.message));
      } else {
        alert("Cadastrado feito com sucesso!");
      }
    });
};

const update = (route, body) => {
  fetch(`${api}/${route}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      if (Array.isArray(json)) {
        json.map((data) => alert(data.message));
      } else {
        alert("Atualização feita com sucesso!");
      }
    });
};

const index = async (route) => {
  const response = [];
  await fetch(`${api}/${route}`)
    .then((response) => response.json())
    .then((json) => json.map((item) => response.push(item)));
  return response;
};

const show = async (route, id) => {
  if (!id) return false;
  let response = null;
  await fetch(`${api}/${route}/${id}`)
    .then((response) => response.status === 200 && response.json())
    .then((json) => (response = json));
  return response;
};

const deleteItem = (route, id) => {
  fetch(`${api}/${route}/${id}`, { method: "DELETE" }).then((response) => {
    response.status === 204 && alert("Excluido com sucesso!");
    response.status === 404 &&
      response.json().then((json) => json.map((data) => alert(data.message)));
  });
};

const createInput = (content, tipo, classe, id, disable = false) => {
  const div = document.createElement("div");

  const span = document.createElement("span");
  span.setAttribute("class", "input-group-text");
  span.appendChild(document.createTextNode(content));

  const divContent = document.createElement("div");
  div.setAttribute("class", "input-group-prepend margin");
  div.setAttribute("id", `div-${id}`);
  divContent.appendChild(span);

  const input = document.createElement("input");
  input.setAttribute("type", tipo);
  input.setAttribute("class", classe);
  input.setAttribute("id", id);
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

  div.setAttribute("id", `div-${tipo}`);

  const span = document.createElement("span");
  span.setAttribute("class", "input-group-text");
  span.appendChild(document.createTextNode(nome));

  const divContent = document.createElement("div");
  div.setAttribute("class", "input-group-prepend margin");
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
      ? option.appendChild(document.createTextNode(element["numSerie"]))
      : option.appendChild(document.createTextNode(element.nome));
    select.appendChild(option);
  });

  div.appendChild(divContent);
  div.appendChild(select);

  return div;
};

const saveType = async (tipo) => {
  const inputs = [...modal.getElementsByTagName("input")];
  const selects = [...modal.getElementsByTagName("select")];

  const id = document.getElementById("id").value;

  const element = await show(tipo, id);

  const insert = {};
  element
    ? (() => {
        inputs.forEach((input) => (element[input.id] = input.value));
        selects.forEach((select) => {
          const selecteds = [...select.children];
          if (select.attributes.multiple) {
            selecteds.forEach((selected) => {
              if (
                element[`${selected.attributes.nome_tipo.value}_id`] ===
                undefined
              )
                element[`${selected.attributes.nome_tipo.value}_id`] = [];

              if (selected.selected)
                element[`${selected.attributes.nome_tipo.value}_id`].push(
                  selected.attributes.id_tipo.value
                );
            });
          } else {
            selecteds.forEach((selected) => {
              select[selected.index].selected = selected.selected;
              selected.attributes.nome_tipo.value === "Número de Série"
                ? (element["item_id"] =
                    select[select.selectedIndex].attributes.id_tipo.value)
                : (element[`${selected.attributes.nome_tipo.value}_id`] =
                    select[select.selectedIndex].attributes.id_tipo.value);
            });
          }
        });
        update(tipo, element);
      })()
    : (() => {
        inputs.forEach((input) => (insert[input.id] = input.value));
        selects.forEach((select) => {
          const selecteds = [...select.children];
          if (select.attributes.multiple) {
            selecteds.forEach((selected) => {
              if (
                insert[`${selected.attributes.nome_tipo.value}_id`] ===
                undefined
              )
                insert[`${selected.attributes.nome_tipo.value}_id`] = [];

              if (selected.selected)
                insert[`${selected.attributes.nome_tipo.value}_id`].push(
                  selected.attributes.id_tipo.value
                );
            });
          } else {
            selecteds.forEach((selected) => {
              select[selected.index].selected = selected.selected;
              selected.attributes.nome_tipo.value === "Número de Série"
                ? (insert["item_id"] =
                    select[select.selectedIndex].attributes.id_tipo.value)
                : (insert[`${selected.attributes.nome_tipo.value}_id`] =
                    select[select.selectedIndex].attributes.id_tipo.value);
            });
          }
        });
        store(tipo, insert);
      })();

  fecharModal.click();
};

const calcularValoreData = async () => {
  const item = document.getElementById("Item");

  const response_item = await show(
    "item",
    item.options[item.selectedIndex].attributes.id_tipo.value
  );
  const valor = document.getElementById("valor");
  valor.value = response_item.titulo.classe.valor;

  const dataDevolucaoInput = document.getElementById("data_devolucao_prevista");

  const dataDevolucao = new Date();
  dataDevolucao.setDate(
    dataDevolucao.getDate() + response_item.titulo.classe.prazo_devolucao
  );
  const dataArray = dataDevolucao.toLocaleDateString("pt-BR").split("/");

  dataDevolucaoInput.value = `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
};

const saveCliente = async () => {
  const select_socio = document.getElementById("Sócio");
  if (select_socio) {
    const socio_id =
      select_socio[select_socio.selectedIndex].attributes.id_tipo.value;
    const dependetes = await index(`cliente?cliente_id=${socio_id}`);
    if (dependetes.length >= 3) {
      alert("Este Sócio já atingiu o numero máximo de depentes");
      return;
    }
  }
  saveType("cliente");
};

const getAttributes = async (id, tipo) => {
  const element = await show(tipo, id);
  if (!element) {
    alert(`Id não encontrado!`);
    return;
  }

  [...modal.getElementsByTagName("input")].forEach((input) => {
    if (input.attributes.type.value === "date") {
      const data_formatada = element[input.id].split("T");
      input.value = data_formatada[0];
    } else {
      input.value = element[input.id];
    }
  });

  [...modal.getElementsByTagName("select")].forEach((select) => {
    const selecteds = [...select.children];
    if (select.attributes.multiple) {
      selecteds.forEach((options) => {
        element[options.attributes.nome_tipo.value].forEach((elementItem) => {
          if (
            Number(options.attributes.id_tipo.value) ===
            elementItem[`${options.attributes.nome_tipo.value}_id`]
          )
            select[options.index].selected = true;
        });
      });
    } else {
      selecteds.forEach((options) => {
        if (
          Number(options.attributes.id_tipo.value) ===
          element[options.attributes.nome_tipo.value].id
        )
          select[options.index].selected = true;
      });
    }
  });
};

const deleteAttribute = async (id, tipo) => {
  const element = await show(tipo, id);

  if (!element) {
    alert(`Id não encontrado!`);
    fecharModal.click();
    return;
  }
  const excluir = confirm("Tem certeza que deseja excluir?");
  if (!excluir) return;
  await deleteItem(tipo, id);
  fecharModal.click();
};

const buscarItemPorNumerDeSerie = async (numeroDeSerie) => {
  const item = await show("item", `${numeroDeSerie[0].value}?numSerie=true`);
  const cliente = document.getElementById("cliente");
  const valor = document.getElementById("valor");
  const data = document.getElementById("data_devolucao");

  if (!item || !item.locacao_id) {
    data.value = "";
    valor.value = "";
    cliente.value = "";
    document.getElementById("save").onclick = () => {
      alert("Busque o numero de série que deseja desalocar antes de salvar!");
    };
    alert("Item não Alocado");
  } else {
    const locacao = await show("locacao", item.locacao_id);
    const data_devolucao_prevista_array = locacao.data_devolucao_prevista.split(
      "T"
    );
    const data_devolucao_comparacao = new Date(
      data_devolucao_prevista_array[0]
    ).getTime();

    const data_atual = new Date().toLocaleDateString("en");

    const data_atual_comparacao = new Date(data_atual).getTime();

    if (data_atual_comparacao < data_devolucao_comparacao)
      valor.value = locacao.valor + locacao.multa;
    else valor.value = locacao.valor;

    cliente.value = locacao.cliente.nome;
    const data_formatada = locacao.data_locacao.split("T");
    data.value = data_formatada[0];
    const { id } = locacao;
    document.getElementById("save").onclick = () => {
      store("devolucao", { id });
      fecharModal.click();
    };
  }
};

const consultarTipo = async (tipo, value) => {
  const titulo = document.getElementById("div-titulo");
  titulo && modal.removeChild(titulo);
  modal.appendChild(
    createSelect(
      "titulo",
      "Título",
      false,
      await index(`titulo?${tipo}=${value}`)
    )
  );
};

const consultas = async (tipo_consulta) => {
  modal.textContent = "";
  const div = document.createElement("div");
  div.setAttribute("class", "input-group flex-nowrap buscar-flex");

  const tipo_busca = document.createElement("p");
  tipo_busca.setAttribute("class", "input-group-text");
  tipo_busca.appendChild(document.createTextNode("Tipo de Consulta"));

  const button_buscar_nome = document.createElement("button");
  button_buscar_nome.setAttribute("class", "btn btn-primary");
  button_buscar_nome.appendChild(document.createTextNode("Nome"));

  const button_buscar_categoria = document.createElement("button");
  button_buscar_categoria.setAttribute("class", "btn btn-primary");
  button_buscar_categoria.appendChild(document.createTextNode("Categoria"));

  const button_buscar_ator = document.createElement("button");
  button_buscar_ator.setAttribute("class", "btn btn-primary");
  button_buscar_ator.appendChild(document.createTextNode("Ator"));

  button_buscar_nome.onclick = () => consultas("nome");
  button_buscar_categoria.onclick = () => consultas("categoria");
  button_buscar_ator.onclick = () => consultas("ator");

  div.appendChild(tipo_busca);
  div.appendChild(button_buscar_nome);
  div.appendChild(button_buscar_categoria);
  div.appendChild(button_buscar_ator);

  modal.appendChild(div);

  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-primary");
  button.appendChild(document.createTextNode("Buscar"));

  switch (tipo_consulta) {
    case "nome":
      modal.appendChild(
        createSelect("titulo", "Título", false, await index("titulo"))
      );
      document.getElementById("buscar").onclick = () =>
        realizarConsulta(
          `${
            document.getElementById("Título")[
              document.getElementById("Título").selectedIndex
            ].attributes.id_tipo.value
          }`,
          "titulo"
        );
      break;
    case "categoria":
      const categoria = createInput(
        "Categoria",
        "text",
        "form-control",
        "categoria"
      );
      categoria.appendChild(button);
      button.onclick = () =>
        consultarTipo("categoria", document.getElementById("categoria").value);
      modal.appendChild(categoria);

      break;
    case "ator":
      const ator = createSelect("ator", "Ator", false, await index("ator"));
      ator.appendChild(button);

      button.onclick = () =>
        consultarTipo(
          "ator",
          document.getElementById("Ator")[
            document.getElementById("Ator").selectedIndex
          ].attributes.id_tipo.value
        );
      modal.appendChild(ator);

      break;
    default:
      break;
  }
};

const realizarConsulta = async (id) => {
  const element = await show("titulo", id);

  const titulo = document.getElementById("div-titulo");
  titulo && modal.removeChild(titulo);

  modal.appendChild(createInput("Nome", "text", "form-control", "nome", true));
  modal.appendChild(
    createInput("sinopse", "text", "form-control", "sinopse", true)
  );
  modal.appendChild(
    createInput("categoria", "text", "form-control", "categoria", true)
  );
  modal.appendChild(createInput("ano", "date", "form-control", "ano", true));
  modal.appendChild(
    createInput("diretor", "text", "form-control", "diretor", true)
  );
  modal.appendChild(
    createInput("classe", "text", "form-control", "classe", true)
  );

  element.ator.forEach((ator) => {
    modal.appendChild(
      createInput("Ator", "text", "form-control", `nome${ator.id}`, true)
    );
  });

  document.getElementById("nome").value = element.nome;
  document.getElementById("sinopse").value = element.sinopse;
  document.getElementById("categoria").value = element.categoria;
  const data_formatada = element.ano.split("T");
  document.getElementById("ano").value = data_formatada[0];
  document.getElementById("diretor").value = element.diretor.nome;
  document.getElementById("classe").value = element.classe.nome;

  element.ator.forEach((ator) => {
    document.getElementById(`nome${ator.id}`).value = ator.ator.nome;
  });
};

const preencherModal = async (tipo) => {
  const title = document.getElementById("exampleModalLabel");
  const saveButton = document.getElementById("save");
  const searchButton = document.getElementById("buscar");
  const deleteButton = document.getElementById("deletar");
  modal.textContent = "";
  modal.appendChild(createInput("id", "number", "form-control", "id"));
  const exluir_id = document.getElementById("div-id");

  switch (tipo) {
    case "ator":
      title.textContent = "Ator";
      modal.appendChild(createInput("Nome", "text", "form-control", "nome"));

      saveButton.onclick = () => saveType("ator");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "ator");
      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "ator");
      };
      break;

    case "classe":
      title.textContent = "Classe";
      modal.appendChild(createInput("Nome", "text", "form-control", "nome"));
      modal.appendChild(createInput("Valor", "text", "form-control", "valor"));
      modal.appendChild(
        createInput(
          "Dias para devolução",
          "number",
          "form-control",
          "prazo_devolucao"
        )
      );
      saveButton.onclick = () => saveType("classe");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "classe");

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "classe");
      };
      break;

    case "diretor":
      title.textContent = "Diretor";
      modal.appendChild(createInput("Nome", "text", "form-control", "nome"));
      saveButton.onclick = () => saveType("diretor");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "diretor");

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "diretor");
      };
      break;

    case "titulo":
      title.textContent = "Titulo";
      modal.appendChild(createInput("Nome", "text", "form-control", "nome"));
      modal.appendChild(
        createSelect("diretor", "Diretor", false, await index("diretor"))
      );
      modal.appendChild(
        createSelect("ator", "Atores", true, await index("ator"))
      );
      modal.appendChild(createInput("Ano", "date", "form-control", "ano"));
      modal.appendChild(
        createInput("Sinopse", "text", "form-control", "sinopse")
      );
      modal.appendChild(
        createInput("Categoria", "text", "form-control", "categoria")
      );
      modal.appendChild(
        createSelect("classe", "Classe", false, await index("classe"))
      );
      saveButton.onclick = () => saveType("titulo");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "titulo");
      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "titulo");
      };
      break;

    case "item":
      title.textContent = "Item";
      modal.appendChild(
        createInput("Número de Série", "number", "form-control", "numSerie")
      );
      modal.appendChild(
        createSelect("titulo", "Titulo", false, await index("titulo"))
      );
      modal.appendChild(
        createInput(
          "Data de aquisição",
          "date",
          "form-control",
          "data_aquisicao"
        )
      );
      modal.appendChild(createInput("Tipo", "text", "form-control", "tipo"));
      saveButton.onclick = () => saveType("item");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "item");

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "item");
      };
      break;

    case "socio":
      title.textContent = "Cliente";
      modal.appendChild(createInput("Nome", "text", "form-control", "nome"));
      modal.appendChild(
        createInput("Endereço", "text", "form-control", "endereco")
      );
      modal.appendChild(
        createInput("telefone", "text", "form-control", "telefone")
      );
      modal.appendChild(
        createSelect("sexo", "Sexo", false, [
          { id: "Masculino", nome: "Masculino" },
          { id: "Masculino", nome: "Feminino" },
        ])
      );
      modal.appendChild(createInput("CPF", "text", "form-control", "cpf"));
      modal.appendChild(
        createInput(
          "Data de nascimento",
          "date",
          "form-control",
          "data_nascimento"
        )
      );

      saveButton.onclick = saveCliente;
      searchButton.onclick = () =>
        getAttributes(
          `${document.getElementById("id").value}?socio=true`,
          "cliente"
        );

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "cliente");
      };

      break;

    case "dependente":
      title.textContent = "Cliente";
      modal.appendChild(createInput("Nome", "text", "form-control", "nome"));
      modal.appendChild(
        createSelect("sexo", "Sexo", false, [
          { id: "1", nome: "Masculino" },
          { id: "2", nome: "Feminino" },
        ])
      );
      modal.appendChild(
        createInput(
          "Data de nascimento",
          "date",
          "form-control",
          "data_nascimento"
        )
      );
      modal.appendChild(
        createSelect(
          "socio",
          "Sócio",
          false,
          await index("cliente?dependente=true")
        )
      );
      saveButton.onclick = saveCliente;
      searchButton.onclick = () =>
        getAttributes(
          `${document.getElementById("id").value}?dependente=true`,
          "cliente"
        );

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "cliente");
      };

      break;

    case "locacao":
      title.textContent = "Locação";

      modal.appendChild(
        createSelect("cliente", "Cliente", false, await index("cliente"))
      );

      modal.appendChild(
        createSelect("Número de Série", "Item", false, await index("item"))
      );

      modal.appendChild(
        createInput("Valor", "number", "form-control", "valor")
      );
      modal.appendChild(
        createInput("Multa", "number", "form-control", "multa")
      );
      modal.appendChild(
        createInput(
          "Data de Devolução",
          "date",
          "form-control",
          "data_devolucao_prevista"
        )
      );

      calcularValoreData();
      const item_select = document.getElementById("Item");
      item_select.onchange = calcularValoreData;

      saveButton.onclick = () => saveType("locacao");
      searchButton.onclick = () =>
        getAttributes(document.getElementById("id").value, "locacao");

      deleteButton.onclick = () => {
        deleteAttribute(document.getElementById("id").value, "locacao");
      };

      break;

    case "devolucao":
      title.textContent = "Devolução";

      modal.appendChild(
        createInput("Número de Série", "number", "form-control", "numSerie")
      );

      exluir_id.textContent = "";

      const numeroDeSerie = document.getElementById("div-numSerie");

      const button = document.createElement("button");
      button.setAttribute("class", "btn btn-primary");
      button.appendChild(document.createTextNode("Buscar"));
      numeroDeSerie.appendChild(button);

      button.onclick = () =>
        buscarItemPorNumerDeSerie(numeroDeSerie.getElementsByTagName("input"));

      modal.appendChild(
        createInput("Cliente", "text", "form-control", "cliente", true)
      );
      modal.appendChild(
        createInput("Valor", "number", "form-control", "valor", true)
      );
      modal.appendChild(
        createInput(
          "Data de Devolução",
          "date",
          "form-control",
          "data_devolucao",
          true
        )
      );

      saveButton.onclick = () => {
        alert(
          "Informe o numero de série que deseja desalocar antes de salvar!"
        );
      };

      searchButton.setAttribute("disabled", true);
      deleteButton.setAttribute("disabled", true);
      document.getElementById("btn_close").onclick = () => {
        searchButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
      };

      fecharModal.onclick = () => {
        searchButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
      };
      break;

    case "consultar":
      title.textContent = "Consultas de Titulos";
      exluir_id.textContent = "";
      consultas("nome");

      saveButton.setAttribute("disabled", true);
      deleteButton.setAttribute("disabled", true);
      document.getElementById("btn_close").onclick = () => {
        saveButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
      };

      fecharModal.onclick = () => {
        saveButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
      };

      searchButton.onclick = () => {
        alert("Informe o Titulo que deseja buscar!");
      };
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
  .getElementById("cadastrar_devolucao")
  .addEventListener("click", () => preencherModal("devolucao"));

document
  .getElementById("consultar")
  .addEventListener("click", () => preencherModal("consultar"));
