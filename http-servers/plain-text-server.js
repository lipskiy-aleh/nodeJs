const http = require('http');

function accept(req, res) {
    const contentType = 'text/html';
    const content = 'Hello world';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
}

http.createServer(accept).listen(8080);
