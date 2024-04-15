const chalk = require("chalk");

const statusCodes = [
    { code: 100, message: "Continue"},
    { code: 200, message: "OK"},
    { code: 500, message: "Internal Server Error"}
];

//Função para gerar um número aleatório entre 0 e o comprimento do array statusCodes
const generateRandomIndex = () => {
    return Math.floor(Math.random() * statusCodes.length);
};

//Gerando um número aleatório entre 0 e o comprimento do array statusCodes
const randomicoIndex = generateRandomIndex();

statusCodes.forEach((status, index) => {
    if(index === randomicoIndex) {
        console.log(`Status ${status.code}: ${status.message}`);
    }
});

