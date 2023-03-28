document.addEventListener("DOMContentLoaded", function(){

    pegarInfos()

})

const input = document.getElementById('inputCPF');

input.addEventListener('input', function() {
    const value = this.value;
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/; // expressão regular para validar CPF com pontos e hífens
    if (!regex.test(value)) {
      this.value = value.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4'); // formata o valor inserido para o formato de CPF com pontos e hífens
    }
  });

function pegarInfos(){
    let id = localStorage.getItem("idFuncionario")

    $.ajax({
      url: `http://localhost:2000/api/funcionario/${id}`,
      type: "GET",
      headers: {
          "accept": "application/json"
      },
      success: function (data) {
        
          document.getElementById("inputNome").value = data.result.nome_completo;
          document.getElementById("inputEmail").value = data.result.email;
          document.getElementById("inputPassword").value = data.result.senha;
          document.getElementById("inputConfirmPassword").value = data.result.senha;
          document.getElementById("inputCPF").value = data.result.cpf;
          document.getElementById("group").value = data.result.grupo;
          document.getElementById("status").value = data.result.status;
      

      },
      error: function (data) {
        console.log(data);
      },
    });
}

  function editarInfos() {
    let name = document.getElementById("inputNome").value.trim();
    let email = document.getElementById("inputEmail").value.trim();
    let password = document.getElementById("inputPassword").value.trim();
    let passwordConfirm = document
      .getElementById("inputConfirmPassword")
      .value.trim();
    let cpf = document.getElementById("inputCPF").value.trim();
    let group = document.getElementById("group").value.trim();
    let status = document.getElementById("status").value.trim();
  
    if (
      name.length == 0 ||
      email.length == 0 ||
      password == 0 ||
      passwordConfirm.length == 0 ||
      cpf.length == 0 ||
      group.length == 0 ||
      status.length == 0 
    ) {
  
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      console.log(email)
      if (emailRegex.test(email)) {
        document.getElementById("inputEmail").classList.remove(`error`);
        console.log(emailRegex.test(email))
      } else {
        document.getElementById("inputEmail").classList.add(`error`);
        console.log(emailRegex.test(email))
      }
    
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
      if (cpfRegex.test(cpf)) {
        document.getElementById("inputCPF").classList.remove(`error`);
        console.log('passou')
      } else {
        document.getElementById("inputCPF").classList.add(`error`);
      }
  
      if (name.length == 0 || name.length > 99) {
        document.getElementById("inputNome").classList.add(`error`);
      } else {
        document.getElementById("inputNome").classList.remove(`error`);
      }
  
      if (password.length == 0 || password != passwordConfirm) {
        document.getElementById("inputPassword").classList.add(`error`);
        if (password != passwordConfirm) {
          document.getElementById("inputPassword").classList.add(`error`);
          document.getElementById("inputConfirmPassword").classList.add(`error`);
        }
      } else {
        document.getElementById("inputPassword").classList.remove(`error`);
      }
  
      if (passwordConfirm.length == 0) {
        document.getElementById("inputConfirmPassword").classList.add(`error`);
      } else {
        document.getElementById("inputConfirmPassword").classList.remove(`error`);
      }
  
      if (group.length == 0) {
        document.getElementById("group").classList.add(`error`);
      } else {
        document.getElementById("group").classList.remove(`error`);
      }
  
      if (status.length == 0) {
        document.getElementById("status").classList.add(`error`);
      } else {
        document.getElementById("status").classList.remove(`error`);
      }
  
    
    } else {
      let newUser = {
        nome_completo: name,
        cpf: cpf,
        email: email,
        senha: password,
        grupo: group,
        status : status,
        logado : false,
      };
      let id = localStorage.getItem("idFuncionario")
      $.ajax({
        url: `http://localhost:2000/api/funcionario/${id}`,
        type: "PUT",
        headers: {
          accept: "application/json",
        },
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(newUser),
        success: function (data) {
            console.log(data);
            console.log(newUser);
            window.location.href = "file:///C:/Codes/Senac/k2farma/pagesAdm/pages/list.html";
        },
        error: function (data) {
          console.log(data);
        },
      });
    }
  }
  