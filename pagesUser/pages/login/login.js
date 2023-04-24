function login() {
  let email = document.getElementById("inputEmail").value.trim();
  let password = document.getElementById("inputPassword").value.trim();
  let send = {
    email: email,
    senha: password,
  };

  if(email.length == 0 || password.length == 0){
    if (email.length != 0) {
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
      localStorage.setItem("logado", true)
      localStorage.setItem("perfil", JSON.stringify(data.data))
    },
    error: function (data) {
      alert("E-mail ou senha erradas.")
    },
  });
}}