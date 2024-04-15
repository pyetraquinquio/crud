//mais de um valor
const x = 10;
const y = "Pypy";

console.log(x, y);

//contagem de impressões
console.count("O valor de x é: " + x + " -> contagem: ");
console.count("O valor de x é: " + x + " -> contagem: ");
console.count("O valor de x é: " + x + " -> contagem: ");
console.count("O valor de y é: " + y + " -> contagem: ");

//variável entre string
console.log("O nome dela é %s", y);

//limpando console
setTimeout(() => {
    console.clear();
}, 2000);