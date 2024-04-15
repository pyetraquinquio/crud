const chalk = require("chalk");

const nota = 6;

if (nota >= 7) {
    console.log(chalk.bgGreen.bold("Parabéns, você pasou!"))
} else {
    console.log(chalk.bgRed.black("Que pena, você reprovou!"))
}