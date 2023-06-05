document.addEventListener("DOMContentLoaded", function () {
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

function cadastrar() {

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
  
  }else {
    // window.location.href = "../listProduct/listProduct.html";
  }
  
}
