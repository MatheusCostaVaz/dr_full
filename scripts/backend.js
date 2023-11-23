import { conectaAPI } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function constroiCard(index, titulo, descricao, preco, imagem, categoria) {
  let quantidade = 0;
  const containerProdutos = document.querySelector(
    ".app__section-products-content"
  );
  const card = document.createElement("div");
  card.classList.add("app__card-products");
  card.setAttribute("data-index", index);
  card.innerHTML = `    
  <img class="app__image-products" src="${imagem}" alt="${titulo}" />
  <div class="app__products-details">
    <h3 class="app__title-products">${titulo}</h3>
    <h3 class="app__title-products-descricao">${descricao}</h3>
    <h3 class="app__title-products">
      <strong class="app__title-products-strong">R$ ${preco.toFixed(2)}</strong>
    </h3>
    <button
      class="app__section-products__button app__section-products__button--diminuir"
    >
      <i class="fa-solid fa-minus fa-beat"></i>
    </button>
    <span class="box">${quantidade}</span>
    <button
      class="app__section-products__button app__section-products__button--aumentar"
    >
      <i class="fa-solid fa-plus fa-beat"></i>
    </button>
    <p class="categoria" hidden>${categoria}</p>
  </div>    
    `;

  containerProdutos.appendChild(card);

  card
    .querySelector(".app__section-products__button--diminuir")
    .addEventListener("click", () => {
      diminuirQuantidade(card);
    });

  card
    .querySelector(".app__section-products__button--aumentar")
    .addEventListener("click", () => {
      aumentarQuantidade(card);
    });
}

async function listaProdutos() {
  const listaAPI = await conectaAPI.listaProdutos();
  listaAPI.forEach((elemento, index) =>
    constroiCard(
      index,
      elemento.titulo,
      elemento.descricao,
      elemento.preco,
      elemento.imagem,
      elemento.categoria
    )
  );
}

listaProdutos();

exibirCarrinhoNaTela();

function diminuirQuantidade(card) {
  const box = card.querySelector(".box");
  let quantidade = parseInt(box.textContent);

  quantidade = Math.max(0, quantidade - 1);

  box.textContent = quantidade;
}

function aumentarQuantidade(card) {
  const box = card.querySelector(".box");
  let quantidade = parseInt(box.textContent);

  quantidade++;

  box.textContent = quantidade;
}
