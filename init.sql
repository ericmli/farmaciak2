CREATE DATABASE IF NOT EXISTS farmacia;
USE farmacia;

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(60) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    grupo VARCHAR(15) NOT NULL,
    status VARCHAR(10)  NOT NULL DEFAULT 'Ativo',
    logado BOOLEAN NOT NULL DEFAULT '0'
);

CREATE TABLE produtos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    laboratorio VARCHAR(255),
    categoria VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    status VARCHAR(10)  NOT NULL DEFAULT 'Ativo'
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nascimento VARCHAR(10) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    telefone VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    produto_id INT NOT NULL,
    avaliacao DECIMAL(2,1) NOT NULL,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE enderecos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    rua VARCHAR(50) NOT NULL,
    numero INT NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    principal BOOLEAN DEFAULT false,
    faturamento BOOLEAN,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cliente_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    mtd_pagamento VARCHAR(20) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    cdgCompra BIGINT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE produtos_compra (
    id_produto_compra INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    compra_id INT NOT NULL,   
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES compras(id_compra),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
