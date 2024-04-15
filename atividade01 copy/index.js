const chalk = require("chalk");

const statusCodes = [
    { code: 100, message: "Continue"},
    { code: 200, message: "OK"},
    { code: 500, message: "Internal Server Error"}
];

statusCodes.forEach(status => {
    console.log(`Status ${status.code}: ${status.message}`);
});

