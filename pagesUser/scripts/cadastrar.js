function cadastrar() {
  let name = document.getElementById("inputNome").value.trim();
  let email = document.getElementById("inputEmail").value.trim();
  let password = document.getElementById("inputPassword").value.trim();
  let passwordConfirm = document
    .getElementById("inputConfirmPassword")
    .value.trim();
  let date = document.getElementById("inputData").value.trim();
  let cpf = document.getElementById("inputCPF").value.trim();
  let gender = document.getElementById("gender").value.trim();
  let number = document.getElementById("inputCelular").value.trim();
  let numberHouse = document.getElementById("inputNumero").value.trim();
  let street = document.getElementById("inputRua").value.trim()
  let district = document.getElementById("inputBairro").value.trim()
  let cep = document.getElementById("inputCEP").value.trim();


  if (
    name.length == 0 ||
    email.length == 0 ||
    password == 0 ||
    passwordConfirm.length == 0 ||
    date.length == 0 ||
    cpf.length == 0 ||
    gender.length == 0 ||
    number.length == 0 ||
    numberHouse.length == 0
  ) {
    if (name.length == 0 || name.length > 99) {
      document.getElementById("inputNome").classList.add(`error`);
    } else {
      document.getElementById("inputNome").classList.remove(`error`);
    }

    if (email.length == 0 || email.length > 49) {
      document.getElementById("inputEmail").classList.add(`error`);
    } else {
      document.getElementById("inputEmail").classList.remove(`error`);
    }

    if (password.length == 0 || password != passwordConfirm ) {
      document.getElementById("inputPassword").classList.add(`error`);
      if (password != passwordConfirm) {
        document.getElementById("inputPassword").classList.add(`error`);
        document.getElementById("inputConfirmPassword").classList.add(`error`);
      }
    } else {
      document.getElementById("inputPassword").classList.remove(`error`);
    }

    if (passwordConfirm.length == 0) {
        document.getElementById("inputConfirmPassword").classList.add(`error`);
    }else{
        document.getElementById("inputConfirmPassword").classList.remove(`error`);
    }

    if(date.length == 0){
        document.getElementById("inputData").classList.add(`error`);
    }else{
        document.getElementById("inputData").classList.remove(`error`);
    }

    if(cpf.length == 0 || cpf.length > 11){
        document.getElementById("inputCPF").classList.add(`error`);
    }else{
        document.getElementById("inputCPF").classList.remove(`error`);
    }

    if(gender.length == 0){
        document.getElementById("gender").classList.add(`error`);
    }else{
        document.getElementById("gender").classList.remove(`error`);
    }

    if(number.length == 0 || number.length != 11 ){
      document.getElementById("inputCelular").classList.add(`error`);
    }else{
      document.getElementById("inputCelular").classList.remove(`error`);

    }

    if(numberHouse.length == 0 || numberHouse.length > 10){
      document.getElementById("inputNumero").classList.add(`error`);
    }else{
      document.getElementById("inputNumero").classList.add(`error`);
    }

    if(cep.length != 9 ){
      document.getElementById("inputCEP").classList.add(`error`);
    }else{
      document.getElementById("inputCEP").classList.remove(`error`);
    }

 

  } else {
    let newUser = {
      name:name ,
      email: email,
      password: password,
      age: date,
      CPF: cpf,
      gender: gender,
      number: number,
      street: street,
      district: district,
      houseNumber: numberHouse,
    };

    $.ajax({
      url: "http://localhost:3000/users",
      type: "POST",
      headers: {
        accept: "application/json",
      },
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(newUser),
      success: function (data) {
        console.log(data);
        // window.location.href = "file:///C:/Codes/Senac/k2farma/pages/index.html";
      },
      error: function (data) {
        console.log(data);
      },
    });
  }
}

function cep() {
  let cep = document.getElementById("inputCEP").value.trim();

  $.ajax({
    url: `https://viacep.com.br/ws/${cep}/json/`,
    type: "GET",
    headers: {
      accept: "application/json",
    },
    success: function (data) {
      console.log(data);

      document.getElementById("inputCEP").classList.remove(`error`);

      document.getElementById("inputCEP").value = data.cep;
      document.getElementById("inputBairro").value = data.bairro;
      document.getElementById("inputRua").value = data.logradouro;
    },
    error: function (error) {
      console.log(error);
    },
  });
}
