const db = require('../db');

module.exports = {
    buscarTodosPorId: (cliente_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM enderecos WHERE cliente_id = ?', [cliente_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarPrincipal: (cliente_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM enderecos WHERE cliente_id = ? AND principal = true', [cliente_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarFaturamento: (cliente_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM enderecos WHERE cliente_id = ? AND faturamento = true', [cliente_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            })
        })
        
    },

    inserir: async (cliente_id, rua, numero, cidade, estado, cep, principal, faturamento) => {
        return new Promise(async(aceito, rejeitado) => {
            let query = 'INSERT INTO enderecos (cliente_id, rua, numero, cidade, estado, cep, principal, faturamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
            db.query(query,
            [cliente_id, rua, numero, cidade, estado, cep, principal, faturamento], (error, results) => {
                if (error) { rejeitado(error); return;}
                    aceito(results.insertId);
            })
        })
    },

    alterar: (id, rua, numero, cidade, estado, cep, principal, faturamento) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE enderecos SET rua = ?, ' +
                'numero = ?, cidade = ?, estado = ?, cep = ?, principal = ?, faturamento = ? WHERE id = ?',
                [rua, numero, cidade, estado, cep, principal, faturamento, id],
                (error, results) => {
                    console.log(error);
                    if (error) { rejeitado(error); return; }
                    aceito(results);

                }

            );
        });
    },
}
