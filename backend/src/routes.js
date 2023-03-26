const express = require('express');
const FuncionarioController = require('./controllers/FuncionarioController');
const router = express.Router();

router.get('/funcionarios', FuncionarioController.buscarTodos);
router.get('/funcionario/:id', FuncionarioController.buscarUm);
router.post('/funcionario', FuncionarioController.inserir);
router.put('/funcionario/:id', FuncionarioController.alterar);
router.delete('/funcionario/:id', FuncionarioController.excluir)

module.exports = router;