import chokidar from 'chokidar';
// import events from 'events';
// const eventEmitter = new events.EventEmitter();

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
                global.eventEmitter.emit('fileChange', changeFilePath);
            }
        });
    }
}
