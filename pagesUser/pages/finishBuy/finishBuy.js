document.addEventListener("DOMContentLoaded", function () {
  carregar()
  cart()
})
const id = localStorage.getItem('idCliente')

function carregar(){
  

  $.ajax({
    url: `http://localhost:2000/api/cliente/${id}`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      
      $.ajax({
        url: `http://localhost:2000/api/cliente/${id}/enderecos`,
        type: "GET",
        headers: {
          accept: "application/json",
        },
        success: function (data) {
          document.getElementById("inputCEP").value = data.result[0].cep;
          console.log(data.result)

          let add = ''
          for(let i = 0 ; i < data.result.length ; i++){
            if(data.result[i].principal === 1){
              add += `
              <option selected disabled>${data.result[i].cep}</option>
              `
            }else{
              add += `
              <option>${data.result[i].cep}</option>
              `
            }
          }
          document.getElementById('inputCEP').innerHTML = add
        },
        error: function (error) {
          console.log(error);
        },
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function cart() {
  let addHtml = ''
  let preco1 = 2 + (Math.random() * 10).toFixed(2)
  let preco2 = 1 + (Math.random() * 10).toFixed(2)
  let preco3 = 1 + (Math.random() * 10).toFixed(2)
  addHtml += `
      <div class="form-check">
      <input class="form-check-input" type="radio" name="opcao" id="exampleRadios1"
          value="${preco1}">
      <label class="form-check-label" for="exampleRadios1">
          SEDEX : R$${preco1}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="opcao" id="exampleRadios2"
          value="${preco2}">
      <label class="form-check-label" for="exampleRadios2">
          PAC : R$${preco2}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="opcao" id="exampleRadios2"
          value="${preco3}">
      <label class="form-check-label" for="exampleRadios2">
          Correio : R$${preco3}
      </label>
    </div>
  `
  let temItem = sessionStorage.getItem('valorFrete')
  if(!temItem) {
    document.getElementById('addRadio').innerHTML = addHtml
  } else {
    let subtotal = localStorage.getItem('subtotal')
    soma = `
    <p> <strong>Subtotal: ${subtotal} + Frete: ${temItem} = R$${Number(subtotal)+ Number(temItem)}</strong> </p>    
    <p> <button type="button" class="btn btn-primary" onclick="removerEnd()">Escolher outro frete</button></p>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="opcao" id="exampleRadios1"
            value="${preco1}">
        <label class="form-check-label" for="exampleRadios1">
            SEDEX : R$${preco1}
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="opcao" id="exampleRadios2"
            value="${preco2}">
        <label class="form-check-label" for="exampleRadios2">
            PAC : R$${preco2}
        </label>
        </div>
      </div>
    `
    document.getElementById('addRadio').innerHTML = soma
  }
  
  var radios = document.getElementsByName('opcao');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function() {
      var valorSelecionado = this.value;
      sessionStorage.setItem('valorFrete', valorSelecionado);
      window.location.reload();

    });
  }

}

function removerEnd(){
  sessionStorage.clear()
  window.location.reload();

}