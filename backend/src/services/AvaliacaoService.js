const db = require('../db');

module.exports = {
    buscarTodos: (produto_id) => {
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM avaliacoes WHERE produto_id = ?', [produto_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarAvaliacaoPorCliente: (produto_id, cliente_id) => {
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM avaliacoes WHERE produto_id = ? AND cliente_id = ?', [produto_id, cliente_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    inserir: async (cliente_id, produto_id, avaliacao) => {
        return new Promise(async(aceito, rejeitado) => {
            let query = 'INSERT INTO avaliacoes (cliente_id, produto_id, avaliacao) VALUES (?, ?, ?)'
            db.query(query,
            [cliente_id, produto_id, avaliacao], (error, results) => {
                if (error) { rejeitado(error); return;}
                    aceito(results.insertId);
            })
        })
    },

    alterar: (id, avaliacao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE avaliacoes SET avaliacao = ? WHERE id = ?',
                [avaliacao, id],
                (error, results) => {
                    console.log(error);
                    if (error) { rejeitado(error); return; }
                    aceito(results);

                }

            );
        });
    },
}