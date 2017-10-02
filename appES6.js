// import {appName} from 'config/server';
// import {User, Product} from 'models';
import {DirWatcher, Importer, SingletonEventEmitter} from 'modules/';

// import events from 'events';
// global.eventEmitter = new events.EventEmitter();
const eventEmitter = new SingletonEventEmitter();

const importer = new Importer();

eventEmitter.on('fileChange', (filePath) => {
    console.log(filePath);
    importer.importSync(filePath);
});

const dirWatcher = new DirWatcher();
dirWatcher.watch('./data', 100);
