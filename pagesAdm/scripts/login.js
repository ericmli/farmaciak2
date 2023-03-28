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
          window.location.href = "file:///C:/Codes/Senac/k2farma/pagesAdm/pages/list.html";
        },
        error: function (data) {
          console.log(data);
        },
      });
}