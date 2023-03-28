const ProdutoService = require('../services/ProdutoService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };
        let produtos = await ProdutoService.buscarTodos();

        for (let i in produtos) {
            json.result.push({
                id: produtos[i].id,
                nome: produtos[i].nome,
                descricao: produtos[i].descricao,
                preco: produtos[i].preco,
                quantidade: produtos[i].quantidade,
                laboratorio: produtos[i].laboratorio,
                categoria: produtos[i].categoria
            })
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let produto = await ProdutoService.buscarUm(id);

        if (produto) {
            json.result = produto;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let nome = req.body.nome;
        let descricao = req.body.descricao;
        let preco = req.body.preco;
        let quantidade = req.body.quantidade;
        let laboratorio = req.body.laboratorio;
        let categoria = req.body.categoria;

        if (nome && descricao && preco && quantidade && laboratorio && categoria) {
            let ProdutoId = await ProdutoService.inserir(
                nome,
                descricao,
                preco,
                quantidade,
                laboratorio,
                categoria);
            json.result = {
                id: ProdutoId,
                nome,
                descricao,
                preco,
                quantidade,
                laboratorio,
                categoria
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let nome = req.body.nome;
        let descricao = req.body.descricao;
        let preco = req.body.preco;
        let quantidade = req.body.quantidade;
        let laboratorio = req.body.laboratorio;
        let categoria = req.body.categoria;


        if (nome && descricao && preco && quantidade && laboratorio && categoria) {
            await ProdutoService.alterar(id,nome,descricao,preco,quantidade,laboratorio,categoria);
            json.result = {
                id,
                nome,
                descricao,
                preco,
                quantidade,
                laboratorio,
                categoria
            };

        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    excluir: async(req, res) =>{
        let json = { error: '', result: {} };

        let produto = await ProdutoService.excluir(req.params.id);

        res.json(json)
    }

}