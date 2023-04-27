document.addEventListener("DOMContentLoaded", function () {
  carregar()
})
const id = localStorage.getItem('idCliente')
const input = document.getElementById('inputCPF');
const celular = document.getElementById('inputCelular');


function validarCPF(cpf) {
  // Remove qualquer caracter que não seja número
  cpf = cpf.replace(/[^\d]+/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  var soma = 0;
  for (var i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  var resto = soma % 11;
  var digito1 = resto < 2 ? 0 : 11 - resto;

  // Verifica o primeiro dígito verificador
  if (parseInt(cpf.charAt(9)) !== digito1) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (var i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  var digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica o segundo dígito verificador
  if (parseInt(cpf.charAt(10)) !== digito2) {
    return false;
  }

  return true;
}

function carregar(){
  

  $.ajax({
    url: `http://localhost:2000/api/cliente/${id}`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      
      document.getElementById("inputNome").value = data.result.nome_completo;
      document.getElementById("inputPassword").value = data.result.senha;
      document.getElementById("inputData").value = data.result.nascimento;
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
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function cadastrar() {
  let name = document.getElementById("inputNome").value.trim();
  let password = document.getElementById("inputPassword").value.trim();
  let date = document.getElementById("inputData").value.trim();


  if (
    name.length == 0 ||
    password == 0 ||
    date.length == 0
  ) {
    if (name.length == 0 || name.length > 99) {
      document.getElementById("inputNome").classList.add(`error`);
    } else {
      document.getElementById("inputNome").classList.remove(`error`);
    }
    if (password.length == 0) {
      document.getElementById("inputPassword").classList.add(`error`);
    } else {
      document.getElementById("inputPassword").classList.remove(`error`);
    }

    if(date.length == 0){
        document.getElementById("inputData").classList.add(`error`);
    }else{
        document.getElementById("inputData").classList.remove(`error`);
    }

    if(cep.length != 9 ){
      document.getElementById("inputCEP").classList.add(`error`);
    }else{
      document.getElementById("inputCEP").classList.remove(`error`);
    }

 

  } else {
    let newUser = {
      nome_completo:name ,
      cpf: cpf,
      nascimento: date,
      email: email,
      senha: password,
      telefone: number
    };

    $.ajax({
      url: `http://localhost:2000/api/cliente/${id}`,
      type: "PUT",
      headers: {
        accept: "application/json",
      },
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(newUser),
      success: function (data) {
        createCep();
        window.location.href = '../home/index.html'
      },
      error: function (data) {
        console.log(data);
      },
    });
  }
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
    url: `http://localhost:2000/api/cliente/endereco/${id}`,
    type: "POST",
    headers: {
      accept: "application/json",
    },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(newUser),
    success: function (data) {
      console.log(data);
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
      console.log(error);
    },
  });
}
