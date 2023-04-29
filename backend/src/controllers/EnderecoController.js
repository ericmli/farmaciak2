const EnderecoService = require('../services/EnderecoService');

module.exports = {
    buscarTodosPorId: async (req, res) => {
        let json = { error: '', result: [] };
        let cliente_id = req.params.cliente_id;
        let enderecos = await EnderecoService.buscarTodosPorId(cliente_id);

        if (enderecos.length > 0) {
            for(let i in enderecos) {
                json.result.push({
                    id: enderecos[i].id,
                    cliente_id:enderecos[i].cliente_id,
                    rua: enderecos[i].rua,
                    numero: enderecos[i].numero,
                    cidade: enderecos[i].cidade,
                    estado: enderecos[i].estado,
                    cep: enderecos[i].cep,
                    principal: enderecos[i].principal
                })
            }
            res.json(json);
        } else {
            json.error = "Nenhum endereço encontrado para o cliente";
            res.status(404).json(json);
        }
    },

    buscarPrincipal: async (req, res) => {
        let json = { error: '', result: {} };

        let cliente_id = req.params.cliente_id;
        let endereco = await EnderecoService.buscarPrincipal(cliente_id);

        if (endereco) {
            json.result = endereco;
        }

        res.json(json);
    },

    inserir: async(req, res) => {
        let json = { error: '', result: {} };

        let cliente_id = req.body.cliente_id;
        let rua = req.body.rua;
        let numero = req.body.numero;
        let cidade = req.body.cidade;
        let estado = req.body.estado;
        let cep = req.body.cep;
        let principal = req.body.principal;

        if (cliente_id && rua && numero && cidade && estado && cep) {
            let EnderecoId = await EnderecoService.inserir(
                cliente_id,
                rua,
                numero,
                cidade,
                estado,
                cep,
                principal
            );
            json.result = {
                id: EnderecoId,
                rua,
                numero,
                cidade,
                estado,
                cep,
                principal
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };
    
        let id = req.params.id;
        let rua = req.body.rua;
        let numero = req.body.numero;
        let cidade = req.body.cidade;
        let estado = req.body.estado;
        let cep = req.body.cep;
        let principal = req.body.principal;

        if(rua){
            await EnderecoService.alterar(id, rua, numero, cidade, estado, cep, principal);
            json.result = {
                id,
                rua,
                numero,
                cidade,
                estado,
                cep,
                principal
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    }

}
