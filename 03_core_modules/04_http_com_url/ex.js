const http = require('http')
const url = require('url')


const port = 3000

const server = http.createServer((req, res) => {
    var urlInfo = require("url").parse(req.url, true);

    console.log("URL completa:", req.url);
    console.log("Protocolo:", urlInfo.protocol);
    console.log("Hostname:", urlInfo.hostname);
    console.log("Porta:", urlInfo.port);
    console.log("Caminho:", urlInfo.pathname);
    console.log("Querry String:", urlInfo.search);
    console.log("Parâmetros da consulta:", urlInfo.query);

    const name = urlInfo.query.name;

    if (name < 0 || name > 9) {
        res.statusCode = 404
    } else {
        res.statusCode = 200
    }

    res.setHeader('Content-Type', 'text/html')

    if(res.statusCode == 404) {
        res.end("Página não encontrada!")
    } 
    else if (res.statusCode == 200){
        if(!name) {
            res.end(
            "<h1>Digite um número:</h1> <form method='GET'> <input type='number' name='name'/> <input type='submit' value='Enviar'></form>")
        } else {
            res.end(`<h1>Seja bem-vindo(a) ${name}!</h1>`);
        }
    }

})
    

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})