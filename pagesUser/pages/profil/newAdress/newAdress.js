document.addEventListener("DOMContentLoaded", function () {
  carregar()
})
const id = localStorage.getItem('idCliente')
const input = document.getElementById('inputCPF');
const celular = document.getElementById('inputCelular');

function carregar(){
  
  $.ajax({
    url: `http://localhost:2000/api/cliente/${id}/enderecos`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      document.getElementById("inputCEP").value = data.result[0].cep;
      document.getElementById("inputRua").value = data.result[0].rua;
      document.getElementById("inputEstado").value = data.result[0].estado;
      document.getElementById("inputLocalidade").value = data.result[0].cidade;
      document.getElementById("inputNumero").value = data.result[0].numero;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function createCep(){
  let cep = document.getElementById("inputCEP").value.trim();
  let numberHouse = document.getElementById("inputNumero").value.trim();
  let cidade = document.getElementById("inputLocalidade").value.trim();
  let estado = document.getElementById("inputEstado").value.trim();
  let rua = document.getElementById("inputRua").value.trim();

  let newUser = {
    cliente_id: id,
    rua: rua,
    numero: numberHouse,
    cep: cep,
    cidade: cidade,
    estado: estado,
    principal: true
  }
  $.ajax({
    url: `http://localhost:2000/api/cliente/endereco`,
    type: "POST",
    headers: {
      accept: "application/json",
    },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(newUser),
    success: function (data) {
      console.log(data);
      let subtotal = localStorage.getItem('subtotal')
      if(subtotal){
        window.location.href = '../profil.html'
      }
      window.location.href = '../../finishBuy/finishBuy.html'
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function cep() {
  let cep = document.getElementById("inputCEP").value.trim();

  $.ajax({
    url: `https://viacep.com.br/ws/${cep}/json/`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      console.log(data);

      document.getElementById("inputCEP").classList.remove(`error`);

      document.getElementById("inputCEP").value = data.cep;
      document.getElementById("inputRua").value = data.logradouro;
      document.getElementById("inputEstado").value = data.uf;
      document.getElementById("inputLocalidade").value = data.localidade;
    },
    error: function (error) {
      alert('CEP Não existe!');
    },
  });
}
