const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});



readline.question(`Qual é a sua linguagem preferida? `,(language) => {
    console.log(`A minha liguagem preferida é: ${language}`);
    readline.close();
});