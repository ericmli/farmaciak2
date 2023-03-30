document.addEventListener("DOMContentLoaded", function () {
    listarProdutos()    
})


function listarProdutos(){
    $.ajax({
        url: 'http://localhost:2000/api/produtos',
        type: 'GET',
        headers: {
            'accept': 'application/json'
        },
        success: function (data) {
            console.log(data.result[0].img)
            let htmlLis = ''
            for (let i = 0; i < data.result.length; i++) {
                htmlLis += `  
                <div class="card" style="width: 18rem">
                <img src="${data.result[i].img}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${data.result[i].nome}</h5>
                  <p class="card-text">${data.result[i].descricao}</p>
                  <a href="#" class="btn btn-warning" onclick="editarProduto(${data.result[i].id})">Editar</a>
                  <a class="btn btn-danger" onclick="deleteProduto(${data.result[i].id})">Deletar</a>
                </div>
              </div>
    `
            }
            
            document.getElementById('products').innerHTML = htmlLis
            
            const gp = localStorage.getItem("Administrador")
            
            if(gp == 1){
                adm = `<button type="button" class="btn btn-success mb-5" onclick="location.href='list.html';">Lista Funcionario </button>`
                document.getElementById('idExiste').innerHTML = adm
            }else{
                adm = ``
                document.getElementById('idExiste').innerHTML = adm
            }

        },
        error: function (error) {
            console.log(error)
        }
    })
    
}

function deleteProduto(id) {

    $.ajax({
        url: `http://localhost:2000/api/produto/${id}`,
        type: "DELETE",
        headers: {
            "accept": "application/json"
        },
        success: function (data) {
            console.log(data)
            listarProdutos()
        },
        error: function (data) {
            console.log(data)
        }
    })

}

function editarProduto(id) {

    localStorage.setItem("idProduto", id)
    window.location.href = `file:///C:/Users/gui1kz/Documents/projects/farmaciak2/pagesAdm/pages/updateProduct.html#`

}
