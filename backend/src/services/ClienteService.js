const db = require('../db');
const bcrypt = require('bcrypt');

// Função para verificar se CPF ou email já existem na base de dados
async function verificaExistencia(cpf, email) {
    try {
        const [results] = await db.query('SELECT * FROM funcionarios WHERE cpf = ? OR email = ?', [cpf, email]);
        return results.length > 0;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao verificar existência de CPF ou email.');
    }
}

module.exports = {
    login: async (email, senha) => {
        try {
            const [results] = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);
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
        }
    },

    buscarTodos: async () => {
        try {
            const [results] = await db.query('SELECT * FROM clientes');
            return results;
        } catch (error) {
            throw error;
        }
    },

    buscarUm: async (id) => {
        try {
            const [results] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
            if (results.length > 0) {
                return results[0];
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    },

    inserir: async (nome_completo, cpf, nascimento, email, senha, telefone) => {
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

            const [results] = await db.query(
                'INSERT INTO clientes (nome_completo, cpf, nascimento, email, senha, telefone) VALUES (?, ?, ?, ?, ?, ?)',
                [nome_completo, cpf, nascimento, email, hash, telefone]
            );

            return results.insertId;
        } catch (error) {
            throw error;
        }
    },

    alterar: async (id, nome_completo, cpf, nascimento, email, senha, telefone) => {
        try {
            const emailJaCadastrado = await verificaExistencia('email', email, id);
            if (emailJaCadastrado) {
                return { mensagem: 'E-mail já cadastrado' };
            }

            const cpfJaCadastrado = await verificaExistencia('cpf', cpf, id);
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

            const [results] = await db.query(query, values);
            return results;
        } catch (error) {
            throw error;
        }
    },
};
