document.addEventListener("DOMContentLoaded", function () {
  load()
})

function load(){
 let compra = localStorage.getItem('codigoCompra')
  let string = ''
  string = `
  <div class="divSoma">
    <p>
      Compra realizada com sucesso!\n
      </p>
      <p>
      Número: <strong>${compra}</strong>
      </p>
    </div>
    <div class="aaa">
    <button type="button" class="btn btn-primary" onclick="location.href='../../home/index.html';">Voltar para tela principal</button>
    <div>
  `
 document.getElementById('total').innerHTML = string
}