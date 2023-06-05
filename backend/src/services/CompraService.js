const db = require('../db');
const mysql = require('mysql');

module.exports = {
  getProdutosCompra: (compraId, callback) => {
    const sql = `SELECT * FROM produtos_compra WHERE compra_id = ?`;
    db.query(sql, [compraId], callback);
  },

  // Função para criar uma nova compra

createCompra : (cliente_id, status, mtd_pagamento, total, produtos) => {
  return new Promise((resolve, reject) => {
    const compraQuery = 'INSERT INTO compras (cliente_id, status, mtd_pagamento, total) VALUES (?, ?, ?, ?)';
    const compraValues = [cliente_id, status, mtd_pagamento, total];

    db.query(compraQuery, compraValues, (error, result) => {
      if (error) {
        return reject(error);
      }

      const compraId = result.insertId;
      const produtosQuery = 'INSERT INTO produtos_compra (compra_id, produto_id, quantidade, subtotal) VALUES ?';

      const produtosValues = produtos.map((produto) => [
        compraId,
        produto.produto_id,
        produto.quantidade,
        produto.subtotal,
      ]);

      db.query(produtosQuery, [produtosValues], (error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    });
  });
},

buscarTodos: () => {
  return new Promise((aceito, rejeitado) => {
    const q = 'SELECT c.id_compra, c.data_compra, c.cliente_id, c.status, c.mtd_pagamento, c.total, pc.id_produto_compra, pc.compra_id, pc.produto_id, pc.quantidade, pc.subtotal FROM compras c JOIN produtos_compra pc ON c.id_compra = pc.compra_id';
    db.query(q, (error, results) => {
      if (error) { rejeitado(error); return; }
      aceito(results);
    });
  });
}


}
