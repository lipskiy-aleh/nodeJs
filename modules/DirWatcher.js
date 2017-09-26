import chokidar from 'chokidar';

export default class DirWatcher {
    constructor() {
        console.log('DirWatcher implementation');
    }

    watch(path, delay) {
        const watcher = chokidar.watch(path, {
            interval: delay,
        });

        watcher.on('all', (event, pathChange) => {
            console.log(event);
            console.log(pathChange);
        });
    }
}
