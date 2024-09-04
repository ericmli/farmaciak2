const db = require('../db');

module.exports = {
    buscarTodos: async () => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('SELECT * FROM produtos');
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    buscarUm: async (id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('SELECT * FROM produtos WHERE id = ?', [id]);
            return results.length > 0 ? results[0] : false;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    buscarPorNome: async (nome) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query(`SELECT * FROM produtos WHERE nome LIKE ?`, [`%${nome}%`]);
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    inserir: async (nome, descricao, preco, quantidade, laboratorio, categoria, img) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query(
                'INSERT INTO produtos (nome, descricao, preco, quantidade, laboratorio, categoria, img) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome, descricao, preco, quantidade, laboratorio, categoria, img]
            );
            return results.insertId;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    alterar: async (id, nome, descricao, preco, quantidade, laboratorio, categoria, status) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query(
                'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, laboratorio = ?, categoria = ?, status = ? WHERE id = ?',
                [nome, descricao, preco, quantidade, laboratorio, categoria, status, id]
            );
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    excluir: async (id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('DELETE FROM produtos WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    }
}
