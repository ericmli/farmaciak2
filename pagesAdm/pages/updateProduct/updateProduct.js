document.addEventListener("DOMContentLoaded", function(){

    pegarInfos()
    hangleLogin()

})

function hangleLogin() {
  const user = localStorage.getItem('Administrador')
  if(user == 1 || user == 2) {
      console.log('Verificado!')
  } else {
      alert('Erro, logar novamente!')
      window.location.href = '../login/login.html'
  }
}

function pegarInfos(){
    let id = localStorage.getItem("idProduto")

    $.ajax({
      url: `http://localhost:2000/api/produto/${id}`,
      type: "GET",
      headers: {
          "accept": "application/json"
      },
      success: function (data) {
        
          document.getElementById("inputNome").value = data.result.nome;
          document.getElementById("inputPreco").value = data.result.preco;
          document.getElementById("inputLaboratorio").value = data.result.laboratorio;
          document.getElementById("inputEstoque").value = data.result.quantidade;
          document.getElementById("inputDescricao").value = data.result.descricao;
          document.getElementById("inputCategoria").value = data.result.categoria;      
          document.getElementById("inputStatus").value = data.result.status;      

      },
      error: function (data) {
        console.log(data);
      },
    });
    $.ajax({
      url: `http://localhost:2000/api/produto/${id}/avaliacoes`,
      type: "GET",
      headers: {
          "accept": "application/json"
      },
      success: function (data) {
          if(data.result[data.result.length - 1]){
          document.getElementById("inputAvaliacao").value = data.result[data.result.length - 1].avaliacao; 
          }
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
    let status = document.getElementById("inputStatus").value.trim();
    let avaliacao = document.getElementById("inputAvaliacao").value.trim();

    if (
        nome.length == 0 ||
        preco == 0 ||
        laboratorio == 0 ||
        estoque == 0 ||
        descricao == 0 ||
        avaliacao.length == 0 
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
    
        if (avaliacao.length == 0) {
          document.getElementById("inputAvaliacao").classList.add(`error`);
        } else {
          document.getElementById("inputAvaliacao").classList.remove(`error`);
        }
      
      } else {
        let newUser = {
          nome : nome,
          descricao : descricao,
          preco : preco,
          quantidade : estoque ,
          laboratorio : laboratorio,
          categoria : categoria,
          status : status,
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
            // window.location.href = "../listProduct/listProduct.html";
            let obj ={
              produto_id : Number(id),
              cliente_id : 1,
              avaliacao: avaliacao
            }
            $.ajax({
              url: `http://localhost:2000/api/produto/${id}/avaliacao`,
              type: "POST",
              headers: {
                accept: "application/json",
              },
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify(obj),
              success: function (data) {
                console.log( 'foi ' ,obj)
                window.location.href = "../listProduct/listProduct.html";
                
              },
              error: function (data) {
                console.log(data);
              },
            });
          },
          error: function (data) {
            console.log(data);
          },
        });
      }
}