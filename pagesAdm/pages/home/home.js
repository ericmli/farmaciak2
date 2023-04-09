document.addEventListener("DOMContentLoaded", function () {
    pegarProdutos()
})

function pegarProdutos() {
    const gp = localStorage.getItem("Administrador");
    let adm = ''
    if (gp == 1) {
        adm = `<div>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../listProduct/listProduct.html';">Listar Produtos</button>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../list/list.html';">Listar Funcionarios</button>
        </div>
        `;
        document.getElementById("addButton").innerHTML = adm;
    } else {
        adm = `<div>
        <button type="button" class="btn btn-primary p-3 m-2" onclick="location.href='../listProduct/listProduct.html';">Listar Produtos</button>
        </div>
        `;
        document.getElementById("addButton").innerHTML = adm;
    }
    console.log('tes')
}