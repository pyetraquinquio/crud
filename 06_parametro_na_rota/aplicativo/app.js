const db = require('./db')

const express = require('express')

const app = express()

const port = 3000


const path = require('path')

const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (req, res) => {
    // Obtém o parâmetro 'id' da URL
    const id = req.params.id

    const user = db.users_id.find(user => user.id === parseInt(id))

        if(user) {
            console.log(`Estamos buscando pelo usuário: ${id}`);
            res.send(
               `<h1>Informações do Usuário:</h1> <br> <h2>Nome: ${user.nome}</h2> <br> <h2>Idade: ${user.age}</h2>`
            );
        } else {
            res.status(404).send("Usuário não encontrado!")
        }

    
    });


app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`);
});