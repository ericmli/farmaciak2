const db = require('../db');

modeule.exports = {
    buscarTodos: (produto_id) => {
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM avaliacoes WHERE produto_id = ?', [produto_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    } 
}