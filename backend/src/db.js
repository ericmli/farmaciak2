const mysql = require('mysql2/promise'); // Use mysql2/promise para suporte a Promises

const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

let pool;
const maxRetries = 5; // Número máximo de tentativas de reconexão
const retryInterval = 2000; // Intervalo entre tentativas em milissegundos

async function createPool() {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            pool = mysql.createPool(connectionConfig); // Cria um pool de conexões
            console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);
            return pool;
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
            retries++;
            if (retries < maxRetries) {
                console.log(`Tentando reconectar em ${retryInterval / 1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, retryInterval)); // Aguarda antes de tentar novamente
            } else {
                throw new Error('Não foi possível conectar ao banco de dados após várias tentativas.');
            }
        }
    }
}

createPool().catch(error => {
    console.error('Falha na criação do pool de conexões:', error);
});

module.exports = {
    getConnection: async () => {
        if (!pool) {
            await createPool();
        }
        return pool.getConnection();
    }
};
