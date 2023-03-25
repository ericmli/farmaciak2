require('dotenv').config({path:'.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
server.use(bodyParser.json());
const routes = require('./routes');

server.use(cors());

server.use(bodyParser.urlencoded({extended:false}));

server.use('/api', routes)

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
})