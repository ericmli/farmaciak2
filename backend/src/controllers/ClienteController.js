const ClienteService = require('../services/ClienteService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };
        let clientes = await ClienteService.buscarTodos();

        for (let i in clientes) {
            json.result.push({
                id: clientes[i].id,
                nome_completo: clientes[i].nome_completo,
                cpf: clientes[i].cpf,
                nascimento: clientes[i].nascimento,
                email: clientes[i].email,
                senha: clientes[i].senha,
                telefone: clientes[i].telefone
            })
        }
        res.json(json);
    },
    
    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let cliente = await ClienteService.buscarUm(id);

        if (cliente) {
            json.result = cliente;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let nome_completo = req.body.nome_completo;
        let cpf = req.body.cpf;
        let nascimento = req.body.nascimento;
        let email = req.body.email;
        let senha = req.body.senha;
        let telefone = req.body.telefone;

        if (nome_completo && cpf && nascimento && email && senha && telefone) {
            let ClienteId = await ClienteService.inserir(
                nome_completo,
                cpf,
                nascimento,
                email,
                senha,
                telefone);
            json.result = {
                id: ClienteId,
                nome_completo,
                cpf,
                nascimento,
                email,
                senha,
                telefone
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        let  id = req.params.id;
        let nome_completo = req.body.nome_completo;
        let cpf = req.body.cpf;
        let nascimento = req.body.nascimento;
        let email = req.body.email;
        let senha = req.body.senha;
        let telefone = req.body.telefone;


        if (nome_completo && cpf && nascimento && email && senha && telefone) {
            await ClienteService.alterar(id,nome_completo,cpf,nascimento,email,senha,telefone);
            json.result = {
                id,
                nome_completo,
                cpf,
                nascimento,
                email,
                senha,
                telefone
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    login: async(req,res)=> {
        const email = req.body.email;
        const senha = req.body.senha;

        ClienteService.login(email, senha)
        .then(result =>{
            if (result[0])return res.status(200).json({data :result[0] })
        })
        .catch(error => {
            console.log(error);
            res.status(401).json({ error: error.message });
        });
    },


}