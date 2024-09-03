const db = require('../db');
const bcrypt = require('bcrypt');



// #001
// Função para verificar se CPF ou email já existem na base de dados
async function verificaExistencia(cpf, email) {
    const con = await db.getConnection(); // Obtém uma conexão do pool
    try {
        const [results] = await con.query('SELECT * FROM funcionarios WHERE cpf = ? OR email = ?', [cpf, email]);
        return results.length > 0;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao verificar existência de CPF ou email.');
    } finally {
        con.release(); // Libera a conexão de volta para o pool
    }
}

module.exports = {
    login: async (email, senha) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('SELECT * FROM funcionarios WHERE email = ?', [email]);
            if (results.length === 0) {
                throw new Error('Usuario não encontrado!');
            }
            const match = await bcrypt.compare(senha, results[0].senha);
            if (!match) {
                throw new Error('Senha invalida #');
            }
            if (results[0].status !== 'Ativo') {
                throw new Error('Usuario inativo #');
            }
            if (results[0].logado) {
                throw new Error('Usuario já logado #');
            }
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    buscarTodos: async () => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const [results] = await con.query('SELECT * FROM funcionarios');
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
            const [results] = await con.query('SELECT * FROM funcionarios WHERE id = ?', [id]);
            return results.length > 0 ? results[0] : false;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    inserir: async (nome_completo, cpf, email, senha, grupo, status, logado) => {
        try {
            const emailJaCadastrado = await verificaExistencia('email', email);
            if (emailJaCadastrado) {
                return { mensagem: 'E-mail já cadastrado' };
            }
            const cpfJaCadastrado = await verificaExistencia('cpf', cpf);
            if (cpfJaCadastrado) {
                return { mensagem: 'CPF já cadastrado' };
            }
            const hash = await bcrypt.hash(senha, 10);
            const con = await db.getConnection(); // Obtém uma conexão do pool
            const [results] = await con.query('INSERT INTO funcionarios (nome_completo, cpf, email, senha, grupo, status, logado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome_completo, cpf, email, hash, grupo, status, logado]
            );
            return results.insertId;
        } catch (error) {
            throw error;
        }
    },

    alterar: async (id, nome_completo, cpf, email, senha, grupo, status, logado) => {
        try {
            const emailJaCadastrado = await verificaExistencia('email', email, id);
            if (emailJaCadastrado) {
                return { mensagem: 'E-mail já cadastrado' };
            }
            const cpfJaCadastrado = await verificaExistencia('cpf', cpf, id);
            if (cpfJaCadastrado) {
                return { mensagem: 'CPF já cadastrado' };
            }
            const con = await db.getConnection(); // Obtém uma conexão do pool
            if (senha !== '') {
                const hash = await bcrypt.hash(senha, 10);
                await con.query('UPDATE funcionarios SET nome_completo = ?, cpf = ?, email = ?, senha = ?, grupo = ?, status = ?, logado = ? WHERE id = ?',
                    [nome_completo, cpf, email, hash, grupo, status, logado, id]
                );
            } else {
                await con.query('UPDATE funcionarios SET nome_completo = ?, cpf = ?, email = ?, grupo = ?, status = ?, logado = ? WHERE id = ?',
                    [nome_completo, cpf, email, grupo, status, logado, id]
                );
            }
        } catch (error) {
            throw error;
        }
    },

    excluir: async (id) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            await con.query('DELETE FROM funcionarios WHERE id = ?', [id]);
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    }
}
