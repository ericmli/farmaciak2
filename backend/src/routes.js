const express = require('express');
const FuncionarioController = require('./controllers/FuncionarioController');
const router = express.Router();

router.get('/funcionarios', FuncionarioController.buscarTodos);
router.get('/funcionario/:id', FuncionarioController.buscarUm);
router.post('/carro', FuncionarioController.inserir);

module.exports = router;