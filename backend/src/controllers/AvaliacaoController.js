;const AvaliacaoService = require('../services/AvaliacaoService');

modeule.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };
        let avaliacoes = await AvaliacaoService.buscarTodos();

        for( let i in avaliacoes){
            json.result.push({
                id: avaliacoes[i].id,
                cliente_id: avaliacoes[i].cliente_id,
                produto_id: avaliacoes[i].produto_id,
                avaliacao: avaliacoes[i].avaliacao,
                dataAvaliacao: avaliacoes[i].dataAvaliacao
            })
        }
        res.json(json);
    },

    
}