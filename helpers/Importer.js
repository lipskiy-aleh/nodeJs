import fs from 'fs';
import csvjson from 'csvjson';

export default class Importer {
    constructor() {
        this.syncImportedFiles = {};
    }

    import(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, encoding, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    importSync(path) {
        const file = fs.readFileSync(path, 'utf8');
        const data = this.convertCsvToJson(file);
        this.syncImportedFiles[path] = data;
    }

    convertCsvToJson(data) {
        const options = {
            delimiter: ',',
            quote: '"',
        };

        return csvjson.toObject(data, options);
    }
}
