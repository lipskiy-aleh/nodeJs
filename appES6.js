// import {appName} from 'config/server';
// import {User, Product} from 'models';
import DirWatcher from 'modules/DirWatcher';
import events from 'events';
import Importer from 'modules/Importer';

global.eventEmitter = new events.EventEmitter();
const importer = new Importer();

global.eventEmitter.on('fileChange', (filePath) => {
    console.log(filePath);
    importer.importSync(filePath);
});

const dirWatcher = new DirWatcher();
dirWatcher.watch('./data', 100);
