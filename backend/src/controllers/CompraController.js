const CompraService = require('../services/CompraService');

exports.getProdutosCompra = (req, res) => {
    const compraId = req.params.id;
    CompraService.getProdutosCompra(compraId, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Erro ao buscar os produtos da compra.' });
        } else {
            res.send(result);
        }
    });
};