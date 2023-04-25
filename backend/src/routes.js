const express = require('express');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProdutoController = require('./controllers/ProdutoController');
const ClienteController = require('./controllers/ClienteController');
const CompraController = require('./controllers/CompraController');
const EnderecoController = require('./controllers/EnderecoController');
const router = express.Router();
const upload = require('./config');
const db = require('./db'); // importe o objeto de conexão com o banco de dados


//Rotas para funcionarios
router.get('/funcionarios', FuncionarioController.buscarTodos);
router.get('/funcionario/:id', FuncionarioController.buscarUm);
router.post('/funcionario', FuncionarioController.inserir);
router.post('/login', FuncionarioController.login)
router.put('/funcionario/:id', FuncionarioController.alterar);
router.delete('/funcionario/:id', FuncionarioController.excluir)

//Rotas para produtos
router.get('/produtos',ProdutoController.buscarTodos);
router.get('/produto/:id', ProdutoController.buscarUm);
router.post('/produto',upload.single('file'), ProdutoController.inserir);
router.put('/produto/:id', ProdutoController.alterar);
router.delete('/produto/:id', ProdutoController.excluir);
router.post('/buscaprodutos', ProdutoController.buscarPorNome);

//Rotas para clientes
router.get('/clientes', ClienteController.buscarTodos);
router.get('/cliente/:id', ClienteController.buscarUm);
router.post('/cliente', ClienteController.inserir);
router.put('/cliente/:id', ClienteController.alterar);
router.post('/cliente/login', ClienteController.login);

//Rotas para endereços
router.get('/cliente/:cliente_id/enderecos', EnderecoController.buscarTodosPorId);
router.get('/cliente/:cliente_id/enderecos/principal', EnderecoController.buscarPrincipal);
router.post('/cliente/endereco', EnderecoController.inserir);
router.put('/cliente/endereco/:id', EnderecoController.alterar);

// rota para buscar os produtos de uma compra
router.get('/compras/:id/produtos', CompraController.getProdutosCompra);
router.post('/compra', CompraController.createCompra);


module.exports = router;