const mysql = require('mysql2');
const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(connectionConfig);

    connection.connect((error) => {
        if (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
            setTimeout(handleDisconnect, 2000); // Tenta reconectar após 2 segundos
        } else {
            console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);
        }
    });

    connection.on('error', (error) => {
        console.error('Erro na conexão com o banco de dados:', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconecta em caso de perda de conexão
        } else {
            throw error;
        }
    });
}

handleDisconnect();

module.exports = connection;
