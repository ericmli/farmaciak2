document.addEventListener("DOMContentLoaded", function () {

  pegarInfos()

})

function pegarInfos() {
  let id = localStorage.getItem("idProduto")

  $.ajax({
    url: `http://localhost:2000/api/produto/${id}`,
    type: "GET",
    headers: {
      "accept": "application/json"
    },
    success: function (data) {
      document.getElementById("inputEstoque").value = data.result.quantidade;
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function editarInfos() {
  let id = localStorage.getItem("idProduto")
  $.ajax({
    url: `http://localhost:2000/api/produto/${id}`,
    type: "GET",
    headers: {
      "accept": "application/json"
    },
    success: function (data) {
      let nome = data.result.nome
      let descricao = data.result.descricao
      let preco = data.result.preco
      let laboratorio = data.result.laboratorio
      let estoque = document.getElementById("inputEstoque").value.trim();
      let categoria = data.result.categoria
      let status = data.result.status
    
      if ( estoque == 0 ) {
        if (estoque.length == 0) {
          document.getElementById("inputEstoque").classList.add(`error`);
        } else {
          document.getElementById("inputEstoque").classList.remove(`error`);
        }
    
      } else {
        let newUser = {
          nome: nome,
          descricao: descricao,
          preco: preco,
          quantidade: estoque,
          laboratorio: laboratorio,
          categoria: categoria,
          status: status,
          img: "https://img.elo7.com.br/product/original/2B33995/caixa-remedio-festa-medico.jpg"
        };
        let id = localStorage.getItem("idProduto")
        $.ajax({
          url: `http://localhost:2000/api/produto/${id}`,
          type: "PUT",
          headers: {
            accept: "application/json",
          },
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(newUser),
          success: function (data) {
            window.location.href = "../listProduct/listProduct.html";
          },
          error: function (data) {
            console.log(data);
          },
        });
      }
    },
    error: function (data) {
      console.log(data);
    },
  });
 
}