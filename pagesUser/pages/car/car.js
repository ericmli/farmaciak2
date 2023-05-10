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

function car() {
    const itens = localStorage.getItem('sendCar')
    const itensSeparados = itens.split('%')
    for(let i = 0 ; i < itensSeparados.length ; i++ ){
      const add = itensSeparados[i]
      const objeto = JSON.parse(add.substring(1));
      console.log(objeto)
      let addInHtml = ''
      addInHtml = `
        <p>Quantidade ${add[0]}</p>
        <p>ID Produto ${objeto.id}</p>
        <p>Nome${objeto.nome}</p>
      `
      document.getElementById('containerProduct').innerHTML += addInHtml
    }
}