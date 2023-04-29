const db = require('../db');

module.exports = {
    getProdutosCompra : (compraId, callback) => {
        const sql = `SELECT * FROM produtos_compra WHERE compra_id = ?`;
        db.query(sql, [compraId], callback);
    },

    createCompra : (clienteId, status, total) => {
        return new Promise((aceito, rejeitado) =>{
            db.query('INSERT INTO compras (cliente_id, status, total) VALUES (?, ?, ?)',
            [clienteId, status], (error, results) => {
                if (error) {
                    if (error) { rejeitado(error); return;}
                    aceito(results.insertId);
                }
            })
        })
    }
}
