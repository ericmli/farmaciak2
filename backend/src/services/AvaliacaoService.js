const db = require('../db');

module.exports = {
    buscarTodos: async (produto_id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query(
                'SELECT * FROM avaliacoes WHERE produto_id = ?', 
                [produto_id]
            );
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    buscarAvaliacaoPorCliente: async (produto_id, cliente_id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query(
                'SELECT * FROM avaliacoes WHERE produto_id = ? AND cliente_id = ?', 
                [produto_id, cliente_id]
            );
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    inserir: async (cliente_id, produto_id, avaliacao) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query(
                'INSERT INTO avaliacoes (cliente_id, produto_id, avaliacao) VALUES (?, ?, ?)',
                [cliente_id, produto_id, avaliacao]
            );
            return results.insertId;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    alterar: async (id, avaliacao) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query(
                'UPDATE avaliacoes SET avaliacao = ? WHERE id = ?',
                [avaliacao, id]
            );
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },
};
