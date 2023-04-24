const { json } = require('body-parser');
const CompraService = require('../services/CompraService');

module.exports = {
    getProdutosCompra : (req, res) => {
        const compraId = req.params.id;
        CompraService.getProdutosCompra(compraId, (err, result) => {
            if (err) {
                res.status(500).send({ error: 'Erro ao buscar os produtos da compra.' });
            } else {
                res.send(result);
            }
        });
    },
    createCompra: async (req, res) => {
        let json = { error: '', result: {} };

        let clienteId = req.body.clienteId;
        let status = req.body.status;

        console.log(clienteId)
        console.log(status)
        if (clienteId && status) {
            let compraId = await CompraService.createCompra(
                clienteId, status
            );
            json.result = {
                id_compra: compraId,
                clienteId,
                status
            };
        }else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    }

};