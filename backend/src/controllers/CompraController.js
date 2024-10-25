const { json } = require('body-parser');
const CompraService = require('../services/CompraService');

module.exports = {
    getProdutosCompra: (req, res) => {
        const compraId = req.params.id;
        CompraService.getProdutosCompra(compraId, (err, result) => {
            if (err) {
                return res.status(500).send({ error: 'Erro ao buscar os produtos da compra.' });
            }
            res.send(result);
        });
    },

    // Função para criar uma nova compra
    createCompra: (req, res) => {
        const { cliente_id, status, cdgCompra, mtd_pagamento, total, produtos } = req.body;

        CompraService.createCompra(cliente_id, cdgCompra, status, mtd_pagamento, total, produtos)
            .then(() => {
                res.status(201).json({ message: 'Compra inserida com sucesso' });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Erro ao inserir compra' });
            });
    },

    buscarTodos: async (req, res) => {
        try {
            const compras = await CompraService.buscarTodos();
            const json = {
                error: '',
                result: compras.map(({ id, data_compra, cliente_id, status, mtd_pagamento, total, compra_id, produto_id, quantidade, subtotal }) => ({
                    id,
                    data_compra,
                    cliente_id,
                    status,
                    mtd_pagamento,
                    total,
                    compra_id,
                    produto_id,
                    quantidade,
                    subtotal,
                })),
            };
            res.json(json);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar compras.' });
        }
    },

    updateCompra: async (req, res) => {
        const compraId = req.params.id;
        const { cliente_id, cdgCompra, status, mtd_pagamento, total } = req.body;

        try {
            await CompraService.updateCompra(compraId, cliente_id, cdgCompra, status, mtd_pagamento, total);
            res.status(200).json({ message: 'Compra atualizada com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar a compra.' });
        }
    },
};
