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
                categoria: produtos[i].categoria,
                img: produtos[i].img,
                status: produtos[i].status
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

    buscarPorNome:  async (req, res) => {
        let json = { error: '', result: [] };
        let nome = req.body.nome;
        let produtos = await ProdutoService.buscarPorNome(nome);

        if (nome) {
            for (let i in produtos) {
                json.result.push({
                    id: produtos[i].id,
                    nome: produtos[i].nome,
                    descricao: produtos[i].descricao,
                    preco: produtos[i].preco,
                    quantidade: produtos[i].quantidade,
                    laboratorio: produtos[i].laboratorio,
                    categoria: produtos[i].categoria,
                    img: produtos[i].img,
                    status: produtos[i].status
                })
            }
            res.json(json);
        }else{
            console.log("caiu no else")
        }
        
    },


    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let nome = req.body.nome;
        let descricao = req.body.descricao;
        let preco = req.body.preco;
        let quantidade = req.body.quantidade;
        let laboratorio = req.body.laboratorio;
        let categoria = req.body.categoria;
        let img = req.file.path
        console.log(img);

        if (nome && descricao && preco && quantidade && laboratorio && categoria && img) {
            let ProdutoId = await ProdutoService.inserir(
                nome,
                descricao,
                preco,
                quantidade,
                laboratorio,
                categoria,
                img);
            json.result = {
                id: ProdutoId,
                nome,
                descricao,
                preco,
                quantidade,
                laboratorio,
                categoria,
                img
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
        let status = req.body.status;

        if (nome && descricao && preco && quantidade && laboratorio && categoria && status) {
            await ProdutoService.alterar(id,nome,descricao,preco,quantidade,laboratorio,categoria,status);
            json.result = {
                id,
                nome,
                descricao,
                preco,
                quantidade,
                laboratorio,
                categoria,
                status
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