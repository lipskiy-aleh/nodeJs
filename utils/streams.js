const commandLineInterface = require('commander');
const fs = require('fs');
const https = require('https');
const csv2 = require('csv2');
const through2 = require('through2');

const toConsole = 'console';
const toFile = 'file';

function inputOutput(filePath) {
    fs.createReadStream(filePath).pipe(process.stdout);
}

function transform(filePath, destinationPath) {
    let isFirst = true;
    fs.createReadStream(filePath)
        .pipe(csv2())
        .pipe(through2.obj(function(chunk, encoding, callback) {
            const firstSymbol = isFirst ? '[' : ',\n';
            isFirst = false;
            const data = chunk.reduce(function(obj, el, i) {
                obj['field' + i] = el;
                return obj;
            }, {});
            this.push(firstSymbol + JSON.stringify(data));
            callback();
        }, function(done) {
            this.push(']');
            done();
        }))
        .pipe(destinationPath);
}

function transformFile(filePath, destinationType = toConsole) {
    const destinationPath = filePath.substr(0, filePath.lastIndexOf('.')) + '.json';
    transform(filePath, destinationType === toConsole ? process.stdout : fs.createWriteStream(destinationPath));
}

function transformToUppercase() {
    process.stdin
        .pipe(through2(function(chunk, encoding, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
        }))
        .pipe(process.stdout);
}

function cssBundler(filePath) {
    const link = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
    const writeStream = fs.createWriteStream(filePath + '/bundle.css');
    const combinedStream = CombinedStream.create();
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.error(err);
            return;
        }
        https.get(link, res => {
            for(let i = 0; i < files.length; i++) {
                if (files[i] !== 'bundle.css') {
                    combinedStream.append(fs.createReadStream(filePath + '/' + files[i]));
                }
            }
            combinedStream.append(res);
            combinedStream.pipe(writeStream);
        });
    });
}

function init() {
    commandLineInterface
        .version('0.1.0')
        .option('-a, --action <func>', 'call function')
        .option('-f, --file <path>', 'pass file to function')
        .option('', 'usage message')
        .parse(process.argv);

    if (commandLineInterface.action === 'transformToUppercase') {
        transformToUppercase();
        return;
    }

    if(commandLineInterface.file) {
        switch (commandLineInterface.action) {
            case 'io':
                inputOutput(commandLineInterface.file);
                break;
            case 'transformToJSONFile':
                transformFile(commandLineInterface.file, toFile);
                break;
            case 'transformFileToConsole':
                transformFile(commandLineInterface.file, toConsole);
                break;
            case 'cssBundler':
                cssBundler(commandLineInterface.file);
                break;
            default:
                console.log('Action doesn`t found');
                break;
        }
    } else {
        console.log('File path parameter misses');
    }
}

if(module.parent) {
    exports.stream = {
        inputOutput,
        transform,
        transformFile,
        transformToUppercase,
        cssBundler,
    };
} else {
    init();
}
