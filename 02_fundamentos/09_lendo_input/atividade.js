// const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// const chalk = require("chalk");

// readline.question(chalk.yellow.bold(`Qual é a sua linguagem preferida? `),(language) => {
//     console.log(chalk.blue.bold(`A minha liguagem preferida é: ${language}`));
//     readline.close();
// });

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const chalk = require("chalk");

readline.question(`Qual é a sua linguagem preferida? `,(language) => {
    if (language == "JavaScript") {
        console.log(chalk.yellow.bold(`A minha liguagem preferida é: ${language}`));
    } else if (language == "HTML"){
        console.log(chalk.blue.bold(`A minha liguagem preferida é: ${language}`));
    }
    readline.close();
});