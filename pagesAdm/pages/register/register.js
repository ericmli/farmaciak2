const input = document.getElementById('inputCPF');

input.addEventListener('input', function() {
    const value = this.value;
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/; // expressão regular para validar CPF com pontos e hífens
    if (!regex.test(value)) {
      this.value = value.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4'); // formata o valor inserido para o formato de CPF com pontos e hífens
    }
});

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



function cadastrar() {
  console.log('efsd')
  let name = document.getElementById("inputNome").value.trim();
  let email = document.getElementById("inputEmail").value.trim();
  let password = document.getElementById("inputPassword").value.trim();
  let passwordConfirm = document.getElementById("inputConfirmPassword").value.trim();
  let cpf = document.getElementById("inputCPF").value.trim();
  let group = document.getElementById("group").value.trim();


  if (
    name.length == 0 ||
    email.length == 0 ||
    password == 0 ||
    passwordConfirm.length == 0 ||
    cpf.length == 0 ||
    group.length == 0 ||
    password !== passwordConfirm
  ) {

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email)) {
      document.getElementById("inputEmail").classList.remove(`error`);
    } else {
      document.getElementById("inputEmail").classList.add(`error`);
    }
    
    if (validarCPF(cpf)) {
      document.getElementById("inputCPF").classList.remove(`error`);
    } else {
      document.getElementById("inputCPF").classList.add(`error`);
    }

    if (name.length == 0 || name.length > 99) {
      document.getElementById("inputNome").classList.add(`error`);
    } else {
      document.getElementById("inputNome").classList.remove(`error`);
    }

    if (password.length == 0 || password !== passwordConfirm) {
      document.getElementById("inputPassword").classList.add(`error`);
      document.getElementById("inputConfirmPassword").classList.add(`error`);
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
  
  } else {
    let newUser = {
      nome_completo: name,
      cpf: cpf,
      email: email,
      senha: password,
      grupo: group,
      status : "Ativo",
      logado : false,
    };

    $.ajax({
      url: "http://localhost:2000/api/funcionario",
      type: "POST",
      headers: {
        accept: "application/json",
      },
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(newUser),
      success: function (data) {
        window.location.href = "file:///C:/Codes/Senac/k2farma/pagesAdm/pages/list/list.html";
      },
      error: function (data) {
        alert("E-mail ou CPF já existente!")
      },
    });
  }
}
