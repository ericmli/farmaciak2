const db = require('../db');

module.exports = {
    buscarTodos: async (produto_id) => {
        try {
            const [results] = await db.promise().query('SELECT * FROM avaliacoes WHERE produto_id = ?', [produto_id]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    buscarAvaliacaoPorCliente: async (produto_id, cliente_id) => {
        try {
            const [results] = await db.promise().query('SELECT * FROM avaliacoes WHERE produto_id = ? AND cliente_id = ?', [produto_id, cliente_id]);
            return results;
        } catch (error) {
            throw error;
        }
    },

    inserir: async (cliente_id, produto_id, avaliacao) => {
        try {
            const [results] = await db.promise().query(
                'INSERT INTO avaliacoes (cliente_id, produto_id, avaliacao) VALUES (?, ?, ?)',
                [cliente_id, produto_id, avaliacao]
            );
            return results.insertId;
        } catch (error) {
            throw error;
        }
    },

    alterar: async (id, avaliacao) => {
        try {
            const [results] = await db.promise().query(
                'UPDATE avaliacoes SET avaliacao = ? WHERE id = ?',
                [avaliacao, id]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
}