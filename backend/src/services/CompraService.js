const db = require('../db');

exports.getProdutosCompra = (compraId, callback) => {
    const sql = `SELECT * FROM produtos_compra WHERE compra_id = ?`;
    db.query(sql, [compraId], callback);
};
