function login() {
  let email = document.getElementById("inputEmail").value.trim();
  let password = document.getElementById("inputPassword").value.trim();
  let send = {
    email: email,
    senha: password,
  };

  $.ajax({
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
        window.location.href = 'file:///C:/Users/gui1kz/Documents/projects/farmaciak2/pagesAdm/pages/home.html'
        localStorage.setItem("Administrador", 1)
      }else{
        window.location.href = "C:/Users/gui1kz/Documents/projects/farmaciak2/pagesAdm/pages/home.html"
        localStorage.setItem("Administrador", 2)
      }
      

    },
    error: function (data) {
      alert("E-mail ou senha erradas.")
    },
  });
}