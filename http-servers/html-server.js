require('babel-core/register');
const http = require('http');
const fs = require('fs');
const { Transform } = require('stream');

const messageTemplate = '{message}';

http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const message = 'Hello world';

    const contentType = 'text/html';
    res.writeHead(200, { 'Content-Type': contentType });

    const transformHtml = new Transform({
        transform(chunk, encoding, callback) {
            const chunkString = chunk.toString();
            this.push(chunkString.indexOf(messageTemplate) !== -1 ? chunkString.replace(messageTemplate, message) : chunkString);
            callback();
        }
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(transformHtml).pipe(res);
}).listen(8080);
