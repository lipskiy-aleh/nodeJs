import chokidar from 'chokidar';
import SingletonEventEmitter from './SingletonEventEmitter';
const eventEmitter = new SingletonEventEmitter();

export default class DirWatcher {
    constructor() {
        console.log('DirWatcher implementation');
    }

    watch(path, delay) {
        const watcher = chokidar.watch(path, {
            interval: delay,
        });

        watcher.on('all', (event, changeFilePath) => {
            if(event === 'add' || event === 'change') {
                eventEmitter.emit('fileChange', changeFilePath);
            }
        });
    }
}
