document.addEventListener("DOMContentLoaded", function () {
    callFunction()    
})


function callFunction(){
    $.ajax({
        url: 'http://localhost:3000/products',
        type: 'GET',
        headers: {
            'accept': 'application/json'
        },
        success: function (data) {
            console.log(data)
            let htmlLis = ''
            for (let i = 0; i < data.length; i++) {
                htmlLis += `  
                    <li class="product" onclick="callLocal(${data[i].id})">
                        <img src="${data[i].img}">
                        <div class="infoCard">
                            <p class="textCard" >${data[i].descrecption}</p>
                        </div>
                    </li>
    `
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
    window.location.href = `file:///C:/Codes/Senac/K2/pages/cards.html`

}
