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
            for (let i = 0; data.result.length > i; i++) {
                htmlTab += `
                <tr>
                    <th scope="row">${data.result[i].id}</th>
                    <td>${data.result[i].nome_completo}</td>
                    <td>${data.result[i].email}</td>
                    <td>${data.result[i].grupo}</td>
                    <td> <button type="button" class="btn btn-primary" onclick="statusFuncionario(${data.result[i].id})">${data.result[i].status}</button> </td>
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

function statusFuncionario(id) {

    $.ajax({
        url: `http://localhost:2000/api/funcionario/${id}`,
        type: "GET",
        headers: {
            "accept": "application/json"
        },
        success: function (data) {
            let status
            let name = data.result.nome_completo
            let cpf = data.result.cpf
            let email = data.result.email
            let password = data.result.senha
            let group = data.result.grupo
            let logado = data.result.logado

            if (data.result.status === 'Ativo') {
                status = 'Inativo'
            } else {
                status = 'Ativo'
            }
            let edit = {
                nome_completo: name,
                cpf: cpf,
                email: email,
                senha: password,
                grupo: group,
                status : status,
                logado : logado,
            }
            realize()

             function realize() {
                $.ajax({
                    url: `http://localhost:2000/api/funcionario/${id}`,
                    type: "PUT",
                    headers: {
                        accept: "application/json",
                    },
                    dataType: "json",
                    contentType: "application/json",
                    data:  JSON.stringify(edit),
                    success: function (data) {
                        pegarFuncionario()
                    },
                    error: function (data) {
                        console.log(data);
                    },
                })
            }
        },
        error: function (data) {
            console.log(data)
        }
    })

}

function editarFuncionario(id) {

    localStorage.setItem("idFuncionario", id)
    window.location.href = `../update/update.html`

}

