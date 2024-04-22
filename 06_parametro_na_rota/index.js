const express = require('express')

const app = express()

const port = 3000


const path = require('path')

const users_id = [
    { id: 1, nome: "Pyetra", age: 17},
    { id: 2, nome: "Emily", age: 18},
    { id: 3, nome: "Maria", age: 18},
    { id: 4, nome: "Gabrielly", age: 13},
    { id: 5, nome: "Ana", age: 16},
    { id: 6, nome: "Manuela", age: 17},
    { id: 7, nome: "Bianca", age: 19},
    { id: 8, nome: "Isabela", age: 15},
    { id: 9, nome: "Gabriel", age: 20},
    { id: 10, nome: "Matheus", age: 37}

];



const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (req, res) => {
    // Obtém o parâmetro 'id' da URL
    const id = req.params.id

    const user = users_id.find(user => user.id === parseInt(id))

        if(user) {
            console.log(`Estamos buscando pelo usuário: ${id}`);
            res.send(
               `<h1>Informações do Usuário:</h1> <br> <p>Nome: ${user.nome}</p> <br> <p>Idade: ${user.age}</p>`
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