document.addEventListener("DOMContentLoaded", function () {
  profil()
  car()
  
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

    for(let i = 0; i < convert.length ; i ++){
    const obj = convert[i]
      addInHtml = ` 

          <div id="containerProductBody">
            <img class="imgCart" src="../../../${obj.img}">
            <div id="containerProduct">
              <div class='containerTextCar'>

                <p> <strong> Nome: </strong> ${obj.nome}</p>
                <p> <strong> Nome: </strong> ${obj.preco}</p>
              </div>
              <div class='priceCar'>
                <p> <strong> Quantidade: ${obj.quantidadeProduto} </strong> </p>
                <div>
                  <i class="bi bi-plus" onclick="pegaValorParaSomar(${i})"></i>
                  <i class="bi bi-dash-lg" onclick="carregarIcone(${false})"></i>
                </div>
              </div>
            </div>
          </div>

      `
      document.getElementById('containerProductDiv').innerHTML += addInHtml
    }
    
}

let count = 0;
function pegaValorParaSomar(i) {
  let sun = convert[i].quantidadeProduto;
  sun = Number(sun) + count++;
  const newData = convert.map(item => item == i)
  console.log(newData);
  // console.log(sun);
}

function carregarIcone(id){
  // const newData = convert.filter(item => item.id !== id)
  // localStorage.setItem('sendCar', JSON.stringify(newData));
  // window.location.reload();  

}