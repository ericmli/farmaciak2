document.addEventListener("DOMContentLoaded", function () {
    load()
})

function load(){
    localStorage.getItem("idProducts", id)
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
                        <img src="${data[i].img}">
    `
            }
            document.getElementById('imgBd').innerHTML = htmlLis
        },
        error: function (error) {
            console.log(error)
        }
    })
}
