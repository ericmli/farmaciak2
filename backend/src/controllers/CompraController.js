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
      },

      buscarTodos : async (req, res) => {
        let json = { error: '', result: [] };
        let compras = await CompraService.buscarTodos();

        for(let i in compras){
            json.result.push({
                id:compras[i].id,
                data_compra: compras[i].data_compra,
                cliente_id: compras[i].cliente_id,
                status: compras[i].status,
                mtd_pagamento: compras[i].mtd_pagamento,
                total: compras[i].total,
                compra_id: compras[i].compra_id,
                produto_id: compras[i].produto_id,
                quantidade: compras[i].quantidade,
                subtotal: compras[i].subtotal
            })
        }
        res.json(json);
      }

}

