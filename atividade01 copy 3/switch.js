const chalk = require("chalk");

const statusCodes = [
  { code: 200, message: "OK" },
  { code: 404, message: "Not Found" },
  { code: 500, message: "Internal Server Error" },
  { code: 300, message: "Multiple Choices" },
  { code: 301, message: "Moved Permanently" },
  { code: 400, message: "Bad Request" },
  { code: 401, message: "Unauthorized" }
  // Adicione mais códigos de status conforme necessário
];

// Exibindo as informações de status code
statusCodes.forEach(status => {
  let mensagemFormatada;
  switch (true) {
    case (status.code >= 100 && status.code < 200):
      mensagemFormatada = chalk.gray.bold(status.message); // Cinza para 100 a 199
      break;
    case (status.code >= 200 && status.code < 300):
      mensagemFormatada = chalk.green.bold(status.message); // Verde para 200 a 299
      break;
    case (status.code >= 300 && status.code < 400):
      mensagemFormatada = chalk.blue.bold(status.message); // Azul para 300 a 399
      break;
    case (status.code >= 400 && status.code < 500):
      mensagemFormatada = chalk.yellow.bold(status.message); // Amarelo para 400 a 499
      break;
    case (status.code >= 500 && status.code < 600):
      mensagemFormatada = chalk.red.bold(status.message); // Vermelho para 500 a 599
      break;
    default:
      mensagemFormatada = status.message; // Outros códigos
  }
  console.log(`Status ${status.code}: ${mensagemFormatada}`);
});
