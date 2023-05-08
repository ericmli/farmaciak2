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
            let query;
            let values;
    
            if (principal) {
                // Se o novo endereço for principal, atualize todos os outros endereços do cliente para não serem mais principais
                query = 'UPDATE enderecos SET principal = false WHERE cliente_id = ?';
                values = [cliente_id];
    
                db.query(query, values, (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                });
            }
    
            // Insira o novo endereço
            query = 'INSERT INTO enderecos (cliente_id, rua, numero, cidade, estado, cep, principal, faturamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            values = [cliente_id, rua, numero, cidade, estado, cep, principal, faturamento];
    
            db.query(query, values, (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results.insertId);
            });
        });
    },

    alterar: async (id, cliente_id, rua, numero, cidade, estado, cep, principal, faturamento) => {
        return new Promise(async(aceito, rejeitado) => {
            let query;
            let values;
    
            if (principal) {
                // Se o novo endereço for principal, atualize todos os outros endereços do cliente para não serem mais principais
                query = 'UPDATE enderecos SET principal = false WHERE cliente_id = ?';
                values = [cliente_id];
    
                db.query(query, values, (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                });
            }
    
            // Altera o endereço
            query = 'UPDATE enderecos SET rua = ?, numero = ?, cidade = ?, estado = ?, cep = ?, principal = ?, faturamento = ? WHERE id = ?';
            values = [rua, numero, cidade, estado, cep, principal, faturamento, id];
    
            db.query(query, values, (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results.insertId);
            });
        });
    },
}
