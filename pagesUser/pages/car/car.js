document.addEventListener("DOMContentLoaded", function () {
  profil()
  car()
  somarTotal()
})


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
      <li><a class="dropdown-item" onclick="perfil()">Perfil</a></li>
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
function perfil(){
  window.location.href = `../profil/profil.html`
}
const itens = localStorage.getItem('sendCar')
const convert = JSON.parse(itens)
function car() {

    let addInHtml = ''
    let soma = ''
    for(let i = 0; i < convert.length ; i ++){
    const obj = convert[i]
      addInHtml = ` 

          <div id="containerProductBody" onclick="">
            <img class="imgCart" src="../../../${obj.img}">
            <div id="containerProduct">
              <div class='containerTextCar'>

                <p> <strong> Nome: </strong>${obj.nome}</p>
                <p> <strong> Preço: </strong>R$${obj.preco}</p>
              </div>
              <div class='priceCar'>
                <p> <strong> Quantidade: ${obj.quantidadeProduto} </strong> </p>
                <p> <strong> Total Produto: R$${(obj.quantidadeProduto * obj.preco).toFixed(2)} </strong> </p>
                <div class="iconsContainer">
                  <div>
                  <i class="bi bi-plus" onclick="pegaValorParaSomar(${i})"></i>
                  <i class="bi bi-dash-lg" onclick="pegaValorParaDiminuir(${i})"></i>
                  </div>
                  <i class="bi bi-trash3-fill" onclick="deletar(${obj.id})"></i>
                </div>
              </div>
            </div>
          </div>

      `
      document.getElementById('containerProductDiv').innerHTML += addInHtml

      soma = `
      <div class='divSoma'>
      <p> <strong>Subtotal: ${somarTotal()}</strong> </p>
      <p> <button type="button" class="btn btn-info m-2" onclick="addEndereco()">Comprar</button> </p>
      </div>
      
      `
      document.getElementById('total').innerHTML = soma
    }
    
}
let count = 1;
let countMinius = 1;

function pegaValorParaSomar(i) {
  const local = localStorage.getItem('sendCar');
  const carrinho = JSON.parse(local);
  
  if (carrinho && carrinho[i]) {
    let sun = Number(carrinho[i].quantidadeProduto);
    sun = sun + count;  // Incrementa com o valor da variável global `count`

    const novoProduto = { ...carrinho[i], quantidadeProduto: sun };
    carrinho[i] = novoProduto;

    localStorage.setItem('sendCar', JSON.stringify(carrinho));
    location.reload();
  } else {
    console.error('Produto não encontrado no carrinho');
  }
}

function pegaValorParaDiminuir(i) {
  const local = localStorage.getItem('sendCar');
  const carrinho = JSON.parse(local);
  
  if (carrinho && carrinho[i]) {
    let sun = Number(carrinho[i].quantidadeProduto);
    
    if (sun > 0) {
      sun = sun - countMinius;  // Decrementa com o valor da variável global `countMinius`
    }

    const novoProduto = { ...carrinho[i], quantidadeProduto: sun };
    carrinho[i] = novoProduto;

    localStorage.setItem('sendCar', JSON.stringify(carrinho));
    location.reload();
  } else {
    console.error('Produto não encontrado no carrinho');
  }
}

function somarTotal() {
  const local = localStorage.getItem('sendCar');
  const carrinho = JSON.parse(local);

  if (carrinho) {
    const total = carrinho.reduce((acc, item) => {
      return acc + item.preco * item.quantidadeProduto;
    }, 0);

    localStorage.setItem('subtotal', total.toFixed(2));
    return total.toFixed(2);
  } else {
    console.error('Carrinho vazio ou inválido');
    return '0.00';
  }
}


function callLocal(id){
  localStorage.setItem("idProducts", id)
  window.location.href = `../cards/cards.html`

}


function deletar(id){
  const newData = convert.filter(item => item.id !== id)
  localStorage.setItem('sendCar', JSON.stringify(newData));
  console.log(newData)
  window.location.reload();  
}


function addEndereco() {
  let id = localStorage.getItem('idCliente')
  if(id){
    location.href='../finishBuy/finishBuy.html';
  } else {
    alert('Para continuar faça o login!')
    location.href='../login/login.html';
  }
}
