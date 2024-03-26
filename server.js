// Importa o módulo express, que é um framework web para Node.js
const express = require("express");

// Importa as classes Connection e Request do módulo tedious, que é um cliente TDS (Tabular Data Stream) para o Node.js
const { Connection, Request} = require("tedious");

// Cria uma instância do aplicativo express
const app = express();

// Define a porta em que o servidor irá escutar
const port = 3000;

// Configuração do middleware para fazer o parsing do corpo da requisição JSON
app.use(express.json());

// Configuração para servir arquivos estáticos
app.use(express.static("public"));

// Configurações de conexão com o banco de dados
const config = {
    server: "127.0.0.1", // Define o endereço do servidor de banco de dados
    authentication: {
        type: "default", // Define o tipo de autenticação como padrão
        options: {
            userName: "sa", // Define o nome de usuário para autenticação
            password: "Pyetra130829" // Define a senha para autenticação
        }
    },
    options: {
        database: "webstore", // Define o nome do banco de dados
        trustServerCertificate: true // Indica se o certificado do servidor deve ser confiado
    }
};


// Função para conectar ao banco de dados
async function connectDatabase() {
    return new Promise((resolve, reject) => {// Retorna uma promessa para envolver operações assíncronas
        const connection = new Connection(config); // Cria uma nova conexão com o banco de dados usando as configurações definidas
        connection.connect(err => { // Tenta conectar ao banco de dados
            if (err) { // Se houver um erro durante a conexão
                reject(err); // Rejeita a promessa com o erro
            } else { // Se a conexão for bem-sucedida
                resolve(connection); // Resolve a promessa com a conexão estabelecida
            }
        });
    });
}


// Função para executar uma consulta SQL e retornar os resultados
async function executeQuery(query) {
    const connection = await connectDatabase(); // Estabelece uma conexão com o banco de dados
    return new Promise((resolve, reject) => { // Retorna uma promessa para envolver operações assíncronas
        const request = new Request(query, (err) => { // Cria uma nova solicitação com a consulta SQL fornecida
            if (err) { // Se houver um erro durante a execução da consulta
                reject(err); // Rejeita a promessa com o erro
            }
            connection.close(); // Fecha a conexão com o banco de dados
        });

        let results = []; // Inicializa um array para armazenar os resultados da consulta

        request.on('row', columns => { // Evento disparado para cada linha de resultados retornada pela consulta
            let row = {}; // Cria um objeto para representar uma linha de resultados
            columns.forEach(column => { // Itera sobre as colunas da linha
                row[column.metadata.colName] = column.value; // Adiciona o valor da coluna ao objeto de linha
            });
            results.push(row); // Adiciona a linha de resultados ao array de resultados
        });

        request.on('requestCompleted', () => { // Evento disparado quando a solicitação de consulta foi concluída
            resolve(results); // Resolve a promessa com os resultados da consulta
        });

        connection.execSql(request); // Executa a solicitação de consulta na conexão estabelecida
    });
}


// Rota para a página inicia
// Esta função é um handler para a rota raiz ('/') da aplicação
// req representa o objeto de requisição (request), contendo informações enviadas pelo cliente
// res representa o objeto de resposta (response), usado para enviar dados de volta ao cliente

// Aqui você pode adicionar o código para lidar com a requisição para a rota raiz
// Por exemplo, você pode renderizar uma página HTML, enviar algum texto ou JSON de volta para o cliente,
// ou executar outras operações

// No final, você geralmente envia uma resposta de volta para o cliente usando res.send(), res.render(),
// res.json(), ou outras funções semelhantes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Envia o arquivo HTML da página inicial localizado no diretório atual
});


// Rota para obter os produtos do banco de dados em formato JSON
app.get('/produtos', async (req, res) => { // Define uma rota GET para /produtos
    try { // Inicia um bloco try-catch para lidar com erros assíncronos
        const query = "SELECT TOP 5 * FROM products ORDER by id DESC"; // Consulta SQL para selecionar todos os produtos
        const products = await executeQuery(query); // Executa a consulta SQL e aguarda os resultados
        res.json(products); // Retorna os produtos em formato JSON como resposta à requisição
    } catch (err) { // Captura e trata qualquer erro ocorrido dentro do bloco try
        console.error(err.message); // Registra o erro no console
        res.status(500).send(err.message); // Retorna uma resposta de status 500 (Internal Server Error) com a mensagem de erro
    }
});


// Rota para adicionar um novo produto
app.post('/produtos', async (req, res) => { // Define uma rota POST para /produtos
    try { // Inicia um bloco try-catch para lidar com erros assíncronos
        const { name, price, quantity, description } = req.body; // Extrai os dados do corpo da requisição
        const query = `INSERT INTO products (name, price, quantity, description) VALUES ('${name}', ${price}, ${quantity}, '${description}');`; // Consulta SQL para inserir um novo produto
        await executeQuery(query); // Executa a consulta SQL
        res.sendStatus(201); // Retorna 201 Created para indicar que o recurso foi criado com sucesso
    } catch (err) { // Captura e trata qualquer erro ocorrido dentro do bloco try
        console.error(err.message); // Registra o erro no console
        res.status(500).send(err.message); // Retorna uma resposta de status 500 (Internal Server Error) com a mensagem de erro
    }
});


// Rota para excluir um produto
app.delete('/produtos/:id', async (req, res) => { // Define uma rota DELETE para /produtos/:id, onde :id é o parâmetro de identificação do produto
    try { // Inicia um bloco try-catch para lidar com erros assíncronos
        const productId = req.params.id; // Obtém o ID do produto a ser excluído a partir dos parâmetros da requisição
        const query = `DELETE FROM products WHERE id = ${productId};`; // Consulta SQL para excluir o produto com o ID especificado
        await executeQuery(query); // Executa a consulta SQL
        res.sendStatus(204); // Retorna 204 No Content para indicar que a operação foi bem-sucedida
    } catch (err) { // Captura e trata qualquer erro ocorrido dentro do bloco try
        console.error(err.message); // Registra o erro no console
        res.status(500).send(err.message); // Retorna uma resposta de status 500 (Internal Server Error) com a mensagem de erro
    }
});


// Rota para editar um produto
app.put('/produtos/:id', async (req, res) => {
    // Esta função é um handler para a rota PUT '/produtos/:id' da aplicação
    // Ela lida com requisições PUT enviadas para atualizar um produto específico no banco de dados
    try {
        const productId = req.params.id; // Obtém o ID do produto a ser atualizado dos parâmetros da requisição
        const { name, price, quantity, description } = req.body; // Obtém os novos dados do produto do corpo da requisição

        // Monta a query SQL para atualizar os dados do produto no banco de dados
        const query = `
            UPDATE products 
            SET 
                name = '${name}', 
                price = ${price}, 
                quantity = ${quantity}, 
                description = '${description}' 
            WHERE id = ${productId};`;

        await executeQuery(query); // Executa a query no banco de dados para atualizar os dados do produto
        res.sendStatus(200); // Envia um status 200 (OK) para indicar que a atualização foi bem-sucedida
    } catch (err) {
        console.error(err.message); // Registra qualquer erro no console
        res.status(500).send(err.message); // Envia um status 500 (Internal Server Error) e a mensagem de erro para o cliente
    }
});


// Rota para buscar um produto por ID
app.get('/produtos/:id', async (req, res) => {
    try {
        const productId = req.params.id; // Obtém o ID do produto a ser buscado dos parâmetros da requisição
        const query = `SELECT * FROM products WHERE id = ${productId};`; // Consulta SQL para buscar o produto com o ID especificado
        const products = await executeQuery(query); // Executa a consulta SQL e aguarda os resultados
        if (products.length > 0) {
            res.json(products[0]); // Retorna os detalhes do produto em formato JSON como resposta à requisição
        } else {
            res.status(404).send("Produto não encontrado"); // Retorna 404 Not Found se o produto não for encontrado
        }
    } catch (err) {
        console.error(err.message); // Registra o erro no console
        res.status(500).send(err.message); // Retorna uma resposta de status 500 (Internal Server Error) com a mensagem de erro
    }
});


// Inicia o servidor na porta especificada
// Inicia o servidor e especifica uma função de retorno de chamada para ser executada quando o servidor estiver pronto para receber conexões
app.listen(port, () => {
    // Registra a mensagem indicando que o servidor está rodando e em qual URL está disponível
    console.log(`Servidor rodando em http://localhost:${port}`); 
});