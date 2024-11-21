function login() {
  // Obtém os valores dos campos de entrada e remove espaços em branco no início e no fim
  let email = document.getElementById("inputEmail").value.trim();
  let password = document.getElementById("inputPassword").value.trim();

  // Cria o objeto 'send' contendo os dados a serem enviados na requisição
  let send = {
    email: email,
    senha: password,
  };

  // Verifica se os campos de e-mail e senha estão vazios
  if (email.length == 0 || password.length == 0) {

    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    // Valida o e-mail e aplica ou remove a classe 'error' do campo de entrada
    if (emailRegex.test(email)) {
      document.getElementById("inputEmail").classList.remove('error');
    } else {
      document.getElementById("inputEmail").classList.add('error');
    }

    // Verifica se a senha não está vazia e ajusta a classe 'error' do campo de senha
    if (password.length != 0) {
      document.getElementById("inputPassword").classList.remove('error');
    } else {
      document.getElementById("inputPassword").classList.add('error');
    }

  } else {
    // Se ambos os campos estão preenchidos, envia a requisição AJAX
    $.ajax({
      url: "http://localhost:2000/api/cliente/login", // URL do endpoint de login
      type: "POST", // Tipo de requisição HTTP
      headers: {
        accept: "application/json", // Define que a resposta esperada é JSON
      },
      dataType: "json", // Tipo de dado esperado na resposta
      contentType: "application/json", // Tipo de conteúdo enviado no corpo da requisição
      data: JSON.stringify(send), // Serializa o objeto 'send' para JSON

      // Função de callback para o caso de sucesso
      success: function (data) {
        // Armazena os dados relevantes no localStorage do navegador
        localStorage.setItem("idCliente", data.data.id);
        localStorage.setItem("logado", true);
        localStorage.setItem("nome", data.data.nome_completo);
        localStorage.setItem("cpf", data.data.cpf);
        localStorage.setItem("nascimento", data.data.nascimento);
        localStorage.setItem("email", data.data.email);

        // Redireciona o usuário para a página inicial
        window.location.href = '../home/index.html';
      },

      // Função de callback para o caso de erro
      error: function (data) {
        // Exibe um alerta informando que o e-mail ou senha estão incorretos
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: data.responseJSON.error,
        });
      },
    });
  }
}
