document.addEventListener("DOMContentLoaded", function () {
  carregar()
})
const id = localStorage.getItem('idCliente')

function carregar() {

  // Faz a requisição AJAX para obter os dados do cliente
  $.ajax({
    url: `http://localhost:2000/api/cliente/${id}`, // URL do endpoint com o ID do cliente
    type: "GET", // Método HTTP GET para buscar dados
    headers: {
      accept: "application/json", // Define que a resposta esperada é JSON
    },

    // Função de callback para o caso de sucesso
    success: function (data) {

      // Popula os campos de nome, senha e data de nascimento com os dados recebidos
      document.getElementById("inputNome").value = data.result.nome_completo;
      document.getElementById("inputPassword").value = data.result.senha;
      document.getElementById("inputData").value = data.result.nascimento;

      // Faz a requisição AJAX para buscar os endereços do cliente
      $.ajax({
        url: `http://localhost:2000/api/cliente/${id}/enderecos`, // URL para obter os endereços do cliente
        type: "GET", // Método HTTP GET para buscar dados de endereço
        headers: {
          accept: "application/json", // Define que a resposta esperada é JSON
        },

        // Função de callback para o caso de sucesso
        success: function (data) {

          // Preenche o campo de CEP com o primeiro endereço
          document.getElementById("inputCEP").value = data.result[0].cep;
          console.log(data.result); // Exibe os dados no console para depuração

          // Inicializa a variável para armazenar as opções de CEP
          let add = '';

          // Loop para criar opções de CEP no elemento select
          for (let i = 0; i < data.result.length; i++) {
            if (data.result[i].principal === 1) { // Verifica se o endereço é o principal
              add += `
              <option selected disabled>${data.result[i].cep}</option>
              `;
            } else {
              add += `
              <option>${data.result[i].cep}</option>
              `;
            }
          }

          // Insere as opções de CEP no elemento select
          document.getElementById('inputCEP').innerHTML = add;
        },

        // Função de callback para o caso de erro ao carregar os endereços
        error: function (error) {
          console.log(error); // Exibe o erro no console
        },
      });
    },

    // Função de callback para o caso de erro ao carregar os dados do cliente
    error: function (error) {
      console.log(error); // Exibe o erro no console
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