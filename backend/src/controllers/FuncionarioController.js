const FuncionarioService = require('../services/FuncionarioService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };
        let funcionarios = await FuncionarioService.buscarTodos();

        for (let i in funcionarios) {
            json.result.push({
                id: funcionarios[i].id,
                nome_completo: funcionarios[i].nome_completo,
                cpf: funcionarios[i].cpf,
                email: funcionarios[i].email,
                senha: funcionarios[i].senha,
                grupo: funcionarios[i].grupo,
                status: funcionarios[i].status,
                logado: funcionarios[i].logado
            })
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let funcionario = await FuncionarioService.buscarUm(id);

        if (funcionario) {
            json.result = funcionario;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let nome_completo = req.body.nome_completo;
        let cpf = req.body.cpf;
        let email = req.body.email;
        let senha = req.body.senha;
        let grupo = req.body.grupo;
        let status = req.body.status;
        let logado = req.body.logado;

        console.log(req.body)


        if (nome_completo && cpf && email && senha && grupo && status && logado) {
            let FuncionarioId = await FuncionarioService.inserir(
                nome_completo,
                cpf,
                email,
                senha,
                grupo,
                status,
                logado);
            json.result = {
                id: FuncionarioId,
                nome_completo,
                cpf,
                email,
                senha,
                grupo,
                status,
                logado
            };

        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    }
}