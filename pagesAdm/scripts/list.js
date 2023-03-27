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

                htmlTab += `
                <tr>
                    <th scope="row">${data.result[i].id}</th>
                    <td>${data.result[i].nome_completo}</td>
                    <td>${data.result[i].email}</td>
                    <td>${data.result[i].cpf}</td>
                    <td>${data.result[i].grupo}</td>
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
    window.location.href = `file:///C:/Codes/Senac/k2farma/pagesAdm/pages/update.html`

}