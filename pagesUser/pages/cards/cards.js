document.addEventListener("DOMContentLoaded", function () {
  load()
})

function load() {
  let id = localStorage.getItem("idProducts")
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
        <img class="imgMain" src="${data.result.img}">
          <p class="textLab">Laboratorio: ${data.result.laboratorio}</p>
          <p class="textLab">${status}</p>
          <div class="containerIcons">
            <i class="bi bi-cart-plus-fill"></i>
  
            <i class="bi bi-heart-fill"></i>
          </div>
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
            <h1> Produto não possui avaliações. </h1>
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
