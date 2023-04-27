function login() {
  let email = document.getElementById("inputEmail").value.trim();
  let password = document.getElementById("inputPassword").value.trim();
  let send = {
    email: email,
    senha: password,
  };

  if(email.length == 0 || password.length == 0){
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email)) {
      document.getElementById("inputEmail").classList.remove(`error`);
    } else {
      document.getElementById("inputEmail").classList.add(`error`);
    }
    if (password.length != 0) {
      document.getElementById("inputPassword").classList.remove(`error`);
    } else {
      document.getElementById("inputPassword").classList.add(`error`);
    }
    
  }else {$.ajax({
    url: "http://localhost:2000/api/cliente/login",
    type: "POST",
    headers: {
      accept: "application/json",
    },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(send),
    success: function (data) {
      localStorage.setItem("idCliente", data.data.id)
      localStorage.setItem("logado", true)
      localStorage.setItem("nome", (data.data.nome_completo))
      localStorage.setItem("cpf", (data.data.cpf))
      localStorage.setItem("nascimento", (data.data.nascimento))
      localStorage.setItem("email", (data.data.email))
      window.location.href = '../home/index.html'
    },
    error: function (data) {
      alert("E-mail ou senha erradas.")
    },
  });
}}