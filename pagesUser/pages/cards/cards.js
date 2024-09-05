document.addEventListener("DOMContentLoaded", function () {
  load();
  loadAvaliacoes();
  checkLogin();
  profil()
});

let id = localStorage.getItem("idProducts");
function profil(){

  const logado = localStorage.getItem('logado')
  const nome = localStorage.getItem('nome')

  let loged = ''
  if(logado){
      console.log(logado)
      let add = ''
      add += `
      <li class="nav-item active">
          <a class="nav-link" href="../profil/profil.html">${nome.toLocaleUpperCase()}</a>
      </li>
      `
      document.getElementById('addProfil').innerHTML = add

      loged += `
      <ul class="dropdown-menu">
      <li><a class="dropdown-item" onclick="sair()">Sair</a></li>
      </ul>
      `
      document.getElementById('isLoged').innerHTML = loged
  }else{

      loged += `
      <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="../login/login.html">Entrar</a></li>
      <li><a class="dropdown-item" href="../register/register.html">Registrar</a></li>
      </ul>
      `
      document.getElementById('isLoged').innerHTML = loged
  }
  
}
function load() {
  $.ajax({
    url: `http://localhost:2000/api/produto/${id}`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      let status = data.result.status === "Ativo" ? "Disponível" : "Indisponível";

      // Atualiza as informações no HTML existente
      document.querySelector(".imgMain").src = `../../../${data.result.img}`;
      document.querySelector(".textNome").innerText = data.result.nome;
      document.querySelector(".textDescricao").innerText = data.result.descricao;
      document.querySelector(".textPreco").innerText = `R$ ${data.result.preco}`;
      document.querySelector(".textLab").innerText = `Laboratório: ${data.result.laboratorio}`;
    },
    error: function (error) {
      console.error("Erro ao carregar o produto:", error);
    },
  });
}

function loadAvaliacoes() {
  $.ajax({
    url: `http://localhost:2000/api/produto/${id}/avaliacoes`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      let htmlAvaliacoes = "";
      let totalAval = 0;
      let quantidadeAval = data.result.length;

      if (quantidadeAval > 0) {
        for (let i = 0; i < quantidadeAval; i++) {
          totalAval += data.result[i].avaliacao;
        }

        let mediaAval = Math.round((totalAval / quantidadeAval) * 2) / 2;

        // Gerar as estrelas de acordo com a média das avaliações
        for (let i = 1; i <= 5; i++) {
          if (i <= mediaAval) {
            htmlAvaliacoes += `<img src="../../../src/icons/estrelaInteira.png" class="estrelasAval" alt="Estrela cheia">`;
          } else if (i - 0.5 === mediaAval) {
            htmlAvaliacoes += `<img src="../../../src/icons/metadeEstrela.png" class="estrelasAval" alt="Meia estrela">`;
          } else {
            htmlAvaliacoes += `<img src="../../../src/icons/estrelaVazia.png" class="estrelasAval" alt="Estrela vazia">`;
          }
        }
      } else {
        htmlAvaliacoes = "<h4>Produto não possui avaliações.</h4>";
      }

      document.getElementById("notas").innerHTML = htmlAvaliacoes;
    },
    error: function (error) {
      console.error("Erro ao carregar as avaliações:", error);
    },
  });
}

function car() {
  $.ajax({
    url: `http://localhost:2000/api/produto/${id}`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      const item = localStorage.getItem("sendCar");
      const response = data.result;
      const quantidadeProduto = document.getElementById("tentacles").value;
      let cart = [];

      if (item) {
        cart = JSON.parse(item);
        const existingItem = cart.find((i) => i.id === response.id);
        if (existingItem) {
          existingItem.quantity += parseInt(quantidadeProduto);
        } else {
          cart.push({ ...response, quantidadeProduto });
        }
      } else {
        cart = [{ ...response, quantidadeProduto }];
      }

      localStorage.setItem("sendCar", JSON.stringify(cart));
      window.location.href = "../home/index.html";
    },
    error: function (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    },
  });
}

function checkLogin() {
  const logado = localStorage.getItem("logado");
  const nome = localStorage.getItem("nome");

  let html = '';

  if (logado) {
    html += `<a class="dropdown-item" href="#">${nome.toUpperCase()}</a>`;
    html += '<a class="dropdown-item" href="#">Sair</a>';
  } else {
    html += '<a class="dropdown-item" href="../login/login.html">Entrar</a>';
  }

  document.getElementById("isLoged").innerHTML = html;
}
