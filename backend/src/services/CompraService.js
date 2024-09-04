const db = require('../db');
const mysql = require('mysql');

module.exports = {
  getProdutosCompra: async (compraId) => {
    const con = await db.getConnection(); // Obtém uma conexão do pool
    try {
      const [results] = await con.query('SELECT * FROM produtos_compra WHERE compra_id = ?', [compraId]);
      return results;
    } catch (error) {
      throw error;
    } finally {
      con.release(); // Libera a conexão de volta para o pool
    }
  },

  // Função para criar uma nova compra
  createCompra: async (cliente_id, cdgCompra, status, mtd_pagamento, total, produtos) => {
    const con = await db.getConnection(); // Obtém uma conexão do pool
    try {
      // Inserir a compra na tabela 'compras'
      const [result] = await con.query(
        'INSERT INTO compras (cliente_id, cdgCompra, status, mtd_pagamento, total) VALUES (?, ?, ?, ?, ?)',
        [cliente_id, cdgCompra, status, mtd_pagamento, total]
      );

      const compraId = result.insertId;

      // Inserir os produtos relacionados à compra na tabela 'produtos_compra'
      const produtosQuery = 'INSERT INTO produtos_compra (compra_id, produto_id, quantidade, subtotal) VALUES ?';
      const produtosValues = produtos.map((produto) => [
        compraId,
        produto.produto_id,
        produto.quantidade,
        produto.subtotal,
      ]);

      await con.query(produtosQuery, [produtosValues]);

      return compraId; // Retorna o ID da nova compra inserida
    } catch (error) {
      throw error;
    } finally {
      con.release(); // Libera a conexão de volta para o pool
    }
  },

  buscarTodos: async () => {
    const con = await db.getConnection(); // Obtém uma conexão do pool
    try {
      const [results] = await con.query(`
        SELECT 
          c.id_compra, c.data_compra, c.cliente_id, c.cdgCompra, c.status, c.mtd_pagamento, c.total,
          pc.id_produto_compra, pc.compra_id, pc.produto_id, pc.quantidade, pc.subtotal 
        FROM compras c 
        JOIN produtos_compra pc ON c.id_compra = pc.compra_id;
      `);
      return results;
    } catch (error) {
      throw error;
    } finally {
      con.release(); // Libera a conexão de volta para o pool
    }
  },

  updateCompra: async (compraId, cliente_id, cdgCompra, status, mtd_pagamento, total) => {
    const con = await db.getConnection(); // Obtém uma conexão do pool
    try {
      const compraQuery = `
        UPDATE compras 
        SET cliente_id = ?, cdgCompra = ?, status = ?, mtd_pagamento = ?, total = ? 
        WHERE id_compra = ?`;
      const compraValues = [cliente_id, cdgCompra, status, mtd_pagamento, total, compraId];

      await con.query(compraQuery, compraValues);
    } catch (error) {
      throw error;
    } finally {
      con.release(); // Libera a conexão de volta para o pool
    }
  },
};
