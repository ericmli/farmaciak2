const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM funcionarios', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM funcionarios WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserir: (nome_completo,cpf,email,senha,grupo,status,logado) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO funcionarios (nome_completo, cpf, email, senha, grupo, status, logado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome_completo,cpf,email,senha,grupo,status,logado], 
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertId);
                }
                
            );
        });
    }

}