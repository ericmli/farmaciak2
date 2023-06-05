document.addEventListener("DOMContentLoaded", function () {
    pegarProdutos()
    hangleLogin()
})

function hangleLogin() {
    const user = localStorage.getItem('Administrador')
    if(user == 1 || user == 2) {
        console.log('Verificado!')
    } else {
        alert('Erro, logar novamente!')
        window.location.href = '../login/login.html'
    }
}

function pegarProdutos() {
    $.ajax({
        url: "http://localhost:2000/api/compras",
        type: "GET",
        headers: {
            "accept": "application/json"
        },  
        success: function (data) {
            let htmlTab = ''
            for (let i = 0; data.result.length > i; i++) {
                htmlTab += `
                <tr>
                    <th scope="row">${data.result[i].produto_id}</th>
                    <td>${data.result[i].data_compra}</td>
                    <td>${(Math.random() * 1000000000).toFixed(0)}</td>
                    <td>${data.result[i].mtd_pagamento}</td>
                    <td>${data.result[i].quantidade}</td>
                    <td>${data.result[i].subtotal}</td>
                    <td>R$ ${data.result[i].total}</td>
                    <td>
                    <div class="form-group row">
                    <div class="col-sm-10">
                      <select class="custom-select" id="inputCEP" required>
                          <option disabled>${data.result[i].status}</option>
                          <option>Pagamento Rejeitado</option>
                          <option>Pagamento com Sucesso</option>
                          <option>Aguardando Retirada</option>
                          <option>Em Transito</option>
                          <option>Entregue</option>
                      </select>
                    </div>
                  </div>
                  </td>
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

