document.addEventListener("DOMContentLoaded", function () {
    pegarFuncionario()
})

function pegarFuncionario() {
    $.ajax({
        url: "http://localhost:2000/api/funcionarios",
        type: "GET",
        headers: {
            "accept": "application/json"
        },
        success: function (data) {
            let htmlTab = ''
            for (let i = 0; data.result.length > i ; i++) {
                let irineu = ''
                if(data.result[i].status == "Ativo"){
                    irineu = "Inativo"
                }else{
                    irineu = "Ativo"
                }
                htmlTab += `
                <tr>
                    <th scope="row">${data.result[i].id}</th>
                    <td>${data.result[i].nome_completo}</td>
                    <td>${data.result[i].email}</td>
                    <td>${data.result[i].grupo}</td>
                    <td> <button type="button" class="btn btn-primary"  return false>${irineu}</button> </td>
                    <td> <button type="button" class="btn btn-warning" onclick="editarFuncionario(${data.result[i].id})"; return false>Editar</button> </td>
                    <td> <button type="button" class="btn btn-danger" onclick="deleteFuncionario(${data.result[i].id})"; return false>Deletar</button> </td>
                </tr>
                `
                document.getElementById('infosFuncionario').innerHTML = htmlTab
            }
        },
        error: function (data) {
            console.log(data)
        }
    })
}

function deleteFuncionario(id) {

    $.ajax({
        url: `http://localhost:2000/api/funcionario/${id}`,
        type: "DELETE",
        headers: {
            "accept": "application/json"
        },
        success: function (data) {
            console.log(data)
            pegarFuncionario()


        },
        error: function (data) {
            console.log(data)

        }
    })

}

function editarFuncionario(id) {

    localStorage.setItem("idFuncionario", id)
    window.location.href = `C:/Users/gui1kz/Documents/projects/farmaciak2/pagesAdm/pages/update.html`

}

function editarStatus(state){
    let newUser = {
        nome_completo: name,
        cpf: cpf,
        email: email,
        senha: password,
        grupo: group,
        status : state,
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
          window.location.href = "file:///C:/Codes/Senac/k2farma/pagesAdm/pages/list.html";
        },
        error: function (data) {
          console.log(data);
        },
      });
}