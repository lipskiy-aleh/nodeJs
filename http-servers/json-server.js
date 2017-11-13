const http = require('http');
const productMock = {
    id: 1,
    name: 'T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        {color: 'blue'},
        {size: 'XL'}
    ]
}

function accept(req, res) {
    const contentType = 'application/json';
    const content = JSON.stringify(productMock);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
}

http.createServer(accept).listen(8080);
