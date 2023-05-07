const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM produtos', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM produtos WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarPorNome: (nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM produtos WHERE nome LIKE '%${nome}%'`, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    inserir: (nome,descricao,preco,quantidade,laboratorio,categoria,img) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO produtos (nome, descricao, preco, quantidade, laboratorio, categoria, img) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome,descricao,preco,quantidade,laboratorio,categoria,img], 
                (error, results) => {
                    if (error) { rejeitado(error); return;}
                    aceito(results.insertId);
                }
                
            );
        });
    },

    alterar: (id,nome,descricao,preco,quantidade,laboratorio,categoria, status) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE produtos SET nome = ?, ' +
                'descricao = ?, preco = ?, quantidade = ?, laboratorio = ?, categoria = ?, status = ? WHERE id = ?',
                [nome, descricao, preco, quantidade, laboratorio, categoria, status, id],
                (error, results) => {
                    console.log(error);
                    if (error) { rejeitado(error); return; }
                    aceito(results);

                }

            );
        });
    },

    excluir: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM produtos WHERE id =?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
}