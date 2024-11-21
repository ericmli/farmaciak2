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
    url: "http://localhost:2000/api/login",
    type: "POST",
    headers: {
      accept: "application/json",
    },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(send),
    success: function (data) {
      let id = localStorage.getItem("id")
      if(data?.data.grupo == 'Administrador') {
        window.location.href = '../home/home.html'
        localStorage.setItem("Administrador", 1)
      }else{
        window.location.href = '../home/home.html'
        localStorage.setItem("Administrador", 2)
      }
      

    },
    error: function (data) {
      console.log(data.responseJSON.error)
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: data.responseJSON.error,
      });
    },
  });
}}