function login(){
    let email = document.getElementById("inputEmail").value.trim();
    let password = document.getElementById("inputPassword").value.trim();
    let send = {
        email: email,
        senha: password,
    };
    $.ajax({
        url: "http://localhost:2000/api/funcionario",
        type: "POST",
        headers: {
          accept: "application/json",
        },
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(send),
        success: function (data) {
          window.location.href = "C:/Users/gui1kz/Documents/projects/farmaciak2/pagesAdm/pages/list.html";
          console.log('foi',data)
        },
        error: function (data) {
          console.log(data);
        },
      });
}