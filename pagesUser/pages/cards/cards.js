document.addEventListener("DOMContentLoaded", function () {
  load()
  profil()
})

let id = localStorage.getItem("idProducts")
function load() {
  $.ajax({
    url: `http://localhost:2000/api/produto/${id}`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      let status = ''


      if (data.result.status == 'Ativo') {
        status = 'Disponivel'
      } else {
        status = 'Indisponivel'
      }
      let htmlLis = ''
      htmlLis = `
        <div class="containerImg"> 
        <img class="imgMain" src="../../../${data.result.img}">
          <p class="textLab">Laboratorio: ${data.result.laboratorio}</p>
          <p class="textLab">${status}</p>

        </div>

          <div class="containerText">
            <p class="textNome">${data.result.nome}</p>
            <p class="textPreco">R$ ${data.result.preco}</p>
            <p class="textDescricao"> - ${data.result.descricao}</p>
          </div>
      `

      document.getElementById("containerBack").innerHTML = htmlLis
      $.ajax({
        url: `http://localhost:2000/api/produto/${id}/avaliacoes`,
        type: "GET",
        headers: {
          accept: "application/json",
        },
        success: function (data) {
          let htmlAvaliacoes = ''
          let totalAval = 0;
          let quantidadeAval = data.result.length;
          if (quantidadeAval > 0) {
            htmlAvaliacoes += '<h2>Avaliação do produto</h2>'
            for (let i = 0; i < quantidadeAval; i++) {
              let avaliacao = data.result[i].avaliacao;
              totalAval += avaliacao;
            }
            let mediaAval = totalAval / quantidadeAval;
            mediaAval = Math.round(mediaAval * 2) / 2;
            let mediaTratada = mediaAval;

            switch (mediaTratada) {
              case 0.5 : {
                htmlAvaliacoes += `
                <div id="notas">
                  <img class ="estrelasAval" src="../../../src/icons/metadeEstrela.png" alt="">
                </div>
                `
                break;
              }
              case 1:
                htmlAvaliacoes += `
              <div id="notas">
                  <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
              </div>
               
              `
                break;
              case 1.5:
                htmlAvaliacoes += `
              <div id="notas">
                  <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                  <img class ="estrelasAval" src="../../../src/icons/metadeEstrela.png" alt="">
              </div>
              
             `
                break;

              case 2:
                htmlAvaliacoes += `
              <div id="notas">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
              </div>
             `
                break;
              case 2.5:
                htmlAvaliacoes += `
              <div id="notas">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/metadeEstrela.png" alt="">
              </div>
             `
                break;
              case 3:
                htmlAvaliacoes += `
              <div id="notas">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
              </div>
             `
                break;
              case 3.5:
                htmlAvaliacoes += `
              <div id="notas">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/metadeEstrela.png" alt="">
              </div>
             `
                break;
              case 4:
                htmlAvaliacoes += `
              <div id="notas">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
              </div>
             `
                break;
              case 4.5:
                htmlAvaliacoes += `
              <div id="notas">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/metadeEstrela.png" alt="">
              </div>
             `
                break;
              case 5:
              default:
                htmlAvaliacoes += `
              <div id="notas">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
                <img class ="estrelasAval" src="../../../src/icons/estrelaInteira.png" alt="">
              </div>
             `
                break;
            }
          } else {
            htmlAvaliacoes = `
            <h4> Produto não possui avaliações. </h4>
            `
          }
          document.getElementById("avaliacoes").innerHTML += htmlAvaliacoes;
        },
        error: function (error) {
          console.log(error)
        },
      })
    },
    error: function (error) {
      console.log(error)
    },
  })
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


const tentacles = document.getElementById('tentacles')
tentacles.addEventListener("input", function() {
  const value = this.value
  return value
});

function car(){
  console.log(tentacles.value)
  $.ajax({
    url: `http://localhost:2000/api/produto/${id}`,
    type: 'GET',
    headers: {
        'accept': 'application/json'
    },
    success: function (data) {

      const exist = localStorage.getItem('sendCar')
      if (typeof exist === 'string' && exist.trim() !== '') {
        const novaString = `${tentacles.value}${JSON.stringify(data.result)}`;
        const repit = localStorage.getItem('sendCar');
        const strings = repit.split('%'); // separa as strings pelo separador '%'
        const idSet = new Set(); // cria um objeto auxiliar para armazenar os valores de "id" já encontrados
        const novoArr = []; // cria um novo array para armazenar as strings sem duplicatas
        for (let i = strings.length - 1; i >= 0; i--) {
          const str = strings[i];
          const obj = JSON.parse(str.slice(1)); // remove o número no início da string antes de fazer o parse
          if (idSet.has(obj.id)) {
            // se o valor de "id" já foi encontrado, ignora a string
            continue;
          }
          idSet.add(obj.id); // adiciona o valor de "id" ao objeto auxiliar
          novoArr.unshift(str); // adiciona a string no início do novo array
        }
        novoArr.unshift(novaString); // adiciona a nova string no início do novo array
        const novoStringFinal = novoArr.join('%'); // une as strings com o separador '%'
        localStorage.setItem('sendCar', novoStringFinal);
        console.log(novoArr);
      } else {
        localStorage.setItem('sendCar', `${tentacles.value}${JSON.stringify(data.result)}`);
      }
      
      console.log(exist)
    },
    error: function (error) {
        console.log(error)
    }
})
  
}