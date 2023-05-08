document.addEventListener("DOMContentLoaded", function () {
  carregar()
})
const id = localStorage.getItem('idCliente')

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
          console.log(data.result)

          let add = ''
          for(let i = 0 ; i < data.result.length ; i++){
            if(data.result[i].principal === 1){
              add += `
              <option selected disabled>${data.result[i].cep}</option>
              `
            }else{
              add += `
              <option>${data.result[i].cep}</option>
              `
            }
          }
          document.getElementById('inputCEP').innerHTML = add
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

function atualizar() {
  let name = document.getElementById("inputNome").value.trim();
  let password = document.getElementById("inputPassword").value.trim();
  let date = document.getElementById("inputData").value.trim();
  let cep = document.getElementById("inputCEP").value.trim();


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
    $.ajax({
      url: `http://localhost:2000/api/cliente/${id}`,
      type: "GET",
      headers: {
        accept: "application/json",
      },
      success: function (data) {
        let newUser = {
          nome_completo: name ,
          cpf: data.result.cpf,
          nascimento: date,
          email: data.result.email,
          senha: password,
          telefone: data.result.telefone
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
            // window.location.href = '../home/index.html'
            console.log(data)
          },
          error: function (data) {
            console.log(data);
          },
        });
      },
      error: function (error) {
        console.log(error);
      },
    });
    
  }
}

function createCep(){
  let cep = document.getElementById("inputCEP").value.trim();
  $.ajax({
    url: `http://localhost:2000/api/cliente/${id}/enderecos`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      for(let i = 0 ; i < data.result.length ; i ++){
        console.log(data.result[i].principal, '$%$%$%$%$$%$%')
        if(data.result[i].cep === cep){
          console.log(id)
        let newUser = {
          cliente_id: id,
          rua: data.result[i].rua,
          numero: data.result[i].numero,
          cidade: data.result[i].cidade,
          estado: data.result[i].estado,
          cep: data.result[i].cep,
          principal: 1,
          faturamento: null
        }
          $.ajax({
          url: `http://localhost:2000/api/cliente/endereco/${id}`,
          type: "PUT",
          headers: {
            accept: "application/json",
          },
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(newUser),
          success: function (date) {

          },
          error: function (data) {
            console.log(data);
          },
        });
        }
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
  
}