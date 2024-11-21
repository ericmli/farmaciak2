const db = require('../db');
const bcrypt = require('bcrypt');
const emai = require('../utils/email');

// Função para verificar se CPF ou email já existem na base de dados
async function verificaExistencia(cpf, email) {
    const con = await db.getConnection(); // Obtém uma conexão do pool
    try {
        const [results] = await con.query(
            'SELECT * FROM clientes WHERE cpf = ? OR email = ?', 
            [cpf, email]
        );
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
            const [results] = await con.query(
                'SELECT * FROM clientes WHERE email = ?', 
                [email]
            );

            if (results.length === 0) {
                throw new Error('Usuário não encontrado!');
            }

            const match = await bcrypt.compare(senha, results[0].senha);
            if (!match) {
                throw new Error('Senha inválida');
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
            const [results] = await con.query('SELECT * FROM clientes');
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
            const [results] = await con.query(
                'SELECT * FROM clientes WHERE id = ?', 
                [id]
            );

            if (results.length > 0) {
                return results[0];
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    inserir: async (nome_completo, cpf, nascimento, email, senha, telefone) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const emailJaCadastrado = await verificaExistencia(cpf, email);
            if (emailJaCadastrado) {
                return { mensagem: 'E-mail já cadastrado' };
            }

            const cpfJaCadastrado = await verificaExistencia(cpf, email);
            if (cpfJaCadastrado) {
                return { mensagem: 'CPF já cadastrado' };
            }

            const hash = await bcrypt.hash(senha, 10);

            const [results] = await con.query(
                'INSERT INTO clientes (nome_completo, cpf, nascimento, email, senha, telefone) VALUES (?, ?, ?, ?, ?, ?)',
                [nome_completo, cpf, nascimento, email, hash, telefone]
            );

                 emai(email,"conta criada com sucesso" , `é um prazer recebelo 
                ${nome_completo}`)
            return results.insertId;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    },

    alterar: async (id, nome_completo, cpf, nascimento, email, senha, telefone) => {
        const con = await db.getConnection(); // Obtém uma conexão do pool
        try {
            const emailJaCadastrado = await verificaExistencia(cpf, email);
            if (emailJaCadastrado) {
                return { mensagem: 'E-mail já cadastrado' };
            }

            const cpfJaCadastrado = await verificaExistencia(cpf, email);
            if (cpfJaCadastrado) {
                return { mensagem: 'CPF já cadastrado' };
            }

            let hash;
            if (senha) {
                hash = await bcrypt.hash(senha, 10);
            }

            const query = senha
                ? 'UPDATE clientes SET nome_completo = ?, cpf = ?, nascimento = ?, email = ?, senha = ?, telefone = ? WHERE id = ?'
                : 'UPDATE clientes SET nome_completo = ?, cpf = ?, nascimento = ?, email = ?, telefone = ? WHERE id = ?';

            const values = senha
                ? [nome_completo, cpf, nascimento, email, hash, telefone, id]
                : [nome_completo, cpf, nascimento, email, telefone, id];

            const [results] = await con.query(query, values);
            return results;
        } catch (error) {
            throw error;
        } finally {
            con.release(); // Libera a conexão de volta para o pool
        }
    }
};