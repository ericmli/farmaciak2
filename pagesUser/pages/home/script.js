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
                    <button type="button" class="btn btn-primary" onclick="location.href='../cards/cards.html';">Detalhes</button>
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
    localStorage.removeItem('nome');
    localStorage.removeItem('idCliente');
    localStorage.removeItem('cpf');
    localStorage.removeItem('email');
    localStorage.removeItem('logado');
    location.reload();
}