require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const routes = require('./routes');

const server = express();

// Middleware
server.use(helmet()); // Segurança
server.use(cors());
server.use(morgan('combined')); // Logging
server.use(compression()); // Compressão
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limite de 100 requisições por IP
});
server.use(limiter);

// Rotas
server.use('/api', routes);

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Start server
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

if (!PORT || !DB_HOST) {
    console.error('Por favor, defina as variáveis de ambiente PORT e DB_HOST.');
    process.exit(1);
}

server.listen(PORT, () => {
    console.log(`Servidor rodando em: ${DB_HOST}, porta: ${PORT}`);
});
