document.addEventListener("DOMContentLoaded", function(){

    pegarInfos()

})

function pegarInfos(){
    let id = localStorage.getItem("idProduto")

    $.ajax({
      url: `http://localhost:2000/api/produto/${id}`,
      type: "GET",
      headers: {
          "accept": "application/json"
      },
      success: function (data) {
        console.log(data)
          document.getElementById("inputNome").value = data.result.nome;
          document.getElementById("inputPreco").value = data.result.preco;
          document.getElementById("inputLaboratorio").value = data.result.laboratorio;
          document.getElementById("inputEstoque").value = data.result.quantidade;
          document.getElementById("inputDescricao").value = data.result.descricao;
          document.getElementById("inputCategoria").value = data.result.categoria;      

      },
      error: function (data) {
        console.log(data);
      },
    });
}

function editarInfos(){
    let nome = document.getElementById("inputNome").value.trim();
    let preco = document.getElementById("inputPreco").value.trim();
    let laboratorio = document.getElementById("inputLaboratorio").value.trim();
    let estoque = document.getElementById("inputEstoque").value.trim();
    let descricao = document.getElementById("inputDescricao").value.trim();
    let categoria = document.getElementById("inputCategoria").value.trim();

    if (
        nome.length == 0 ||
        preco == 0 ||
        laboratorio == 0 ||
        estoque == 0 ||
        descricao == 0 ||
        categoria == 0 
      ) {
    
        if (nome.length == 0 || nome.length > 99) {
          document.getElementById("inputNome").classList.add(`error`);
        } else {
          document.getElementById("inputNome").classList.remove(`error`);
        }
    
        if (preco.length == 0) {
          document.getElementById("inputPreco").classList.add(`error`);
        } else {
          document.getElementById("inputPreco").classList.remove(`error`);
        }
    
        if (laboratorio.length == 0) {
          document.getElementById("inputLaboratorio").classList.add(`error`);
        } else {
          document.getElementById("inputLaboratorio").classList.remove(`error`);
        }
    
        if (estoque.length == 0) {
          document.getElementById("inputEstoque").classList.add(`error`);
        } else {
          document.getElementById("inputEstoque").classList.remove(`error`);
        }
    
        if (descricao.length == 0) {
          document.getElementById("inputDescricao").classList.add(`error`);
        } else {
          document.getElementById("inputDescricao").classList.remove(`error`);
        }
    
        if (categoria.length == 0) {
          document.getElementById("inputCategoria").classList.add(`error`);
        } else {
          document.getElementById("inputCategoria").classList.remove(`error`);
        }
      
      } else {
        let newUser = {
          nome : nome,
          descricao : descricao,
          preco : preco,
          quantidade : estoque ,
          laboratorio : laboratorio,
          categoria : categoria,
          img : "https://img.elo7.com.br/product/original/2B33995/caixa-remedio-festa-medico.jpg"
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
            console.log( 'foi ' ,newUser)
            window.location.href = "C:/Users/gui1kz/Documents/projects/farmaciak2/pagesAdm/pages/listProduct.html";
          },
          error: function (data) {
            console.log(data);
          },
        });
      }
}