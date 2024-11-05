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
              <option selected disabled>${data.result[i].rua}</option>
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
    <p> <strong>Subtotal: ${subtotal} + Frete: ${temItem} = R$${(Number(subtotal)+ Number(temItem)).toFixed(2)}</strong> </p>    
    <p> <button type="button" class="btn btn-primary" onclick="removerEnd()">Escolher outro frete</button></p>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="opcaoCred" id="exampleRadios1"
        value="Cartão">
        <label class="form-check-label" for="exampleRadios1">
            Cartão
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="opcaoCred" id="exampleRadios2"
        value="Boleto">
        <label class="form-check-label" for="exampleRadios2">
            Boleto
        </label>
        </div>
      </div>
    `
    document.getElementById('addRadio').innerHTML = soma
  }

  let tipoPagamento = sessionStorage.getItem('tipoPagamento')

  let add = ''
  if(tipoPagamento === 'Cartão'){
    add = `
    <form class="mt-5 text-left">

    <div class="form-group row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Nome</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="inputNome" placeholder="Nome Completo">
      </div>
    </div>



    <div class="form-group row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Validade</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="inputPassword" placeholder='01/30'>
      </div>
    </div>


    <div class="form-group row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Código de segurança</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputData" placeholder='000'>
      </div>
    </div>

    <div class="form-group row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Número</label>
      <div class="col-sm-10" >
        <input type="string" class="form-control" id="inputNumber" placeholder='1234 5678 1234 5678'>
      </div>
    </div>


  </form>
      <button type="button" class="btn btn-info m-2" onclick="atualizar()">Comprar</button>
    `
    document.getElementById('addPagamento').innerHTML = add

  } else if ( tipoPagamento === 'Boleto'){
    add = `
      <img src="../../../src/boletobancario.jpg">
      <button type="button" class="btn btn-info m-2" onclick="atualizar()">Comprar</button>
    `
    document.getElementById('addPagamento').innerHTML = add
  } else {
    add = `
    `
    document.getElementById('addPagamento').innerHTML = add
  }
  
  var radios = document.getElementsByName('opcao');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function() {
      var valorSelecionado = this.value;
      sessionStorage.setItem('valorFrete', valorSelecionado);
      window.location.reload();

    });
  }
  var radiosCred = document.getElementsByName('opcaoCred');
  for (var i = 0; i < radiosCred.length; i++) {
    radiosCred[i].addEventListener('change', function() {
      var valorSelecionado = this.value;
      sessionStorage.setItem('tipoPagamento', valorSelecionado);
      window.location.reload();
    });
  }

}

function removerEnd(){
  sessionStorage.clear()
  window.location.reload();

}

function atualizar() {
  const name = document.getElementById("inputNome").value.trim();
  const password = document.getElementById("inputPassword").value.trim();
  const date = document.getElementById("inputData").value.trim();
  const number = document.getElementById("inputNumber").value.trim();

  const inputs = [
    { value: name, id: "inputNome", condition: name.length === 0 || name.length > 99 },
    { value: password, id: "inputPassword", condition: password.length === 0 },
    { value: date, id: "inputData", condition: date.length === 0 },
    { value: number, id: "inputNumber", condition: number.length === 0 }
  ];

  let hasError = false;

  inputs.forEach(({ value, id, condition }) => {
    const inputElement = document.getElementById(id);
    if (condition) {
      inputElement.classList.add("error");
      hasError = true;
    } else {
      inputElement.classList.remove("error");
    }
  });

  if (hasError) return;

  const tipoPagamento = sessionStorage.getItem("tipoPagamento");
  const subtotal = Number(localStorage.getItem("subtotal"));
  const valorFrete = Number(sessionStorage.getItem("valorFrete"));
  const total = subtotal + valorFrete;
  const randomNumberBuy = Math.floor(Math.random() * 10000000000).toString();

  const sendCar = JSON.parse(localStorage.getItem("sendCar")) || [];
  const produtos = sendCar.map(e => ({
    produto_id: e.id,
    quantidade: e.quantidadeProduto,
    subtotal: (e.preco * e.quantidadeProduto).toFixed(2)
  }));

  const compraData = {
    cliente_id: id,
    cdgCompra: randomNumberBuy,
    status: "Aguardando Pagamento",
    mtd_pagamento: tipoPagamento,
    total,
    produtos
  };

  $.ajax({
    url: "http://localhost:2000/api/compra",
    type: "POST",
    headers: { accept: "application/json" },
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(compraData),
    success: function () {
      alert(`Compra realizada com sucesso!\nNúmero do seu pedido: ${randomNumberBuy}`);
      window.location.href = "./token/token.html";
      localStorage.removeItem("sendCar");
      localStorage.setItem("codigoCompra", randomNumberBuy);
    },
    error: function (error) {
      console.log(error);
    }
  });
}
