const chalk = require("chalk");

var nota = 2

if (nota >= 7) {
    console.log(chalk.green.bold("Parabéns, você foi aprovado!"))
} else if (nota == 5 || nota == 6) {
    console.log(chalk.yellow.bold("Você precisa fazer a prova final."))
} else if (nota < 5 ) {
    console.log(chalk.red.bold("Você foi reprovado." ))
}