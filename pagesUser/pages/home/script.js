document.addEventListener("DOMContentLoaded", function () {
    callFunction()
    profil()
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
                    <img class="imgRend" src="../../../${data.result[i].img}"}
                    class="card-img-top">
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

function profil(){

    const logado = localStorage.getItem('logado')
    const nome = localStorage.getItem('nome')

    const cpf = localStorage.getItem('cpf')
    const nascimento = localStorage.getItem('nascimento')
    const email = localStorage.getItem('email')
    const id = localStorage.getItem('idCliente')

    let loged = ''
    if(logado){
        console.log(logado)
        let add = ''
        add += `
        <li class="nav-item active">
            <a class="nav-link" href="../profil/profil.html">${nome.toLocaleUpperCase()}</a>
        </li>
        `
        document.getElementById('addProfil').innerHTML = add

        loged += `
        <ul class="dropdown-menu">
        <li><a class="dropdown-item" onclick="sair()">Sair</a></li>
        </ul>
        `
        document.getElementById('isLoged').innerHTML = loged
    }else{

        loged += `
        <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="../login/login.html">Entrar</a></li>
        <li><a class="dropdown-item" href="../register/register.html">Registrar</a></li>
        </ul>
        `
        document.getElementById('isLoged').innerHTML = loged
    }
    
}

function sair(){
    alert('Saiu com sucesso!')
    localStorage.clear();
    location.reload();
}