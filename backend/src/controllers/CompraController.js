const { json } = require('body-parser');
const CompraService = require('../services/CompraService');

module.exports = {
    getProdutosCompra: (req, res) => {
        const compraId = req.params.id;
        CompraService.getProdutosCompra(compraId, (err, result) => {
            if (err) {
                res.status(500).send({ error: 'Erro ao buscar os produtos da compra.' });
            } else {
                res.send(result);
            }
        });
    },

    // Função para criar uma nova compra
    createCompra : (req, res) => {
        const { cliente_id, status, mtd_pagamento, total, produtos } = req.body;
      
        CompraService.createCompra(cliente_id, status, mtd_pagamento, total, produtos)
          .then(() => {
            res.status(201).json({ message: 'Compra inserida com sucesso' });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Erro ao inserir compra' });
          });
      }
}

