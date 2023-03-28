const db = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
    login: (email, senha) =>{
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM funcionarios WHERE email = ?', [email], (error, results) =>{
                if (error) {
                    rejeitado(error); 
                }else if(results.length === 0){
                    rejeitado(new Error('Usuario não encontrado!'))
                }else {
                    bcrypt.compare(senha, results[0].senha, (err, match) =>{
                        if (err) {
                            rejeitado(err);
                        }else if (!match) {
                            rejeitado(new Error('Senha invalida #'));
                        }else if (results[0].status !== 'ativo') {
                            rejeitado(new Error('Usuario inativo #'));
                        }else if (results[0].logado) {
                            rejeitado(new Error('Usuario já logado #'));
                        }else{
                            aceito(results)
                        }
                    })
                }
            });
        });
    },

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
        console.log(nome_completo,cpf,email,senha,grupo,status,logado)
        return new Promise((aceito, rejeitado) => {
            bcrypt.hash(senha, 10,(error, hash) =>{
                if(error) {
                    rejeitado(error);
                }else{
                    db.query('INSERT INTO funcionarios (nome_completo, cpf, email, senha, grupo, status, logado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome_completo,cpf,email,hash,grupo,status,logado], 
                (error, results) => {
                    if (error) { 
                        rejeitado(error);
                    }else{
                        aceito(results.insertId);
                    }  
                });
            }
        });
    });
    },

    alterar: (id,nome_completo,cpf,email,senha,grupo,status,logado) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE funcionarios SET nome_completo = ?, ' +
            'cpf = ?, email = ?, senha = ?, grupo = ?, status = ?, logado = ? WHERE id = ?',
                [nome_completo,cpf,email,senha,grupo,status,logado,id], 
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
            db.query('DELETE FROM funcionarios WHERE id =?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }

}