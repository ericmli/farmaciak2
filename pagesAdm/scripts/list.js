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

function editarFuncionario(id) {

    localStorage.setItem("idFuncionario", id)
    window.location.href = `C:/Users/gui1kz/Documents/projects/farmaciak2/pagesAdm/pages/update.html`

}

