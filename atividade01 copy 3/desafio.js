const chalk = require("chalk");

const statusCodes = [
    { code: 100, message: "Continue"},
    { code: 101, message: "Switching Protocols"},
    { code: 102, message: "Processing"},
    { code: 103, message: "Early Hints"},
    { code: 200, message: "OK"},
    { code: 208, message: "Already Reported"},
    { code: 304, message: "Not Modified"},
    { code: 500, message: "Internal Server Error"},
    { code: 409, message: "Conflit"},
    { code: 508, message: "Loop Detected"},
    { code: 200, message: "OK" },
    { code: 404, message: "Not Found" },
    { code: 500, message: "Internal Server Error" },
    { code: 300, message: "Multiple Choices" },
    { code: 301, message: "Moved Permanently" },
    { code: 400, message: "Bad Request" },
    { code: 401, message: "Unauthorized" }
    // Adicione mais códigos de status conforme necessário
  ];