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
                    <th scope="row">${i + 1}</th>
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
                          <option>${data.result[i].status}</option>
                          <option>Pagamento Rejeitado</option>
                          <option>Pagamento com Sucesso</option>
                          <option>Aguardando Retirada</option>
                          <option>Em Transito</option>
                          <option>Entregue</option>
                      </select>
                      </div>
                      </div>
                      </td>
                      <td>
                      <button type="button" class="btn btn-warning" onclick="atualizar(${data.result[i].compra_id},${i})">Atualizar</button>
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

function atualizar(id, item) {
    let info = document.getElementById("inputCEP").value.trim();
    console.log(id,item)
    $.ajax({
        url: "http://localhost:2000/api/compras",
        type: "GET",
        headers: {
            "accept": "application/json"
        },  
        success: function (data) {
                let edit = {
                    compraId: data.result[item].compra_id,
                    status: info,
                    cliente_id: data.result[item].cliente_id,
                    cdgCompra: 432432,
                    mtd_pagamento: data.result[item].mtd_pagamento,
                    total: data.result[item].total
                }
                $.ajax({
                    url: `http://localhost:2000/api/compras/${id}`,
                    type: "PUT",
                    headers: {
                        accept: "application/json",
                    },
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(edit),
                    success: function (data) {
                        location.reload();
                    },
                    error: function (data) {
                        console.log(data);
                    },
                })
                
            
        },
        error: function (data) {
            console.log(data)
        }
    })
}
