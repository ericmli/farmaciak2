// Importa o serviço de Endereço, que contém as funções de acesso ao banco de dados
const EnderecoService = require('../services/EnderecoService');

module.exports = {
    // Função para buscar todos os endereços de um cliente específico
    buscarTodosPorId: async (req, res) => {
        const json = { error: '', result: [] };
        const { cliente_id } = req.params; // Obtém o ID do cliente dos parâmetros da requisição

        try {
            // Busca todos os endereços associados ao cliente
            const enderecos = await EnderecoService.buscarTodosPorId(cliente_id);

            // Se encontrar endereços, mapeia e estrutura a resposta JSON
            if (enderecos.length) {
                json.result = enderecos.map(({ id, cliente_id, rua, numero, cidade, estado, cep, principal, faturamento }) => ({
                    id,
                    cliente_id,
                    rua,
                    numero,
                    cidade,
                    estado,
                    cep,
                    principal,
                    faturamento
                }));
            } else {
                // Retorna um erro 404 se não encontrar endereços
                json.error = "Nenhum endereço encontrado para o cliente";
                return res.status(404).json(json);
            }
        } catch (error) {
            // Captura erros no processo e retorna um erro 500
            json.error = 'Erro ao buscar endereços';
            return res.status(500).json(json);
        }

        // Envia a resposta final em formato JSON
        res.json(json);
    },

    // Função para buscar o endereço principal de um cliente
    buscarPrincipal: async (req, res) => {
        const json = { error: '', result: {} };
        const { cliente_id } = req.params; // Obtém o ID do cliente dos parâmetros da requisição

        try {
            // Busca o endereço principal do cliente
            const endereco = await EnderecoService.buscarPrincipal(cliente_id);

            // Se encontrar o endereço, adiciona à resposta JSON
            if (endereco) {
                json.result = endereco;
            } else {
                // Retorna um erro 404 se não encontrar
                json.error = 'Endereço principal não encontrado';
                return res.status(404).json(json);
            }
        } catch (error) {
            // Captura erros no processo e retorna um erro 500
            json.error = 'Erro ao buscar endereço principal';
            return res.status(500).json(json);
        }

        // Envia a resposta final em formato JSON
        res.json(json);
    },

    // Função para buscar o endereço de faturamento de um cliente
    buscarFaturamento: async (req, res) => {
        const json = { error: '', result: {} };
        const { cliente_id } = req.params; // Obtém o ID do cliente dos parâmetros da requisição

        try {
            // Busca o endereço de faturamento do cliente
            const endereco = await EnderecoService.buscarFaturamento(cliente_id);

            // Se encontrar o endereço, adiciona à resposta JSON
            if (endereco) {
                json.result = endereco;
            } else {
                // Retorna um erro 404 se não encontrar
                json.error = 'Endereço de faturamento não encontrado';
                return res.status(404).json(json);
            }
        } catch (error) {
            // Captura erros no processo e retorna um erro 500
            json.error = 'Erro ao buscar endereço de faturamento';
            return res.status(500).json(json);
        }

        // Envia a resposta final em formato JSON
        res.json(json);
    },

    // Função para inserir um novo endereço para o cliente
    inserir: async (req, res) => {
        const json = { error: '', result: {} };
        // Desestrutura o corpo da requisição para obter os dados do endereço
        const { cliente_id, rua, numero, cidade, estado, cep, principal, faturamento } = req.body;

        // Verifica se os campos obrigatórios foram fornecidos
        if (cliente_id && rua && numero && cidade && estado && cep) {
            try {
                // Insere o novo endereço no banco de dados
                const EnderecoId = await EnderecoService.inserir(
                    cliente_id, rua, numero, cidade, estado, cep, principal, faturamento
                );
                // Prepara a resposta com o novo endereço inserido
                json.result = { id: EnderecoId, cliente_id, rua, numero, cidade, estado, cep, principal, faturamento };
            } catch (error) {
                // Captura erros no processo e retorna um erro 500
                json.error = 'Erro ao inserir endereço';
                return res.status(500).json(json);
            }
        } else {
            // Retorna um erro 400 se os campos obrigatórios não forem fornecidos
            json.error = 'Campos obrigatórios não enviados';
            return res.status(400).json(json);
        }

        // Envia a resposta final em formato JSON
        res.json(json);
    },

    // Função para alterar um endereço existente
    alterar: async (req, res) => {
        const json = { error: '', result: {} };
        const { id } = req.params; // Obtém o ID do endereço a ser alterado dos parâmetros da requisição
        const { rua, numero, cidade, estado, cep, principal, faturamento } = req.body; // Obtém os novos dados do endereço

        // Verifica se os campos obrigatórios foram fornecidos
        if (id && rua && numero && cidade && estado && cep && (typeof principal !== 'undefined' || typeof faturamento !== 'undefined')) {
            try {
                // Atualiza o endereço no banco de dados
                await EnderecoService.alterar(id, rua, numero, cidade, estado, cep, principal, faturamento);
                // Prepara a resposta com os dados atualizados
                json.result = { id, rua, numero, cidade, estado, cep, principal, faturamento };
            } catch (error) {
                // Captura erros no processo e retorna um erro 500
                json.error = 'Erro ao alterar endereço';
                return res.status(500).json(json);
            }
        } else {
            // Retorna um erro 400 se os campos obrigatórios não forem fornecidos
            json.error = 'Campos obrigatórios não enviados';
            return res.status(400).json(json);
        }

        // Envia a resposta final em formato JSON
        res.json(json);
    },
}
