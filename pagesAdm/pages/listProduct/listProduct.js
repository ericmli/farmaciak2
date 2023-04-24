document.addEventListener("DOMContentLoaded", function () {
    pegarProdutos()
})

function pegarProdutos() {
    $.ajax({
        url: "http://localhost:2000/api/produtos",
        type: "GET",
        headers: {
            "accept": "application/json"
        },
        success: function (data) {
            let htmlTab = ''
            let button = ''
            for (let i = 0; data.result.length > i; i++) {
                
                const gp = localStorage.getItem("Administrador");

                if (gp == 1) {
                    adm = `<div>
                    <button type="button" class="btn btn-success " onclick="location.href='../list/list.html';">Lista Funcionario </button>
                    <button type="button" class="btn btn-info " onclick="location.href='../createProduct/createProduct.html';">Criar Produto</button>
                    </div>
                    `;

                    button = `
                    <td> <button type="button" class="btn btn-primary" onclick="statusProduto(${data.result[i].id})"; return false>${data.result[i].status}</button> </td>
                    `
                    document.getElementById("idExiste").innerHTML = adm;

                } else {
                    adm = ``;
                    document.getElementById("idExiste").innerHTML = adm;
                }
                htmlTab += `
                <tr>
                    <th scope="row">${data.result[i].id}</th>
                    <td>${data.result[i].nome}</td>
                    <td>${data.result[i].descricao}</td>
                    <td>R$ ${data.result[i].preco}</td>
                    <td>${data.result[i].quantidade}</td>
                    <td>${data.result[i].laboratorio}</td>
                    <td>${data.result[i].categoria}</td>
                    ${button}
                    <td> <button type="button" class="btn btn-warning" onclick="editarProduto(${data.result[i].id})"; return false>Editar</button> </td>
                </tr>
                `
                document.getElementById("products").innerHTML = htmlTab;

            }
        },
        error: function (data) {
            console.log(data)
        }
    })
}

function statusProduto(id) {

    $.ajax({
        url: `http://localhost:2000/api/produto/${id}`,
        type: "GET",
        headers: {
            "accept": "application/json"
        },
        success: function (data) {
            let status
            let name = data.result.nome
            let descricao = data.result.descricao
            let preco = data.result.preco
            let quantidade = data.result.quantidade
            let laboratorio = data.result.laboratorio
            let categoria = data.result.categoria

            if (data.result.status === 'Ativo') {
                status = 'Inativo'
            } else {
                status = 'Ativo'
            }
            let edit = {
                nome: name,
                descricao: descricao,
                preco: preco,
                quantidade: quantidade,
                laboratorio: laboratorio,
                categoria: categoria,
                status: status
            }
            realize()

            function realize() {
                $.ajax({
                    url: `http://localhost:2000/api/produto/${id}`,
                    type: "PUT",
                    headers: {
                        accept: "application/json",
                    },
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(edit),
                    success: function (data) {
                        pegarProdutos()
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



function editarProduto(id) {

    localStorage.setItem("idProduto", id)
    const gp = localStorage.getItem("Administrador");

    if (gp == 1) {
        window.location.href = `../updateProduct/updateProduct.html`
    } else {
        window.location.href = `../updateStock/updateProductStock.html`
    }
}
