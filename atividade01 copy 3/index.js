const chalk = require("chalk");

const statusCodes = [
    { code: 100, message: "Continue"},
    { code: 101, message: "Switching Protocols"},
    { code: 103, message: "Early Hints"},
    { code: 200, message: "OK"},
    { code: 208, message: "Already Reported"},
    { code: 304, message: "Not Modified"},
    { code: 500, message: "Internal Server Error"},
    { code: 409, message: "Conflit"},
    { code: 508, message: "Loop Detected"}
];

//Função para gerar um número aleatório entre 0 e o comprimento do array statusCodes
const generateRandomIndex = () => {
    return Math.floor(Math.random() * statusCodes.length);
};

//Gerando um número aleatório entre 0 e o comprimento do array statusCodes
const randomicoIndex = generateRandomIndex();

statusCodes.forEach((status, index) => {
    if(index === randomicoIndex) {
        if(status.code >= 100 && status.code <= 199) {
            console.log(chalk.gray.bold(`Status ${status.code}: ${status.message}`));
        } else if (status.code >= 200 && status.code <= 299){
            console.log(chalk.green.bold(`Status ${status.code}: ${status.message}`));
        } else if (status.code >= 300 && status.code <= 399) {
            console.log(chalk.blue.bold(`Status ${status.code}: ${status.message}`));
        } else if (status.code >= 400 && status.code <= 499) {
            console.log(chalk.yellow.bold(`Status ${status.code}: ${status.message}`));
        } else if (status.code >= 500 && status.code <= 599) {
            console.log(chalk.red.bold(`Status ${status.code}: ${status.message}`));
        }
    }
});

