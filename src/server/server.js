const http = require('http');
const app = require('./app');

const PORT = 8081;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`);
});

module.exports = server;
