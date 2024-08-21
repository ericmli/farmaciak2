# Projeto de Farmácia

Este projeto é uma aplicação para gerenciamento de uma farmácia. A aplicação utiliza um banco de dados MySQL rodando em um container Docker, com o backend desenvolvido em Node.js usando o framework Express. O frontend é composto por HTML, CSS e JavaScript.

## Tecnologias Utilizadas

- **Node.js**: Plataforma utilizada para o desenvolvimento do backend.
- **Express**: Framework web utilizado para a criação de rotas e gerenciamento das requisições no backend.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional, usado para armazenar os dados da aplicação.
- **Docker**: Ferramenta utilizada para criar e gerenciar containers, garantindo que o banco de dados MySQL rode de forma isolada e consistente.
- **HTML, CSS, JavaScript**: Tecnologias utilizadas para desenvolver o frontend da aplicação.

## Estrutura do Projeto

- **Backend**: Desenvolvido em Node.js com Express.
- **Frontend**: Construído utilizando HTML, CSS e JavaScript.
- **Banco de Dados**: MySQL rodando dentro de um container Docker.

## Arquivos Principais

- `init.sql`: Contém o schema do banco de dados. Este arquivo é executado automaticamente no container MySQL para configurar as tabelas e dados iniciais.
- `conexao.png`: Um diagrama em formato PNG que explica toda a conexão com o banco de dados.

## Como Executar o Projeto

1. **Inicie o banco de dados e os containers Docker:**

   ```bash
   docker compose up

2. **Inicie o Projeto com :**
   ```bash
   NPM start
