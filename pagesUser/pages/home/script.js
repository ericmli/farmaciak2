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
                    <li class="product" onclick="callLocal(${data.result[i].id})">
                        <img src="${data.result[i].img}">
                        <div class="infoCard">
                            <p class="textNameCard" >${data.result[i].nome}</p>
                            <p class="textNameCard" >R$ ${data.result[i].preco}</p>
                            <p class="textCard" >${data.result[i].descricao}</p>
                        </div>
                        </li>
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
