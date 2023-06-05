document.addEventListener("DOMContentLoaded", function () {
  load()
})

function load(){
  $.ajax({
    url: `http://localhost:2000/api/compras`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      const response = data.result
      for(let i = 0 ; i < response.length ; i++){
        console.log(response[i])
        addInHtml = ` 

          <div id="containerProductBody" onclick="">
            <div id="containerProduct">
              <div class='containerTextCar'>

                <p> <strong> Pagamento: </strong>${response[i].mtd_pagamento}</p>
              </div>
              <div class='priceCar'>
                <p> <strong> Status : ${response[i].status} </strong> </p>
                <p> <strong> Total Compra: R$${(response[i].total)} </strong> </p>

              </div>
            </div>
          </div>

      `
      document.getElementById('containerProductDiv').innerHTML += addInHtml
      }
      
    },
    error: function (error) {
      console.log(error);
    },
  });
}