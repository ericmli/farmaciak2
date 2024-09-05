document.addEventListener("DOMContentLoaded", function () {
  handleLogin();
});

function handleLogin() {
  const user = localStorage.getItem('Administrador');
  if (user == 1 || user == 2) {
    console.log('Verificado!');
  } else {
    alert('Erro, logar novamente!');
    window.location.href = '../login/login.html';
  }
}

function cadastrar(event) {
  event.preventDefault(); // Evita o redirecionamento padrão da página

  const inputs = [
    { id: "inputNome", value: document.getElementById("inputNome").value.trim(), maxLength: 99 },
    { id: "inputPreco", value: document.getElementById("inputPreco").value.trim() },
    { id: "inputLaboratorio", value: document.getElementById("inputLaboratorio").value.trim() },
    { id: "inputEstoque", value: document.getElementById("inputEstoque").value.trim() },
    { id: "inputDescricao", value: document.getElementById("inputDescricao").value.trim() },
    { id: "inputCategoria", value: document.getElementById("inputCategoria").value.trim() },
  ];

  let isValid = true;

  inputs.forEach(input => {
    const inputElement = document.getElementById(input.id);
    if (input.value.length === 0 || (input.maxLength && input.value.length > input.maxLength)) {
      inputElement.classList.add('error');
      isValid = false;
    } else {
      inputElement.classList.remove('error');
    }
  });

  if (!isValid) {
    alert("Preencha os campos corretamente.");
    return;
  }

  // Continue com a lógica de cadastro no backend
  // Por exemplo, enviar dados para o servidor usando fetch()
}
document.querySelector('.custom-file-input').addEventListener('change', function(event) {
  // Obtém o arquivo selecionado
  const fileInput = event.target;
  const file = fileInput.files[0];
  
  // Se não houver arquivo selecionado, limpa o preview e retorna
  if (!file) return;

  // Atualiza o label com o nome do arquivo
  const label = document.querySelector('.custom-file-label');
  label.textContent = file.name;

  // Limpa qualquer preview existente
  const previewContainer = document.getElementById('preview-container');
  previewContainer.innerHTML = '';

  // Cria um FileReader para ler o conteúdo da imagem
  const reader = new FileReader();
  
  reader.onload = function(e) {
      // Cria um elemento de imagem
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = file.name;
      img.style.maxWidth = '200px';
      img.style.display = 'block';
      img.style.marginTop = '10px';
      
      // Cria um botão de remoção
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.style.display = 'block';
      removeButton.style.marginTop = '10px';
      removeButton.onclick = function() {
          // Limpa o preview e reseta o input
          previewContainer.innerHTML = '';
          label.textContent = 'Escolha a Imagem';
          fileInput.value = '';
      };

      // Adiciona a imagem e o botão ao container de preview
      previewContainer.appendChild(img);
      previewContainer.appendChild(removeButton);
  };

  // Lê o conteúdo do arquivo como URL de dados
  reader.readAsDataURL(file);
});

