;const AvaliacaoService = require('../services/AvaliacaoService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };
        let produto_id = req.params.produto_id;
        let avaliacoes = await AvaliacaoService.buscarTodos(produto_id);

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

    buscarAvaliacaoPorCliente: async(req, res) => {
        let json = { error: '', result: [] };
        let produto_id = req.params.produto_id;
        let cliente_id = req.params.cliente_id;
        let avaliacoes = await AvaliacaoService.buscarAvaliacaoPorCliente( produto_id, cliente_id);

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

    inserir: async(req, res) => {
        let json = { error: '', result: [] };
        
        let cliente_id = req.body.cliente_id;
        let produto_id = req.body.produto_id;
        let avaliacao = req.body.avaliacao;

        if (cliente_id && produto_id && avaliacao) {
            let AvaliacaoId = await AvaliacaoService.inserir(
                cliente_id,
                produto_id,
                avaliacao
            );
            json.result = {
                id: AvaliacaoId,
                cliente_id,
                produto_id,
                avaliacao
            };
        }else{
            json.error = "Campos não enviados"; 
        }
        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let avaliacao = req.body.avaliacao;
        console.log(id)

        if (avaliacao) {
            await AvaliacaoService.alterar(id, avaliacao);
            json.result = {
                id,
                avaliacao
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    }
}