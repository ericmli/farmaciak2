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
      if(data.result.status == 'Ativo'){
        status = 'Disponivel'
      }else{
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

    },
    error: function (error) {
      console.log(error)
    },
  })
}
