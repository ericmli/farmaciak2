const db = require('../db');
const bcrypt = require('bcrypt');

// Função para verificar se CPF ou email já existem na base de dados
async function verificaExistencia(cpf, email) {
    try {
        const results = await db.query('SELECT * FROM funcionarios WHERE cpf = ? OR email = ?', [cpf, email]);
        return results.length > 0;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao verificar existência de CPF ou email.');
    }
}

module.exports = {
    login: (email, senha) => {

        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM clientes WHERE email = ?', [email], (error, results) => {
                if (error) {
                    rejeitado(error);
                } else if (results.length === 0) {
                    rejeitado(new Error('Usuario não encontrado!'))
                } else {
                    bcrypt.compare(senha, results[0].senha, (err, match) => {
                        if (err) {
                            rejeitado(err);
                        } else if (!match) {
                            rejeitado(new Error('Senha invalida #'));
                        } else {
                            aceito(results);
                        }
                    })
                }
            });
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM clientes', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM clientes WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserir: async (nome_completo, cpf, nascimento, email, senha, telefone) => {
        return new Promise(async (aceito, rejeitado) => {
            try {
                const emailJaCadastrado = await verificaExistencia('email', email);
                if (emailJaCadastrado) {
                    return aceito({ mensagem: 'E-mail já cadastrado' });
                }
                const cpfJaCadastrado = await verificaExistencia('cpf', cpf);
                if (cpfJaCadastrado) {
                    return aceito({ mensagem: 'CPF já cadastrado' });
                }
                bcrypt.hash(senha, 10, async (error, hash) => {
                    if (error) {
                        rejeitado(error);
                    } else {
                        db.query('INSERT INTO clientes (nome_completo, cpf, nascimento, email, senha, telefone) VALUES (?, ?, ?, ?, ?, ?)',
                            [nome_completo, cpf, nascimento, email, hash, telefone],
                            (error, results) => {
                                if (error) {
                                    rejeitado(error);
                                } else {
                                    aceito(results.insertId);
                                }
                            });
                    }
                });
            } catch (error) {
                rejeitado(error);
            }
        });
    },

    alterar: async (id, nome_completo, cpf,  nascimento, email, senha, telefone) => {
        return new Promise(async (aceito, rejeitado) => {
            try {
                const emailJaCadastrado = await verificaExistencia('email', email, id);
                if (emailJaCadastrado) {
                    return aceito({ mensagem: 'E-mail já cadastrado' });
                }
                const cpfJaCadastrado = await verificaExistencia('cpf', cpf, id);
                if (cpfJaCadastrado) {
                    return aceito({ mensagem: 'CPF já cadastrado' });
                }
                if (senha !== '') {
                    bcrypt.hash(senha, 10, (error, hash) => {
                        if (error) {
                            rejeitado(error);
                        } else {
                            db.query('UPDATE clientes SET nome_completo = ?, ' +
                                'cpf = ?, nascimento = ?, email = ?, senha = ?, telefone = ? WHERE id = ?',
                                [nome_completo, cpf, nascimento, email, hash, telefone, id],
                                (error, results) => {
                                    if (error) {
                                        rejeitado(error);
                                    } else {
                                        aceito(results);
                                    }
                                }
                            );
                        }
                    });
                } else {
                    db.query('UPDATE clientes SET nome_completo = ?, ' +
                        'cpf = ?, nascimento = ?, email = ?, telefone = ? WHERE id = ?',
                        [nome_completo, cpf, nascimento, email, telefone, id],
                        (error, results) => {
                            if (error) {
                                rejeitado(error);
                            } else {
                                aceito(results);
                            }
                        }
                    );
                }
            } catch (error) {
                rejeitado(error);
            }
        });
    }

}