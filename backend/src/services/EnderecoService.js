const db = require('../db');

module.exports = {
    buscarTodosPorId: async (cliente_id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('SELECT * FROM enderecos WHERE cliente_id = ?', [cliente_id]);
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    buscarPrincipal: async (cliente_id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('SELECT * FROM enderecos WHERE cliente_id = ? AND principal = true', [cliente_id]);
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    buscarFaturamento: async (cliente_id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('SELECT * FROM enderecos WHERE cliente_id = ? AND faturamento = true', [cliente_id]);
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    inserir: async (cliente_id, rua, numero, cidade, estado, cep, principal, faturamento) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            if (principal) {
                // Se o novo endereço for principal, atualize todos os outros endereços do cliente para não serem mais principais
                await con.query('UPDATE enderecos SET principal = false WHERE cliente_id = ?', [cliente_id]);
            }

            // Insere o novo endereço
            const [results] = await con.query(
                'INSERT INTO enderecos (cliente_id, rua, numero, cidade, estado, cep, principal, faturamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [cliente_id, rua, numero, cidade, estado, cep, principal, faturamento]
            );
            return results.insertId;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    alterar: async (id, cliente_id, rua, numero, cidade, estado, cep, principal, faturamento) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            if (principal) {
                // Se o novo endereço for principal, atualize todos os outros endereços do cliente para não serem mais principais
                await con.query('UPDATE enderecos SET principal = false WHERE cliente_id = ?', [cliente_id]);
            }

            // Altera o endereço
            await con.query(
                'UPDATE enderecos SET rua = ?, numero = ?, cidade = ?, estado = ?, cep = ?, principal = ?, faturamento = ? WHERE id = ?',
                [rua, numero, cidade, estado, cep, principal, faturamento, id]
            );
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },
}
