const express = require('express');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProdutoController = require('./controllers/ProdutoController');
const router = express.Router();


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
router.post('/produto', ProdutoController.inserir);
router.put('/produto/:id', ProdutoController.alterar);
router.delete('/produto/:id', ProdutoController.excluir)

module.exports = router;