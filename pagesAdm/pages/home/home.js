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
    const gp = localStorage.getItem("Administrador");
    let adm = ''
    if (gp == 1) {
        adm = `<div>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../listProduct/listProduct.html';">Listar Produtos</button>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../list/list.html';">Listar Funcionarios</button>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../listBuy/listBuy.html';">Listar compras Clientes</button>
        </div>
        `;
        document.getElementById("addButton").innerHTML = adm;
    } else {
        adm = `<div>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../listProduct/listProduct.html';">Listar Produtos</button>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../listBuy/listBuy.html';">Listar compras Clientes</button>
        </div>
        `;
        document.getElementById("addButton").innerHTML = adm;
    }
}