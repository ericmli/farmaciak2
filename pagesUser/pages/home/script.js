document.addEventListener("DOMContentLoaded", function () {
    callFunction()    
})


function callFunction(){
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
                console.log(data.result[i].status)
                if(data.result[i].status === 'Ativo'){
                    htmlLis += `  
                    <div class="card" style="width: 18rem" onclick="callLocal(${data.result[i].id})">
                    <img src="${data.result[i].img}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${data.result[i].nome}</h5>
                    <p class="textNameCard" >R$ ${data.result[i].preco}</p>
                    <p class="card-text">${data.result[i].descricao}</p>
                    </div>
                    </div>
                    `
                }

            }
            document.getElementById('products').innerHTML = htmlLis
        },
        error: function (error) {
            console.log(error)
        }
    })
    
}

function callLocal(id){
    localStorage.setItem("idProducts", id)
    window.location.href = `../cards/cards.html`

}
